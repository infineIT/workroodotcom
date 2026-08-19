import nodemailer from "nodemailer";

/**
 * Netlify fires the `submission-created` event once it has stored a form
 * submission. Sending the SMTP copy from here rather than from the browser
 * means the two destinations can't diverge: a lead is either stored AND
 * emailed, or neither. It also keeps the SMTP credentials off the client,
 * and skips anything Netlify's spam filter rejected.
 */

/* Field name -> label for the email body. Keys match public/__forms.html. */
const FIELD_LABELS = {
  "workshop-name": "Workshop",
  "contact-name": "Contact",
  email: "Email",
  phone: "Phone",
  "workshop-size": "Workshop size",
};

const REQUIRED_ENV = ["SMTP_HOST", "SMTP_USER", "SMTP_PASS"];

const env = (key, fallback) => Netlify.env.get(key) ?? fallback;

function buildTransport() {
  const missing = REQUIRED_ENV.filter((key) => !Netlify.env.get(key));
  if (missing.length) {
    throw new Error(`Missing SMTP environment variables: ${missing.join(", ")}`);
  }

  const port = Number(env("SMTP_PORT", "587"));
  return nodemailer.createTransport({
    host: env("SMTP_HOST"),
    port,
    // Implicit TLS on 465; STARTTLS upgrade on 587/25. Overridable for hosts
    // that don't follow the convention.
    secure: env("SMTP_SECURE") ? env("SMTP_SECURE") === "true" : port === 465,
    auth: { user: env("SMTP_USER"), pass: env("SMTP_PASS") },
  });
}

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

function renderRows(data) {
  return Object.entries(FIELD_LABELS)
    .map(([name, label]) => [label, data[name]])
    .filter(([, value]) => value && String(value).trim());
}

export default async (req) => {
  let payload;
  try {
    ({ payload } = await req.json());
  } catch {
    return new Response("Expected a submission-created event payload", { status: 400 });
  }

  const data = payload?.data ?? {};
  const rows = renderRows(data);
  const submittedAt = payload?.created_at ?? new Date().toISOString();

  const text = [
    `New early access request from ${data["workshop-name"] || "an unnamed workshop"}.`,
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    `Submitted: ${submittedAt}`,
    `Form: ${payload?.form_name ?? "early-access"}`,
  ].join("\n");

  const html = `
    <p>New early access request from <strong>${escapeHtml(
      data["workshop-name"] || "an unnamed workshop"
    )}</strong>.</p>
    <table cellpadding="6" style="border-collapse:collapse;font-family:system-ui,sans-serif">
      ${rows
        .map(
          ([label, value]) =>
            `<tr><td style="color:#666">${escapeHtml(label)}</td><td><strong>${escapeHtml(
              value
            )}</strong></td></tr>`
        )
        .join("")}
    </table>
    <p style="color:#888;font-size:12px">Submitted ${escapeHtml(submittedAt)} &middot; form "${escapeHtml(
      payload?.form_name ?? "early-access"
    )}"</p>
  `;

  try {
    const transport = buildTransport();
    await transport.sendMail({
      from: env("LEAD_FROM", env("SMTP_USER")),
      to: env("LEAD_TO", "charith@infineit.com"),
      // Replying from the inbox goes straight back to the workshop.
      replyTo: data.email || undefined,
      subject: `Workroo early access — ${data["workshop-name"] || data["contact-name"] || data.email}`,
      text,
      html,
    });
  } catch (error) {
    // The submission is already stored in Netlify Forms, so the lead is not
    // lost — surface the failure in the function log and fail the event so it
    // is visibly red in the dashboard rather than silently dropped.
    console.error("Failed to send the SMTP copy of an early access lead:", error);
    return new Response(`SMTP send failed: ${error.message}`, { status: 500 });
  }

  return new Response("Sent", { status: 200 });
};
