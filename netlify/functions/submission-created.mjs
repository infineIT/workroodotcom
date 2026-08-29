import nodemailer from "nodemailer";

/**
 * Netlify fires the `submission-created` event once it has stored a form
 * submission. Sending the SMTP copy from here rather than from the browser
 * means the two destinations can't diverge: a lead is either stored AND
 * emailed, or neither. It also keeps the SMTP credentials off the client,
 * and skips anything Netlify's spam filter rejected.
 *
 * Two messages go out: the lead notification to the inbox, and a confirmation
 * back to the workshop. The notification is the one that must not fail.
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

/* Pulled from src/index.css so the emails and the site can't drift apart. */
const BRAND = {
  ink: "#121424",
  inkDeep: "#0B0D1A",
  blue: "#0067FF",
  taupe: "#63737E",
  canvas: "#F5F8FB",
  card: "#FFFFFF",
  hairline: "#E2E5EC",
};

/* Clash Grotesque won't load in a mail client, so the display face falls back
   to the grotesques that ship with macOS/iOS and Windows. */
const DISPLAY_STACK =
  "'Clash Grotesque','Instrument Sans','Helvetica Neue',Helvetica,Arial,sans-serif";
const BODY_STACK =
  "'Instrument Sans',-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif";

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

/** Melbourne time, spelled out — nobody should have to parse an ISO stamp. */
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

/* ---------------------------------------------------------------- layout -- */

/**
 * The shared chrome: masthead, blue rule, card, footer. Both messages pour
 * their own middle into it so they read as the same piece of stationery.
 */
function shell({ title, preheader, eyebrow, headline, lede, body, meta }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light dark">
<meta name="supported-color-schemes" content="light dark">
<title>${esc(title)}</title>
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
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;height:0;width:0">${esc(preheader)}</div>

  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" class="wr-canvas" style="background:${BRAND.canvas}">
    <tr>
      <td align="center" style="padding:32px 16px 44px">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="width:600px;max-width:100%">

          <tr>
            <td class="wr-pad" bgcolor="${BRAND.ink}" style="background:${BRAND.ink};padding:30px 40px 26px">
              <div style="font-family:${DISPLAY_STACK};font-size:26px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:#FFFFFF;line-height:1">Workroo</div>
              <div style="font-family:${BODY_STACK};font-size:10px;font-weight:600;letter-spacing:0.22em;text-transform:uppercase;color:rgba(255,255,255,0.5);padding-top:9px">${esc(eyebrow.masthead)}</div>
            </td>
          </tr>
          <tr><td bgcolor="${BRAND.blue}" style="background:${BRAND.blue};height:4px;line-height:4px;font-size:0">&nbsp;</td></tr>

          <tr>
            <td class="wr-pad wr-card" bgcolor="${BRAND.card}" style="background:${BRAND.card};padding:38px 40px 34px">
              <div style="font-family:${BODY_STACK};font-size:11px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:${BRAND.blue};padding-bottom:14px">${esc(eyebrow.card)}</div>
              <h1 class="wr-h1 wr-ink" style="margin:0;font-family:${DISPLAY_STACK};font-size:36px;font-weight:700;line-height:1.06;letter-spacing:-0.01em;color:${BRAND.ink}">${esc(headline)}</h1>
              <p class="wr-muted" style="margin:12px 0 0;font-family:${BODY_STACK};font-size:15px;line-height:1.55;color:${BRAND.taupe}">${lede}</p>
              ${body}
            </td>
          </tr>

          <tr>
            <td class="wr-pad wr-card wr-hair" bgcolor="${BRAND.card}" style="background:${BRAND.card};padding:20px 40px 26px;border-top:1px solid ${BRAND.hairline}">
              <p class="wr-muted" style="margin:0;font-family:${BODY_STACK};font-size:12px;line-height:1.6;color:${BRAND.taupe}">${meta}</p>
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
}

/** A field's value, linked when it's something you'd act on. */
function renderValue({ name, value }, { link = true } = {}) {
  if (link && name === "email") {
    return `<a href="mailto:${escUrl(value)}" style="color:${BRAND.blue};text-decoration:none">${esc(value)}</a>`;
  }
  if (link && name === "phone") {
    const dialable = value.replace(/[^\d+]/g, "");
    return `<a href="tel:${escUrl(dialable)}" style="color:${BRAND.blue};text-decoration:none">${esc(value)}</a>`;
  }
  return esc(value);
}

