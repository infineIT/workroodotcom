import React from "react";
import { cn } from "@/lib/utils";

/** Panel card: lucide icon + title + description + optional highlight. */
export default function FeatureCard({ icon: Icon, title, description, highlight, id, className }) {
  return (
    <div
      id={id}
      className={cn(
        "scroll-mt-28 rounded-card bg-brand-panel p-7 border border-brand-line h-full flex flex-col",
        className
      )}
    >
      {Icon && (
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-blue/10 text-brand-blue mb-5">
          <Icon className="h-5 w-5" strokeWidth={2} />
        </span>
      )}
      <h3 className="text-xl text-brand-ink">{title}</h3>
      <p className="mt-2 text-brand-ink/70 text-sm leading-relaxed flex-1">
        {description}
      </p>
      {highlight && (
        <p className="mt-5 pt-4 border-t border-brand-line text-xs font-semibold uppercase tracking-[0.1em] text-brand-slate">
          {highlight}
        </p>
      )}
    </div>
  );
}
