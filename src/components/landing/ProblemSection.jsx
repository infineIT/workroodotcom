import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  {
    url: "https://media.base44.com/images/public/69d78b7f4ff0affa598fbcbb/40b0203b6_WorkrooOnthephone1.jpg",
    alt: "Customer checking workroo app on phone",
  },
  {
    url: "https://media.base44.com/images/public/69d78b7f4ff0affa598fbcbb/f72246a88_workroocustomerview-task.jpg",
    alt: "Workroo customer view with tasks",
  },
  {
    url: "https://media.base44.com/images/public/69d78b7f4ff0affa598fbcbb/27778f5fc_3.jpg",
    alt: "Mechanic using workroo on tablet",
  },
];

export default function ProblemSection() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "#F05A28" }}>
            In Action
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">See Workroo at Work</h2>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-6">
          {/* Main prominent image */}
          <div className="w-full lg:w-2/3 relative rounded-2xl overflow-hidden shadow-xl aspect-video bg-gray-200">
            <AnimatePresence mode="wait">
              <motion.img
                key={active}
                src={images[active].url}
                alt={images[active].alt}
                className="w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
              />
            </AnimatePresence>
          </div>

          {/* Thumbnails */}
          <div className="flex lg:flex-col gap-4 w-full lg:w-1/3">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`relative rounded-xl overflow-hidden transition-all duration-300 flex-1 lg:flex-none aspect-video lg:aspect-auto lg:h-28 ${
                  active === i
                    ? "ring-2 ring-offset-2 shadow-lg scale-105"
                    : "opacity-60 hover:opacity-85"
                }`}
                style={active === i ? { ringColor: "#F05A28" } : {}}
              >
                <img
                  src={img.url}
                  alt={img.alt}
                  className="w-full h-full object-cover"
                />
                {active === i && (
                  <div
                    className="absolute inset-0 border-2 rounded-xl pointer-events-none"
                    style={{ borderColor: "#F05A28" }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="w-2 h-2 rounded-full transition-all duration-300"
              style={{
                backgroundColor: active === i ? "#F05A28" : "#D1D5DB",
                transform: active === i ? "scale(1.4)" : "scale(1)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}