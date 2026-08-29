import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { navGroups } from "@/content/nav";
import PillButton from "@/components/ui-brand/PillButton";

export default function MobileNav({ open, onClose }) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!open) return null;

  return (
    <div className="lg:hidden fixed inset-0 z-50">
      <div className="absolute inset-0 bg-brand-ink/40" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-[86%] max-w-sm bg-white p-6 overflow-y-auto">
        <div className="flex justify-end">
          <button
            type="button"
            aria-label="Close menu"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-brand-ink"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="mt-4 space-y-7">
          {navGroups.map((group) => (
            <div key={group.label}>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-slate mb-3">
                {group.label}
              </p>
              <ul className="space-y-1">
                {group.items.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      onClick={onClose}
                      className="block py-2 text-lg font-medium text-brand-ink"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-3">
          <PillButton variant="secondary" to="/how-it-works" onClick={onClose}>
            Book a demo
          </PillButton>
          <PillButton variant="primary" to="/early-access" onClick={onClose}>
            Request early access
          </PillButton>
        </div>
      </div>
    </div>
  );
}
