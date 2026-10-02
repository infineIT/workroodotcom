/* Single source of truth for the primary nav, mobile nav and footer. */

export const LOGO_SRC = "/logo.png";

export const navGroups = [
  {
    label: "Product",
    items: [
      { label: "Features", to: "/features", desc: "Every tool your workshop needs" },
      { label: "How it works", to: "/how-it-works", desc: "Every repair, on the record" },
      { label: "Early access", to: "/early-access", desc: "Be first to run Workroo" },
    ],
  },
  {
    label: "Solutions",
    items: [
      { label: "Workshop owners", to: "/solutions/workshop-owners", desc: "Build trust, grow retention" },
      { label: "Operations", to: "/solutions/operations", desc: "Total visibility, from anywhere" },
      { label: "Customers", to: "/solutions/customers", desc: "See what you pay for" },
    ],
  },
  {
    label: "Resources",
    items: [
      { label: "Blog", to: "/blog", desc: "Stories from the workshop" },
    ],
  },
];

export const footerColumns = [
  {
    title: "Product",
    links: [
      { label: "Features", to: "/features" },
      { label: "How it works", to: "/how-it-works" },
      { label: "Early access", to: "/early-access" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Workshop owners", to: "/solutions/workshop-owners" },
      { label: "Operations", to: "/solutions/operations" },
      { label: "Customers", to: "/solutions/customers" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Blog", to: "/blog" },
      { label: "Website", href: "https://workroo.com" },
      { label: "Facebook", href: "https://www.facebook.com/workroo/" },
      { label: "LinkedIn", href: "https://www.linkedin.com/company/workroo/" },
    ],
  },
];

export const CONTACT = {
  email: "workroo@infineit.com",
  phone: "+61 425 164 118",
  phoneHref: "tel:+61425164118",
  location: "Melbourne, Australia",
  website: "https://workroo.com",
};
