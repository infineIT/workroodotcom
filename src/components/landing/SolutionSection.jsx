import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Wrench, Users, TrendingUp } from "lucide-react";

const pillars = [
  {
    icon: Wrench,
    title: "Happy Mechanics",
    description: "For the first time, their work is visible. Every repair step documented, recognized, and valued.",
  },
  {
    icon: Users,
    title: "Happy Customers",
    description: "They know exactly what they pay for. Real-time transparency builds loyalty that lasts.",
  },
  {
    icon: TrendingUp,
    title: "Grow the Industry",
    description: "A true digital record builds industry-wide trust and drives sustainable growth for everyone.",
  },
];

export default function SolutionSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="solution" className="py-40 bg-alabaster overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-8 md:px-16">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-28">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
              className="text-xs font-display tracking-[0.2em] uppercase text-obsidian/40"
            >
              The Solution
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display font-800 text-obsidian mt-5 leading-tight"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
            >
              Connect. Capture.{" "}
              <span style={{ color: "#FF4D00" }}>Build Trust.</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="flex items-end"
          >
            <p className="text-obsidian/60 text-lg leading-relaxed max-w-lg">
              workroo connects customers and mechanics in real time, creating a
              live, visual record of every job. No more guesswork. No more
              invoices without evidence. Just pure, transparent service.
            </p>
          </motion.div>
        </div>

        {/* Pillar cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 + i * 0.15 }}
              className="p-10 group cursor-default"
              style={{
                background: "rgba(250,249,246,0.8)",
                border: "0.5px solid #E5E5E1",
                transition: "box-shadow 0.3s ease",
              }}
              whileHover={{ boxShadow: "0 20px 60px rgba(26,26,26,0.08)" }}
            >
              <div
                className="w-12 h-12 flex items-center justify-center mb-8"
                style={{ backgroundColor: "#1A1A1A" }}
              >
                <pillar.icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-display font-700 text-obsidian text-2xl mb-4">
                {pillar.title}
              </h3>
              <p className="text-obsidian/55 font-body text-base leading-relaxed">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}