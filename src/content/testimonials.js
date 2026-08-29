const HALLAM_LOGO =
  "https://media.base44.com/images/public/69d78b7f4ff0affa598fbcbb/68dea466b_Hallam-Hi-Tech-Logo-Light-Background.png";
const OMEGA_LOGO =
  "https://media.base44.com/images/public/69d78b7f4ff0affa598fbcbb/b8325d390_omega-auto-parts-logo-colour.svg";

export const testimonials = [
  {
    id: "yass",
    quote:
      "Our customer engagement is 20% higher and increasing. Workroo gives us a platform to build trust on transparency.",
    name: "Yass",
    role: "Owner, Hallam Hi-Tech Australia",
    type: "Workshop owner",
    audience: "workshop-owners",
    logo: HALLAM_LOGO,
    logoSize: "h-9",
  },
  {
    id: "nigal",
    quote:
      "I have total visibility on what's happening in my workshop. I can take a vacation with confidence.",
    name: "Nigal",
    role: "Operations Manager, Omega Auto Parts",
    type: "Operations",
    audience: "operations",
    logo: OMEGA_LOGO,
    logoSize: "h-6",
  },
  {
    id: "joanna",
    quote:
      "I had never seen what was done to my car before. Now I know what I pay for.",
    name: "Joanna Li",
    role: "Hallam Hi-Tech customer",
    type: "Customer",
    audience: "customers",
    logo: HALLAM_LOGO,
    logoSize: "h-9",
  },
];

export const testimonialByAudience = (audience) =>
  testimonials.find((t) => t.audience === audience);

export const customerLogos = [
  { src: HALLAM_LOGO, alt: "Hallam Hi-Tech Australia", className: "h-8" },
  { src: OMEGA_LOGO, alt: "Omega Auto Parts", className: "h-6" },
];
