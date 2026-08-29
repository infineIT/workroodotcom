import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { customerLogos } from "@/content/testimonials";

export default function LogoRail({ note = "Trusted by workshops across Australia" }) {
  return (
    <div className="flex flex-col items-center gap-6">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-slate">
        {note}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
        {customerLogos.map((logo) => (
          <img
            key={logo.alt}
            src={logo.src}
            alt={logo.alt}
            className={`${logo.className} w-auto object-contain opacity-60 grayscale`}
          />
        ))}
        <Link
          to="/solutions/workshop-owners"
          className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand-blue hover:text-brand-blue-dark"
        >
          See case studies <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
