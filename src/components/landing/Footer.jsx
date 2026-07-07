import React from "react";

const platformLinks = [
  { label: "Solution", href: "/#solution" },
  { label: "Features", href: "/#features" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "Blog", href: "/blog" },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-cream">
      <div className="max-w-6xl mx-auto px-6 pt-16 md:pt-24 pb-10">
        <p
          className="font-display leading-none mb-14 md:mb-20"
          style={{ fontSize: "clamp(3rem, 10vw, 8rem)", fontWeight: 340 }}
        >
          Workroo
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-14">
          <div>
            <p className="text-cream/60 text-sm leading-relaxed max-w-xs mb-6">
              Mechanics and customers, connected in real time. A true record of
              every car.
            </p>
            <a
              href="mailto:workroo@infineit.com"
              className="block text-cream/60 text-sm hover:text-rust-bright transition-colors mb-2"
            >
              workroo@infineit.com
            </a>
            <a
              href="tel:+61425164118"
              className="block text-cream/60 text-sm hover:text-rust-bright transition-colors"
            >
              +61 425 164 118
            </a>
          </div>

          <div>
            <p className="eyebrow !text-cream/40 mb-6">Platform</p>
            <ul className="space-y-3">
              {platformLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-display text-lg text-cream/80 hover:text-rust-bright transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow !text-cream/40 mb-6">Elsewhere</p>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://www.workroo.com.au"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display text-lg text-cream/80 hover:text-rust-bright transition-colors"
                >
                  Website
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/workroo/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display text-lg text-cream/80 hover:text-rust-bright transition-colors"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/company/workroo/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display text-lg text-cream/80 hover:text-rust-bright transition-colors"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="pt-8 flex flex-col md:flex-row justify-between gap-3 text-xs text-cream/40"
          style={{ borderTop: "1px solid rgba(242,240,235,0.18)" }}
        >
          <span>© 2026 Workroo. All rights reserved.</span>
          <span>Melbourne, Australia</span>
        </div>
      </div>
    </footer>
  );
}
