import React from "react";

const stats = [
  { value: "20+ hrs", label: "Saved per week", sublabel: "Per workshop" },
  { value: "100%", label: "Customer retention", sublabel: "Proven outcomes" },
  { value: "24 min", label: "Average session", sublabel: "Time spent" },
  { value: "+30%", label: "Customer engagement", sublabel: "And growing" },
];

export default function StatsSection() {
  return (
    <section className="section-pad bg-cream">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-12" data-reveal-group>
          {stats.map((stat) => (
            <div key={stat.label} className="hairline-t pt-6" data-reveal>
              <div
                className="font-display text-ink mb-4"
                style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.6rem)" }}
              >
                {stat.value}
              </div>
              <div className="eyebrow mb-1">{stat.label}</div>
              <div className="text-taupe text-sm">{stat.sublabel}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
