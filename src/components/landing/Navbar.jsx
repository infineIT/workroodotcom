import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const menuLinks = [
  { label: "Home", href: "#top" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Blog", href: "/blog" },
  { label: "Early access", href: "#cta" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Lock body scroll while the menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Escape closes the menu
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const handleLinkClick = (e, href) => {
    setMenuOpen(false);
    if (!href.startsWith("#")) {
      e.preventDefault();
      navigate(href);
      return;
    }
    // Hash link: smooth-scroll on the landing page, otherwise go home first
    if (location.pathname !== "/") {
      e.preventDefault();
      navigate("/" + href);
      return;
    }
    const target = href === "#top" ? document.body : document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    if (window.history?.replaceState) {
      window.history.replaceState(null, "", href === "#top" ? window.location.pathname : href);
    }
  };

  return (
    <div className={menuOpen ? "menu-is-open" : ""}>
      <header className="site-header">
        <a
          href="/"
          onClick={(e) => handleLinkClick(e, "#top")}
          aria-label="Workroo — home"
          className="logo-mark"
        >
          <img
            src="https://media.base44.com/images/public/69d78b7f4ff0affa598fbcbb/aaddf76e2_image.png"
            alt="Workroo"
          />
        </a>

        <button
          type="button"
          className="menu-btn"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="site-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      <nav id="site-menu" className={`menu-overlay ${menuOpen ? "open" : ""}`} aria-hidden={!menuOpen}>
        <div className="menu-motif-circle" aria-hidden="true" />
        <div className="menu-motif-word" aria-hidden="true">roo</div>

        <ul className="relative flex flex-col items-start gap-1">
          {menuLinks.map((link, i) => (
            <li key={link.label}>
              <a
                href={link.href.startsWith("#") ? `/${link.href}` : link.href}
                className="menu-link"
                style={{ "--i": i }}
                tabIndex={menuOpen ? 0 : -1}
                onClick={(e) => handleLinkClick(e, link.href)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="menu-foot font-body text-xs uppercase tracking-[0.2em]">
          <div className="flex items-center gap-6">
            <a
              href="https://www.workroo.com.au"
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={menuOpen ? 0 : -1}
            >
              Website
            </a>
            <a
              href="https://www.facebook.com/workroo/"
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={menuOpen ? 0 : -1}
            >
              Facebook
            </a>
            <a
              href="https://www.linkedin.com/company/workroo/"
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={menuOpen ? 0 : -1}
            >
              LinkedIn
            </a>
          </div>
          <span className="text-cream/40">Melbourne, Australia</span>
        </div>
      </nav>
    </div>
  );
}
