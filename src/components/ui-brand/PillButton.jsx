import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

/**
 * The one button in the system. Fully-rounded pill, SimpleTexting-style.
 *   variant: "primary"   lime fill, ink text (main CTA)
 *            "secondary" ink outline on light backgrounds
 *            "on-dark"   white outline on dark/colour backgrounds
 * Renders <Link> for `to`, <a> for `href`, otherwise <button>.
 */
const VARIANTS = {
  primary:
    "bg-brand-lime text-brand-ink border border-brand-lime hover:brightness-95",
  secondary:
    "bg-transparent text-brand-ink border border-brand-ink/25 hover:border-brand-ink hover:bg-brand-ink hover:text-white",
  "on-dark":
    "bg-transparent text-white border border-white/40 hover:bg-white hover:text-brand-ink",
  blue:
    "bg-brand-blue text-white border border-brand-blue hover:bg-brand-blue-dark",
};

export default function PillButton({
  variant = "primary",
  to,
  href,
  className,
  children,
  ...props
}) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-pill px-6 py-3 text-sm font-semibold leading-none transition-colors duration-200 disabled:opacity-55 disabled:pointer-events-none",
    VARIANTS[variant],
    className
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
