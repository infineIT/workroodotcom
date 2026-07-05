import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

const navLinks = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
  { label: "Testimonials", href: "#testimonials" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll while the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Smooth-scroll to an in-page anchor regardless of host routing quirks.
  const handleAnchorClick = (e, href) => {
    if (!href.startsWith("#")) return; // let real routes (e.g. /blog) navigate normally
    const target = href === "#top" ? document.body : document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    setMenuOpen(false);
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    // Keep the URL hash in sync without triggering a jump/reload
    if (window.history?.replaceState) {
      window.history.replaceState(null, "", href === "#top" ? window.location.pathname : href);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-sm border-b border-gray-100" : "bg-white"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <a href="#top" onClick={(e) => handleAnchorClick(e, "#top")} className="flex items-center">
          <img src="https://media.base44.com/images/public/69d78b7f4ff0affa598fbcbb/aaddf76e2_image.png" alt="Workroo" className="h-14 w-auto" />
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleAnchorClick(e, item.href)}
              className="text-sm text-gray-600 hover:text-orange-500 transition-colors"
            >
              {item.label}
            </a>
          ))}
          <a href="/blog" className="text-sm text-gray-600 hover:text-orange-500 transition-colors">Blog</a>
        </div>

        <a
          href="#cta"
          onClick={(e) => handleAnchorClick(e, "#cta")}
          className="hidden md:inline-flex items-center px-4 py-2 text-sm font-medium text-white rounded transition-all hover:opacity-90"
          style={{ backgroundColor: "#F05A28" }}
        >
          Get Early Access
        </a>

        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className="md:hidden flex items-center justify-center p-2 -mr-2"
        >
          {menuOpen ? (
            <X className="w-6 h-6 text-gray-900" />
          ) : (
            <span className="flex flex-col gap-1.5">
              <span className="w-5 h-px bg-gray-900 block" />
              <span className="w-5 h-px bg-gray-900 block" />
              <span className="w-3 h-px bg-gray-900 block" />
            </span>
          )}
        </button>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 top-14 z-40">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="relative bg-white border-b border-gray-100 shadow-lg px-6 py-6 flex flex-col gap-1">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleAnchorClick(e, item.href)}
                className="py-3 text-base font-medium text-gray-800 hover:text-orange-500 transition-colors border-b border-gray-50"
              >
                {item.label}
              </a>
            ))}
            <a
              href="/blog"
              onClick={() => setMenuOpen(false)}
              className="py-3 text-base font-medium text-gray-800 hover:text-orange-500 transition-colors border-b border-gray-50"
            >
              Blog
            </a>
            <a
              href="#cta"
              onClick={(e) => handleAnchorClick(e, "#cta")}
              className="mt-4 inline-flex items-center justify-center px-4 py-3 text-base font-semibold text-white rounded-lg transition-all hover:opacity-90"
              style={{ backgroundColor: "#F05A28" }}
            >
              Get Early Access
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
