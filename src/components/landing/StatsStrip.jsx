import React, { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/motion";

/* Numbers are split into prefix/value/suffix so the value can be counted up
   while the punctuation around it stays put. */
/* Two lines per cell, no sublabel — the strip has to sit inside the shallow
   band under the hero without pushing the next section down. */
const stats = [
  { prefix: "", to: 20, suffix: "+ hrs", label: "Saved per week" },
  { prefix: "", to: 100, suffix: "%", label: "Customer retention" },
  { prefix: "", to: 24, suffix: " min", label: "Average session" },
  { prefix: "+", to: 30, suffix: "%", label: "Customer engagement" },
];

const DURATION = 1400;
const easeOut = (t) => 1 - Math.pow(1 - t, 3);

/** Counts 0 -> `to` once, when `run` first turns true. */
function useCountUp(to, run) {
  const [value, setValue] = useState(0);
  const done = useRef(false);

  useEffect(() => {
    if (!run || done.current) return;
    done.current = true;

    if (prefersReducedMotion()) {
      setValue(to);
      return;
    }

    let frame;
    let start;
    const step = (now) => {
      if (start === undefined) start = now;
      const progress = Math.min((now - start) / DURATION, 1);
      setValue(Math.round(easeOut(progress) * to));
      if (progress < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [run, to]);

  return value;
}

function Stat({ stat, run, index }) {
  const value = useCountUp(stat.to, run);

  return (
    <div
      className={`stat-cell ${run ? "is-live" : ""}`}
      style={{ "--stat-i": index }}
    >
      <span className="stat-rule" aria-hidden="true" />
      <div className="stat-value">
        {stat.prefix}
        {value}
        {stat.suffix}
      </div>
      <div className="stat-label eyebrow">{stat.label}</div>
    </div>
  );
}

/**
 * The proof numbers, sitting in the cream strip directly beneath the hero so
 * the first thing under the image is evidence. Counts up on first scroll-in.
 */
export default function StatsStrip() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // No IntersectionObserver (or no JS motion at all): show the finished numbers.
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setInView(true);
        observer.disconnect();
      },
      { threshold: 0.35 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="stat-band bg-cream">
      <div ref={ref} className="max-w-6xl mx-auto px-6 stat-grid">
        {stats.map((stat, i) => (
          <Stat key={stat.label} stat={stat} run={inView} index={i} />
        ))}
      </div>
    </section>
  );
}
