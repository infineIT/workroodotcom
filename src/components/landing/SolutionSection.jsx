import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function SolutionSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} id="solution" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 md:p-14 max-w-3xl mx-auto">
          {/* Workroo icon */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
            style={{ backgroundColor: "#E8481A" }}
          >
            <span className="text-white font-bold text-2xl">W</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight"
          >
            Make Every Repair Visible
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-500 text-lg leading-relaxed mb-8"
          >
            Provide customers with a live, visual capture of all work carried out on their vehicle.
            Every step is documented in real time — creating a True Car Record that builds genuine trust
            and brand loyalty.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-full rounded-lg py-4 px-6 text-center text-white font-semibold text-base"
            style={{ backgroundColor: "#E8481A" }}
          >
            30% increase in customer engagement
          </motion.div>
        </div>
      </div>
    </section>
  );
}