import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  {
    value: "8",
    label: "Average Visits Per Day",
    sublabel: "per workshop",
  },
  {
    value: "100%",
    label: "Customer Retention",
    sublabel: "proven outcomes",
    accent: true,
  },
  {
    value: "24 min",
    label: "Avg. Time Spent",
    sublabel: "per session",
  },
  {
    value: "+20%",
    label: "Customer Engagement",
    sublabel: "and growing",
  },
];

export default function StatsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="py-32"
      style={{ backgroundColor: "#1A1A1A" }}
    >
      <div className="max-w-[1400px] mx-auto px-8 md:px-16">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="text-xs font-display tracking-[0.2em] uppercase text-white/30 mb-16"
        >
          What We Know
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="p-8 md:p-12"
              style={{ borderLeft: "0.5px solid rgba(255,255,255,0.08)" }}
            >
              <div
                className="font-display font-800 mb-3 leading-none"
                style={{
                  fontSize: "clamp(2.5rem, 5vw, 4rem)",
                  color: stat.accent ? "#FF4D00" : "#FAF9F6",
                }}
              >
                {stat.value}
              </div>
              <div className="font-display text-sm text-white/70 mb-1">
                {stat.label}
              </div>
              <div className="text-xs text-white/25 font-body tracking-wide uppercase">
                {stat.sublabel}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}