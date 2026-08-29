import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Linkedin } from "lucide-react";
import { footerColumns, CONTACT, LOGO_SRC } from "@/content/nav";

export default function Footer() {
  return (
    <footer className="bg-brand-ink text-white">
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <img src={LOGO_SRC} alt="Workroo" className="h-9 w-9 rounded-full" />
              <span className="font-display text-xl">Workroo</span>
            </Link>
            <p className="mt-4 text-sm text-white/60 max-w-xs leading-relaxed">
              Mechanics and customers, connected in real time. A true record of
              every car.
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href="https://www.facebook.com/workroo/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 hover:bg-white/10"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://www.linkedin.com/company/workroo/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 hover:bg-white/10"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {footerColumns.map((col) => (
            <div key={col.title}>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/40 mb-4">
                {col.title}
              </p>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.to ? (
                      <Link
                        to={link.to}
                        className="text-sm text-white/75 hover:text-brand-lime transition-colors"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-white/75 hover:text-brand-lime transition-colors"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-8 border-t border-white/12 flex flex-col md:flex-row justify-between gap-3 text-xs text-white/40">
          <span>© {new Date().getFullYear()} Workroo. All rights reserved.</span>
          <div className="flex gap-5">
            <a href={`mailto:${CONTACT.email}`} className="hover:text-white/70">
              {CONTACT.email}
            </a>
            <a href={CONTACT.phoneHref} className="hover:text-white/70">
              {CONTACT.phone}
            </a>
            <span>{CONTACT.location}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
