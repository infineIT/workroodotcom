import React from "react";
import { cn } from "@/lib/utils";

/** Full-width colour band. `bg="blue" | "navy" | "navy-deep"`. */
export default function FullBleedSection({ bg = "blue", className, children }) {
  const bgClass =
    bg === "navy"
      ? "bg-brand-navy"
      : bg === "navy-deep"
      ? "bg-brand-navy-deep"
      : "bg-brand-blue";
  return (
    <section className={cn("section-pad text-white", bgClass, className)}>
      <div className="max-w-6xl mx-auto px-6">{children}</div>
    </section>
  );
}
