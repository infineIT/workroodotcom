import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const problems = [
  {
    number: "01",
    title: "Lack of Trust",
    description:
      "Customers hand over their car and hope for the best. There's no transparency, no visibility — just an invoice at the end with no proof of what was actually done.",
  },
  {
    number: "02",
    title: "Nasty Surprises",
    description:
      "Unexpected costs, unexplained repairs, and zero communication during the job erode confidence and damage the relationship between mechanics and their customers.",
  },
  {
    number: "03",
    title: "No Easy Way Exists",
    description:
      "The auto repair industry has no standard digital record. Every job vanishes into paper receipts and verbal explanations — leaving both sides in the dark.",
  },
];

export default function ProblemSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="py-40 bg-obsidian overflow-hidden"
      id="problem"
    >
      <div className="max-w-[1400px] mx-auto px-8 md:px-16">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <span className="text-xs font-display tracking-[0.2em] uppercase text-white/30">
            The Problem
          </span>
          <div className="mt-4 w-12 h-px" style={{ backgroundColor: "#FF4D00" }} />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {problems.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="p-10 md:p-12 relative"
              style={{
                borderLeft: "0.5px solid rgba(255,255,255,0.08)",
                borderTop: "0.5px solid rgba(255,255,255,0.08)",
              }}
            >
              <div
                className="text-6xl font-display font-800 mb-8 leading-none"
                style={{ color: "rgba(255,77,0,0.12)" }}
              >
                {p.number}
              </div>
              <h3 className="font-display font-700 text-white text-2xl mb-4 leading-tight">
                {p.title}
              </h3>
              <p className="text-white/40 font-body text-base leading-relaxed">
                {p.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-24 pt-16"
          style={{ borderTop: "0.5px solid rgba(255,255,255,0.08)" }}
        >
          <p
            className="font-display font-700 text-white/90 leading-tight max-w-4xl"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}
          >
            The automotive industry runs on trust.{" "}
            <em className="not-italic" style={{ color: "#FF4D00" }}>
              That trust is broken.
            </em>
          </p>
        </motion.div>
      </div>
    </section>
  );
}