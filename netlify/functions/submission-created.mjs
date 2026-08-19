import nodemailer from "nodemailer";

/**
 * Netlify fires the `submission-created` event once it has stored a form
 * submission. Sending the SMTP copy from here rather than from the browser
 * means the two destinations can't diverge: a lead is either stored AND
 * emailed, or neither. It also keeps the SMTP credentials off the client,
 * and skips anything Netlify's spam filter rejected.
 */

/* Field name -> label for the email body. Keys match public/__forms.html.
   The honeypot is deliberately absent so a bot's payload can't reach the inbox. */
const FIELD_LABELS = {
  "workshop-name": "Workshop",
  "contact-name": "Contact",
  email: "Email",
  phone: "Phone",
  "workshop-size": "Workshop size",
};

/* Pulled from src/index.css so the email and the site can't drift apart. */
const BRAND = {
  ink: "#171616",
  inkDeep: "#0B0805",
  rust: "#F05A28",
  taupe: "#6B6864",
  canvas: "#EEEBE7",
  card: "#FFFFFF",
  hairline: "#E2DED9",
};

/* Barlow Condensed won't load in a mail client, so the display face falls back
   to the condensed grotesques that ship with macOS/iOS and Windows. */
const DISPLAY_STACK =
  "'Barlow Condensed','Oswald','Helvetica Neue Condensed','Arial Narrow',Helvetica,Arial,sans-serif";
const BODY_STACK =
  "'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif";

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

const esc = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/* href values get URI-encoded before escaping — a quote or a stray angle
   bracket in a submitted field must not be able to break out of the attribute. */
const escUrl = (value) => esc(encodeURI(String(value).trim()));

function renderRows(data) {
  return Object.entries(FIELD_LABELS)
    .map(([name, label]) => ({ name, label, value: String(data[name] ?? "").trim() }))
    .filter((row) => row.value);
}

/** Melbourne time, spelled out — the inbox shouldn't have to parse an ISO stamp. */
function formatStamp(iso) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return String(iso);
  try {
    return new Intl.DateTimeFormat("en-AU", {
      timeZone: "Australia/Melbourne",
      weekday: "short",
      day: "numeric",
      month: "short",
      hour: "numeric",
      minute: "2-digit",
      timeZoneName: "short",
    }).format(date);
  } catch {
    return date.toISOString();
  }
}

/** A field's value, linked when it's something you'd act on. */
function renderValue({ name, value }) {
  if (name === "email") {
    return `<a href="mailto:${escUrl(value)}" style="color:${BRAND.rust};text-decoration:none">${esc(value)}</a>`;
  }
  if (name === "phone") {
    const dialable = value.replace(/[^\d+]/g, "");
    return `<a href="tel:${escUrl(dialable)}" style="color:${BRAND.rust};text-decoration:none">${esc(value)}</a>`;
  }
  return esc(value);
}

