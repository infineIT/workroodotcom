/* The disguised chat widget: a short conversational form that posts to the
   "chat-intake" Netlify form (declared in public/__forms.html) and is emailed
   out by netlify/functions/submission-created.mjs.

   Each step maps to one field. `key` must match a field name in both of those
   files. Keep this list 6–8 steps — it should feel like a quick chat, not a
   survey. */

export const CHAT_FORM_NAME = "chat-intake";

/* Milliseconds a visitor spends on the site before Roo pops out (15s). */
export const CHAT_REVEAL_DELAY = 15000;

export const chatIntro =
  "G'day! I'm Roo \u{1F998} — got a sec? A few quick questions and someone real at Workroo will get back to you.";

export const chatSteps = [
  {
    key: "name",
    type: "text",
    inputType: "text",
    required: true,
    bot: "First up — what should I call you?",
    placeholder: "Your name",
  },
  {
    key: "email",
    type: "text",
    inputType: "email",
    required: true,
    bot: "Nice to meet you, {name}. What's the best email to reach you on?",
    placeholder: "you@workshop.com.au",
    validate: (v) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ||
      "Hmm, that doesn't look like an email address.",
  },
  {
    key: "workshop-size",
    type: "choice",
    required: true,
    bot: "How big is your workshop?",
    options: ["Solo mechanic", "2–5 staff", "5–20 staff", "20+ staff / dealership"],
  },
  {
    key: "found-us",
    type: "choice",
    required: false,
    bot: "How did you come across Workroo?",
    options: ["Google search", "Social media", "Word of mouth", "Industry event", "Somewhere else"],
  },
  {
    key: "why-workroo",
    type: "text",
    inputType: "textarea",
    required: false,
    bot: "What made you take a look at us today?",
    placeholder: "A sentence or two is plenty",
  },
  {
    key: "features-interest",
    type: "text",
    inputType: "textarea",
    required: false,
    bot: "Which parts are you most interested in? Job tracking, live customer updates, invoicing, scheduling, reporting…",
    placeholder: "Whatever's caught your eye",
  },
  {
    key: "biggest-headache",
    type: "text",
    inputType: "textarea",
    required: false,
    bot: "What's the biggest headache in your workshop right now?",
    placeholder: "The thing you'd love to make disappear",
  },
  {
    key: "wishlist",
    type: "text",
    inputType: "textarea",
    required: false,
    bot: "Last one — what would you like Workroo to bring to the table for you?",
    placeholder: "Dream big",
  },
];

export const chatClosing =
  "Thank you for taking the time to answer these — genuinely appreciated. Someone over at Workroo will have a look over your details and get back to you soon. \u{1F998}";

export const chatError =
  "Something went wrong sending that through. Give it another go, or email workroo@infineit.com directly.";