function detailTable(rows, options) {
  const cells = rows
    .map(
      (row, i) => `
                <tr>
                  <td class="wr-muted wr-hair" style="padding:14px 0 0;border-top:${i === 0 ? "0" : `1px solid ${BRAND.hairline}`};font-family:${BODY_STACK};font-size:11px;font-weight:600;line-height:1.4;letter-spacing:0.12em;text-transform:uppercase;color:${BRAND.taupe};width:132px;vertical-align:top">${esc(row.label)}</td>
                  <td class="wr-ink wr-hair" style="padding:14px 0 0;border-top:${i === 0 ? "0" : `1px solid ${BRAND.hairline}`};font-family:${BODY_STACK};font-size:16px;font-weight:600;line-height:1.45;color:${BRAND.ink};vertical-align:top">${renderValue(row, options)}</td>
                </tr>
                <tr><td colspan="2" style="height:14px;line-height:14px;font-size:0">&nbsp;</td></tr>`
    )
    .join("");
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top:28px">${cells}</table>`;
}

function button(href, label) {
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-top:14px">
                <tr>
                  <td bgcolor="${BRAND.blue}" style="background:${BRAND.blue}">
                    <a href="${href}" style="display:inline-block;padding:15px 28px;font-family:${BODY_STACK};font-size:12px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#FFFFFF;text-decoration:none">${esc(label)}</a>
                  </td>
                </tr>
              </table>`;
}

/* ------------------------------------------------------ lead notification -- */

function buildNotification(data, payload) {
  const rows = renderRows(data);
  const workshop = data["workshop-name"]?.trim();
  const contact = data["contact-name"]?.trim();
  const headline = workshop || contact || data.email?.trim() || "A new workshop";
  const stamp = formatStamp(payload?.created_at ?? new Date().toISOString());
  const formName = payload?.form_name ?? "early-access";

  const text = [
    "NEW EARLY ACCESS REQUEST",
    "",
    `${headline} wants early access to Workroo.`,
    "",
    ...rows.map(({ label, value }) => `${label.padEnd(14)} ${value}`),
    "",
    data.email ? `Reply straight to this email to reach ${contact || headline}.` : "",
    `Submitted ${stamp} · form "${formName}"`,
    "A copy is stored in the Netlify Forms dashboard.",
  ].join("\n");

  const body =
    detailTable(rows) +
    (data.email
      ? button(
          `mailto:${escUrl(data.email)}?subject=${encodeURIComponent(`Re: Workroo early access — ${headline}`)}`,
          `Reply to ${contact || headline}`
        )
      : "");

  return {
    subject: `Early access request — ${headline}`,
    text,
    html: shell({
      title: `Early access request — ${headline}`,
      preheader:
        [contact, data["workshop-size"] && `${data["workshop-size"]} workshop`, data.phone]
          .filter(Boolean)
          .join(" · ") || "New early access request from the Workroo site.",
      eyebrow: { masthead: "Lead notification", card: "New early access request" },
      headline,
      lede: "wants early access to Workroo.",
      body,
      meta: `Submitted ${esc(stamp)} &middot; form &ldquo;${esc(formName)}&rdquo;<br>A copy is stored in the Netlify Forms dashboard.`,
    }),
  };
}

/* ------------------------------------------------ confirmation to the shop -- */

/* What actually happens next, in the order it happens. Kept short — this is a
   receipt, not a pitch; they already said yes. */
const NEXT_STEPS = [
  ["We read it", "Someone here goes through your details today, not an autoresponder queue."],
  ["We call you", "Within two business days. Fifteen minutes, to hear how your workshop actually runs."],
  ["You get in early", "We set Workroo up around your jobs and your bays before it opens to everyone."],
];

function stepList() {
  const items = NEXT_STEPS.map(
    ([title, copy], i) => `
                <tr>
                  <td width="46" style="padding:0 0 22px;vertical-align:top;font-family:${DISPLAY_STACK};font-size:22px;font-weight:700;line-height:1.1;color:${BRAND.blue}">${String(i + 1).padStart(2, "0")}</td>
                  <td style="padding:0 0 22px;vertical-align:top">
                    <div class="wr-ink" style="font-family:${BODY_STACK};font-size:15px;font-weight:700;line-height:1.35;color:${BRAND.ink}">${esc(title)}</div>
                    <div class="wr-muted" style="font-family:${BODY_STACK};font-size:14px;line-height:1.55;color:${BRAND.taupe};padding-top:4px">${esc(copy)}</div>
                  </td>
                </tr>`
  ).join("");
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top:30px">${items}</table>`;
}

