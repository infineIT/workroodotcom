import React from "react";
import { cn } from "@/lib/utils";
import Reveal from "./Reveal";

export function Accent({ color = "blue", children }) {
  return (
    <span className={color === "lime" ? "text-brand-lime" : "text-brand-blue"}>
      {children}
    </span>
  );
}

/**
 * Eyebrow + display headline + optional sub-paragraph.
 * `tone="dark"` for use on navy/blue backgrounds.
 */
export default function SectionHeading({
  eyebrow,
  title,
  sub,
  align = "left",
  tone = "light",
  className,
  children,
}) {
  const dark = tone === "dark";
  return (
    <div
      className={cn(
        align === "center" ? "text-center mx-auto max-w-2xl" : "max-w-2xl",
        className
      )}
    >
      {eyebrow && (
        <Reveal
          as="p"
          className={cn(
            "text-xs font-semibold uppercase tracking-[0.16em] mb-4",
            dark ? "text-white/60" : "text-brand-slate"
          )}
        >
          {eyebrow}
        </Reveal>
      )}
      <Reveal
        as="h2"
        className={cn(
          "text-[clamp(1.9rem,4vw,3rem)]",
          dark ? "text-white" : "text-brand-ink"
        )}
      >
        {title || children}
      </Reveal>
      {sub && (
        <Reveal
          as="p"
          delay={0.05}
          className={cn(
            "mt-5 text-lg leading-relaxed",
            dark ? "text-white/70" : "text-brand-ink/70",
            align === "center" && "mx-auto"
          )}
        >
          {sub}
        </Reveal>
      )}
    </div>
  );
}
