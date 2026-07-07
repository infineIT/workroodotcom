import React from "react";

export default function SolutionSection() {
  return (
    <section id="solution" className="section-pad bg-cream">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10" data-reveal-group>
          <div className="lg:col-span-4">
            <p className="eyebrow" data-reveal>
              The solution
            </p>
          </div>

          <div className="lg:col-span-8">
            <h2
              className="text-ink mb-8"
              style={{ fontSize: "clamp(1.9rem, 4vw, 2.9rem)" }}
              data-reveal
            >
              Make every repair <span className="text-rust">visible</span>.
            </h2>

            <p className="text-ink/75 text-lg leading-relaxed max-w-xl mb-14" data-reveal>
              Customers watch the work on their vehicle as it happens. Every
              step is documented in real time — a true record of the car that
              builds trust and keeps people coming back.
            </p>

            <div className="hairline-t pt-8 flex items-baseline gap-6" data-reveal>
              <span
                className="font-bold text-rust"
                style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
              >
                30%
              </span>
              <span className="eyebrow eyebrow-muted">More customer engagement</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
