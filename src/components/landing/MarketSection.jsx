import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const segments = [
  {
    label: "Local Mechanics",
    sub: "Independents & Franchises",
    revenue: "$76bn",
    detail: "Local AU market",
  },
  {
    label: "Major Dealerships",
    sub: "Independents & Major groups",
    revenue: "$186bn",
    detail: "Global opportunity",
    featured: true,
  },
  {
    label: "Global Market",
    sub: "5,000+ businesses",
    revenue: "$64.6bn",
    detail: "International reach",
  },
];

export default function MarketSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="market" className="py-40 bg-alabaster overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-8 md:px-16">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-24 items-end">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              className="text-xs font-display tracking-[0.2em] uppercase text-obsidian/40"
            >
              Market Opportunity
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display font-800 text-obsidian mt-5 leading-tight"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
            >
              A{" "}
              <span style={{ color: "#FF4D00" }}>$186bn</span>{" "}
              Global Stage.
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-obsidian/55 text-lg leading-relaxed"
          >
            From independent mechanics to major dealership chains — workroo's
            platform is purpose-built to scale across the entire automotive
            service ecosystem, locally and globally.
          </motion.p>
        </div>

        {/* Market cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {segments.map((seg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 + i * 0.12 }}
              className="p-10 relative overflow-hidden"
              style={{
                backgroundColor: seg.featured ? "#1A1A1A" : "rgba(229,229,225,0.3)",
                border: seg.featured ? "none" : "0.5px solid #E5E5E1",
              }}
            >
              {seg.featured && (
                <div
                  className="absolute top-0 right-0 px-3 py-1.5 text-xs font-display tracking-widest uppercase text-white"
                  style={{ backgroundColor: "#FF4D00" }}
                >
                  Total
                </div>
              )}
              <div
                className="font-display font-800 mb-4 leading-none"
                style={{
                  fontSize: "clamp(2.5rem, 4vw, 3.5rem)",
                  color: seg.featured ? "#FAF9F6" : "#1A1A1A",
                }}
              >
                {seg.revenue}
              </div>
              <div
                className="font-display font-600 text-xl mb-2"
                style={{ color: seg.featured ? "rgba(250,249,246,0.9)" : "#1A1A1A" }}
              >
                {seg.label}
              </div>
              <div
                className="text-sm font-body mb-1"
                style={{ color: seg.featured ? "rgba(250,249,246,0.4)" : "#C8C8C2" }}
              >
                {seg.sub}
              </div>
              <div
                className="text-xs font-display tracking-widest uppercase mt-6"
                style={{ color: seg.featured ? "#FF4D00" : "#C8C8C2" }}
              >
                {seg.detail}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Roadmap */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-0"
          style={{ border: "0.5px solid #E5E5E1" }}
        >
          {[
            {
              phase: "Phase 1 — 1–2 Years",
              items: ["Major dealerships", "Mid-size workshops", "Mechanic App & diagnostics integrations", "Digital logbook"],
            },
            {
              phase: "Phase 2 — 2–4 Years",
              items: ["Subscription plans & integrations", "Predictive maintenance via ML", "Data monetization — history reports", "Aftermarket performance analytics"],
            },
          ].map((phase, i) => (
            <div
              key={i}
              className="p-10"
              style={{ borderLeft: i === 1 ? "0.5px solid #E5E5E1" : "none" }}
            >
              <div className="text-xs font-display tracking-widest uppercase mb-6" style={{ color: "#FF4D00" }}>
                {phase.phase}
              </div>
              <ul className="space-y-3">
                {phase.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-3 text-obsidian/70 font-body text-base">
                    <span className="w-1 h-1 rounded-full bg-obsidian/30 mt-2.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}