import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu } from "lucide-react";
import { navGroups, LOGO_SRC } from "@/content/nav";
import PillButton from "@/components/ui-brand/PillButton";
import MobileNav from "./MobileNav";
import { cn } from "@/lib/utils";

function Dropdown({ group }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const closeTimer = useRef(null);

  const show = () => {
    clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const hide = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={(e) => {
        if (!ref.current?.contains(e.relatedTarget)) setOpen(false);
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1 py-2 text-sm font-medium text-brand-ink/80 hover:text-brand-ink"
      >
        {group.label}
        <ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <div className="absolute left-0 top-full pt-3 w-72 z-50">
          <div className="rounded-2xl border border-brand-line bg-white p-2 shadow-xl shadow-brand-ink/5">
            {group.items.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="block rounded-xl px-3 py-2.5 hover:bg-brand-panel"
              >
                <span className="block text-sm font-semibold text-brand-ink">
                  {item.label}
                </span>
                <span className="block text-xs text-brand-slate mt-0.5">
                  {item.desc}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-brand-line">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
        <Link to="/" aria-label="Workroo — home" className="flex items-center gap-2">
          <img src={LOGO_SRC} alt="Workroo" className="h-9 w-9 rounded-full" />
          <span className="font-display text-xl text-brand-ink">Workroo</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {navGroups.map((group) => (
            <Dropdown key={group.label} group={group} />
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <PillButton variant="secondary" to="/how-it-works">
            Book a demo
          </PillButton>
          <PillButton variant="primary" to="/early-access">
            Request early access
          </PillButton>
        </div>

        <button
          type="button"
          className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl text-brand-ink"
          aria-label="Open menu"
          onClick={() => setMobileOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
