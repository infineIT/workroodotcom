import React from "react";
import { cn } from "@/lib/utils";

/** Rounded framed base44 photo + optional caption. */
export default function MediaCard({ src, alt, caption, className, ratio = "aspect-[4/3]" }) {
  return (
    <figure className={cn("w-full", className)}>
      <div className={cn("img-frame border border-brand-line bg-brand-panel", ratio)}>
        <img src={src} alt={alt || ""} loading="lazy" />
      </div>
      {caption && (
        <figcaption className="mt-3 text-sm text-brand-slate">{caption}</figcaption>
      )}
    </figure>
  );
}
