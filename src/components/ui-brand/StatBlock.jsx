import React from "react";
import { cn } from "@/lib/utils";

/** Big display number + label. Static — no count-up. */
export default function StatBlock({ value, label, tone = "light", className }) {
  const dark = tone === "dark";
  return (
    <div className={className}>
      <div
        className={cn(
          "font-display font-semibold leading-none text-[clamp(2.2rem,4vw,3.2rem)]",
          dark ? "text-brand-lime" : "text-brand-blue"
        )}
      >
        {value}
      </div>
      <div
        className={cn(
          "mt-3 text-sm",
          dark ? "text-white/70" : "text-brand-slate"
        )}
      >
        {label}
      </div>
    </div>
  );
}
