import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: "20+ hrs", label: "Saved Per Week", sublabel: "per workshop" },
  { value: "100%", label: "Customer Retention", sublabel: "proven outcomes", accent: true },
  { value: "24 min", label: "Avg. Time Spent", sublabel: "per session" },
  { value: "+30%", label: "Customer Engagement", sublabel: "and growing" },
];

export default function StatsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 bg-white border-y border-gray-100">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <div
                className="text-4xl md:text-5xl font-bold mb-2"
                style={{ color: stat.accent ? "#F05A28" : "#111111" }}
              >
                {stat.value}
              </div>
              <div className="text-sm font-medium text-gray-700 mb-1">{stat.label}</div>
              <div className="text-xs text-gray-400 uppercase tracking-wide">{stat.sublabel}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}