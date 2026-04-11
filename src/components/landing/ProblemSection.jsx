import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const appScreens = [
  "https://media.base44.com/images/public/69d78b7f4ff0affa598fbcbb/37b13a5d6_1.jpg",
  "https://media.base44.com/images/public/69d78b7f4ff0affa598fbcbb/17fa8e91a_WorkrooOnthephone1.jpg",
  "https://media.base44.com/images/public/69d78b7f4ff0affa598fbcbb/fdc93664b_WorkrooOnthephone.jpg",
];

export default function ProblemSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} id="problem" className="py-20 bg-gray-950 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* Scattered app screenshots grid */}
        <div className="grid grid-cols-3 md:grid-cols-5 gap-3 md:gap-4">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="rounded-xl overflow-hidden bg-gray-800"
              style={{
                aspectRatio: i % 3 === 0 ? "3/4" : "4/3",
                transform: `rotate(${(i % 5 - 2) * 2}deg)`,
              }}
            >
              <img
                src={appScreens[i % appScreens.length]}
                alt="App screen"
                className="w-full h-full object-cover opacity-80"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}