function buildConfirmation(data) {
  const contact = data["contact-name"]?.trim();
  const workshop = data["workshop-name"]?.trim();
  // First name only — "Thanks, David Hallam" reads like a form letter.
  const firstName = contact ? contact.split(/\s+/)[0] : "";
  const headline = firstName ? `Thanks, ${firstName}` : "Thanks";
  const rows = renderRows(data);
  const replyTo = env("LEAD_TO", "charith@infineit.com");

  const lede = workshop
    ? `You're on the early access list for <strong class="wr-ink" style="color:${BRAND.ink};font-weight:700">${esc(workshop)}</strong>. Here's what happens from here.`
    : "You're on the early access list for Workroo. Here's what happens from here.";

  const body = `${stepList()}
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" class="wr-hair" style="margin-top:8px;border-top:1px solid ${BRAND.hairline}">
                <tr><td style="padding-top:24px">
                  <div class="wr-muted" style="font-family:${BODY_STACK};font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:${BRAND.taupe}">What you sent us</div>
                </td></tr>
              </table>
              ${detailTable(rows, { link: false })}
              <p class="wr-muted" style="margin:4px 0 0;font-family:${BODY_STACK};font-size:14px;line-height:1.6;color:${BRAND.taupe}">Spotted a typo, or a number that's changed? Just reply to this email &mdash; it comes straight to us.</p>
              ${button("https://www.workroo.com.au", "See what Workroo does")}`;

  const text = [
    headline.toUpperCase(),
    "",
    workshop
      ? `You're on the early access list for ${workshop}. Here's what happens from here.`
      : "You're on the early access list for Workroo. Here's what happens from here.",
    "",
    ...NEXT_STEPS.map(([title, copy], i) => `${String(i + 1).padStart(2, "0")}  ${title} — ${copy}`),
    "",
    "WHAT YOU SENT US",
    ...rows.map(({ label, value }) => `${label.padEnd(14)} ${value}`),
    "",
    "Spotted a typo, or a number that's changed? Just reply to this email — it comes straight to us.",
    "",
    "Workroo · Melbourne, Australia",
  ].join("\n");

  return {
    subject: "You're on the list — Workroo early access",
    text,
    html: shell({
      title: "You're on the list — Workroo early access",
      preheader: "We've got your details. Someone will call within two business days.",
      eyebrow: { masthead: "Early access", card: "You're on the list" },
      headline,
      lede,
      body,
      meta: `You're getting this because you asked for early access on the Workroo site.<br>Replies go to <a href="mailto:${escUrl(replyTo)}" style="color:${BRAND.blue};text-decoration:none">${esc(replyTo)}</a>.`,
    }),
  };
}

/* ------------------------------------------------------------------ send -- */

export default async (req) => {
  let payload;
  try {
    ({ payload } = await req.json());
  } catch {
    return new Response("Expected a submission-created event payload", { status: 400 });
  }

  const data = payload?.data ?? {};
  const from = env("LEAD_FROM", env("SMTP_USER"));
  const leadTo = env("LEAD_TO", "charith@infineit.com");
  let transport;

  // The notification is the one that must not fail — the lead is worthless if
  // nobody is told about it.
  try {
    transport = buildTransport();
    const notification = buildNotification(data, payload);
    await transport.sendMail({
      from,
      to: leadTo,
      // Replying from the inbox goes straight back to the workshop.
      replyTo: data.email || undefined,
      subject: notification.subject,
      text: notification.text,
      html: notification.html,
    });
  } catch (error) {
    // The submission is already stored in Netlify Forms, so the lead is not
    // lost — surface the failure in the function log and fail the event so it
    // is visibly red in the dashboard rather than silently dropped.
    console.error("Failed to send the SMTP copy of an early access lead:", error);
    return new Response(`SMTP send failed: ${error.message}`, { status: 500 });
  }

  // The confirmation is a courtesy. A bounced or malformed address must not
  // take down an event that has already done its important job.
  if (data.email) {
    try {
      const confirmation = buildConfirmation(data);
      await transport.sendMail({
        from,
        to: data.email,
        replyTo: leadTo,
        subject: confirmation.subject,
        text: confirmation.text,
        html: confirmation.html,
      });
    } catch (error) {
      console.error("Lead was emailed, but the confirmation to the workshop failed:", error);
    }
  }

  return new Response("Sent", { status: 200 });
};
