/* Per-audience copy for /solutions/:audience. Feature slugs are resolved against
   src/content/features.js; the testimonial is matched on audience. */

export const solutions = {
  "workshop-owners": {
    audience: "workshop-owners",
    eyebrow: "For workshop owners",
    title: "Build trust that",
    accent: "brings people back",
    accentColor: "blue",
    intro:
      "Workshops across Australia use Workroo to build trust, cut friction and grow. When customers can see the work on their vehicle as it happens, they come back — and they tell others.",
    featureSlugs: [
      "live-work-capture",
      "real-time-customer-connection",
      "reporting",
      "service-scheduling",
    ],
    proofValue: "+30%",
    proofLabel: "more customer engagement",
    proofBody:
      "Customers watch every step of the repair in real time. That transparency is what turns a one-off job into a returning customer.",
  },
  operations: {
    audience: "operations",
    eyebrow: "For operations",
    title: "Total visibility,",
    accent: "from anywhere",
    accentColor: "lime",
    intro:
      "Stay across every job in progress and manage the workshop remotely. Workroo keeps the whole team on the same page, in real time — so you can step away with confidence.",
    featureSlugs: [
      "job-management",
      "cloud-first-workshop",
      "booking-diary",
      "supplier-management",
    ],
    proofValue: "20+ hrs",
    proofLabel: "saved per week",
    proofBody:
      "Bookings convert straight into jobs, suppliers stay organised, and every job lives in one view. Less admin, fewer dropped balls.",
  },
  customers: {
    audience: "customers",
    eyebrow: "For customers",
    title: "See exactly what",
    accent: "you pay for",
    accentColor: "blue",
    intro:
      "No more wondering what happened to your car. Workroo gives you a live, transparent record of every repair — updates reach your phone the moment work begins.",
    featureSlugs: [
      "live-work-capture",
      "real-time-customer-connection",
      "intelligent-alerts",
    ],
    proofValue: "100%",
    proofLabel: "customer retention",
    proofBody:
      "A verified record of the work on your vehicle — what was done, and why. Trust built on what you can actually see.",
  },
};

export const solutionByAudience = (audience) => solutions[audience];