function buildEmail(data, payload) {
  const rows = renderRows(data);
  const workshop = data["workshop-name"]?.trim();
  const contact = data["contact-name"]?.trim();
  const headline = workshop || contact || data.email?.trim() || "A new workshop";
  const stamp = formatStamp(payload?.created_at ?? new Date().toISOString());
  const formName = payload?.form_name ?? "early-access";
  const subject = `Early access request — ${headline}`;

  const text = [
    `NEW EARLY ACCESS REQUEST`,
    ``,
    `${headline} wants early access to Workroo.`,
    ``,
    ...rows.map(({ label, value }) => `${label.padEnd(14)} ${value}`),
    ``,
    data.email ? `Reply straight to this email to reach ${contact || headline}.` : ``,
    ``,
    `Submitted ${stamp} · form "${formName}"`,
    `A copy is stored in the Netlify Forms dashboard.`,
  ]
    .filter((line) => line !== null)
    .join("\n");

  const detailRows = rows
    .map(
      ({ label, name, value }, i) => `
              <tr>
                <td class="wr-hair" style="padding:14px 0 0;border-top:${i === 0 ? "0" : `1px solid ${BRAND.hairline}`};font-family:${BODY_STACK};font-size:11px;font-weight:600;line-height:1.4;letter-spacing:0.12em;text-transform:uppercase;color:${BRAND.taupe};width:132px;vertical-align:top" class="wr-muted wr-hair">${esc(label)}</td>
                <td class="wr-hair wr-ink" style="padding:14px 0 0;border-top:${i === 0 ? "0" : `1px solid ${BRAND.hairline}`};font-family:${BODY_STACK};font-size:16px;font-weight:600;line-height:1.45;color:${BRAND.ink};vertical-align:top">${renderValue({ name, value })}</td>
              </tr>
              <tr><td colspan="2" style="height:14px;line-height:14px;font-size:0">&nbsp;</td></tr>`
    )
    .join("");

  const replyButton = data.email
    ? `
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-top:14px">
              <tr>
                <td bgcolor="${BRAND.rust}" style="background:${BRAND.rust}">
                  <a href="mailto:${escUrl(data.email)}?subject=${encodeURIComponent(`Re: Workroo early access — ${headline}`)}"
                     style="display:inline-block;padding:15px 28px;font-family:${BODY_STACK};font-size:12px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#FFFFFF;text-decoration:none">Reply to ${esc(contact || headline)}</a>
                </td>
              </tr>
            </table>`
    : "";

  const preheader = [contact, data["workshop-size"] && `${data["workshop-size"]} workshop`, data.phone]
    .filter(Boolean)
    .join(" · ");

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light dark">
<meta name="supported-color-schemes" content="light dark">
<title>${esc(subject)}</title>
<style>
  /* Apple Mail and iOS honour this; every other client keeps the light palette
     that is baked into the inline styles. */
  @media (prefers-color-scheme: dark) {
    .wr-canvas { background: ${BRAND.inkDeep} !important; }
    .wr-card { background: ${BRAND.ink} !important; }
    .wr-ink { color: #FFFFFF !important; }
    .wr-muted { color: #A8A29C !important; }
    .wr-hair { border-color: rgba(255,255,255,0.14) !important; }
  }
  @media only screen and (max-width: 620px) {
    .wr-pad { padding-left: 26px !important; padding-right: 26px !important; }
    .wr-h1 { font-size: 30px !important; }
  }
</style>
</head>
<body class="wr-canvas" style="margin:0;padding:0;width:100%;background:${BRAND.canvas};-webkit-font-smoothing:antialiased">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;height:0;width:0">${esc(preheader || "New early access request from the Workroo site.")}</div>

  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" class="wr-canvas" style="background:${BRAND.canvas}">
    <tr>
      <td align="center" style="padding:32px 16px 44px">

        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="width:600px;max-width:100%">

          <!-- Masthead: the site's black band, with the rust rule under it -->
          <tr>
            <td class="wr-pad" bgcolor="${BRAND.ink}" style="background:${BRAND.ink};padding:30px 40px 26px">
              <div style="font-family:${DISPLAY_STACK};font-size:26px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:#FFFFFF;line-height:1">Workroo</div>
              <div style="font-family:${BODY_STACK};font-size:10px;font-weight:600;letter-spacing:0.22em;text-transform:uppercase;color:rgba(255,255,255,0.5);padding-top:9px">Lead notification</div>
            </td>
          </tr>
          <tr><td bgcolor="${BRAND.rust}" style="background:${BRAND.rust};height:4px;line-height:4px;font-size:0">&nbsp;</td></tr>

          <!-- The lead -->
          <tr>
            <td class="wr-pad wr-card" bgcolor="${BRAND.card}" style="background:${BRAND.card};padding:38px 40px 34px">
              <div style="font-family:${BODY_STACK};font-size:11px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:${BRAND.rust};padding-bottom:14px">New early access request</div>
              <h1 class="wr-h1 wr-ink" style="margin:0;font-family:${DISPLAY_STACK};font-size:36px;font-weight:700;line-height:1.06;letter-spacing:0.01em;text-transform:uppercase;color:${BRAND.ink}">${esc(headline)}</h1>
              <p class="wr-muted" style="margin:12px 0 0;font-family:${BODY_STACK};font-size:15px;line-height:1.55;color:${BRAND.taupe}">wants early access to Workroo.</p>

              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top:28px">
                ${detailRows}
              </table>

              ${replyButton}
            </td>
          </tr>

          <!-- Provenance -->
          <tr>
            <td class="wr-pad wr-card wr-hair" bgcolor="${BRAND.card}" style="background:${BRAND.card};padding:20px 40px 26px;border-top:1px solid ${BRAND.hairline}">
              <p class="wr-muted" style="margin:0;font-family:${BODY_STACK};font-size:12px;line-height:1.6;color:${BRAND.taupe}">
                Submitted ${esc(stamp)} &middot; form &ldquo;${esc(formName)}&rdquo;<br>
                A copy is stored in the Netlify Forms dashboard.
              </p>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding:22px 24px 0">
              <p class="wr-muted" style="margin:0;font-family:${BODY_STACK};font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:${BRAND.taupe}">Workroo &middot; Melbourne, Australia</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return { subject, text, html };
}

export default async (req) => {
  let payload;
  try {
    ({ payload } = await req.json());
  } catch {
    return new Response("Expected a submission-created event payload", { status: 400 });
  }

  const data = payload?.data ?? {};
  const { subject, text, html } = buildEmail(data, payload);

  try {
    const transport = buildTransport();
    await transport.sendMail({
      from: env("LEAD_FROM", env("SMTP_USER")),
      to: env("LEAD_TO", "charith@infineit.com"),
      // Replying from the inbox goes straight back to the workshop.
      replyTo: data.email || undefined,
      subject,
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
