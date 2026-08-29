import React from "react";
import { cn } from "@/lib/utils";

/** Quote / case-study card. variant: "white" | "navy" | "blue". */
export default function CaseStudyCard({ testimonial, variant = "white", className }) {
  const styles = {
    white: "bg-white border border-brand-line text-brand-ink",
    navy: "bg-brand-navy text-white",
    blue: "bg-brand-blue text-white",
  }[variant];
  const muted = variant === "white" ? "text-brand-slate" : "text-white/70";

  return (
    <figure className={cn("rounded-card p-8 flex flex-col h-full", styles, className)}>
      <p
        className={cn(
          "text-xs font-semibold uppercase tracking-[0.14em] mb-5",
          variant === "white" ? "text-brand-blue" : "text-brand-lime"
        )}
      >
        {testimonial.type}
      </p>
      <blockquote className="text-lg leading-snug font-medium flex-1">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-6 flex items-center justify-between gap-4">
        <div>
          <div className="text-sm font-semibold">{testimonial.name}</div>
          <div className={cn("text-xs mt-0.5", muted)}>{testimonial.role}</div>
        </div>
        {testimonial.logo && (
          <img
            src={testimonial.logo}
            alt=""
            className={cn(
              testimonial.logoSize,
              "w-auto object-contain opacity-70",
              variant !== "white" && "brightness-0 invert"
            )}
          />
        )}
      </figcaption>
    </figure>
  );
}
