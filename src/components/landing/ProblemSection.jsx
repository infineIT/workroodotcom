import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    url: "https://media.base44.com/images/public/69d78b7f4ff0affa598fbcbb/cf4c7e93a_generated_image.png",
    alt: "Workshop booking and job management dashboard",
    step: "Step 1",
    title: "Automated Bookings & Job Management",
    description: "Streamline your workshop with automated booking confirmations and centralised job management — so your team always knows what's next.",
  },
  {
    url: "https://media.base44.com/images/public/69d78b7f4ff0affa598fbcbb/f72246a88_workroocustomerview-task.jpg",
    alt: "Customer connected in real time",
    step: "Step 2",
    title: "Customers Get Connected in Real Time",
    description: "The moment work begins, customers receive live updates on their phone — no more wondering what's happening to their vehicle.",
  },
  {
    url: "https://media.base44.com/images/public/69d78b7f4ff0affa598fbcbb/f53e445e5_generated_image.png",
    alt: "Mechanic documenting progress",
    step: "Step 3",
    title: "Mechanics Document Progress",
    description: "Technicians log every job digitally as they work — creating a verified record that builds trust and eliminates disputes.",
  },
  {
    url: "https://media.base44.com/images/public/69d78b7f4ff0affa598fbcbb/40b0203b6_WorkrooOnthephone1.jpg",
    alt: "Satisfied and returning customers",
    step: "Step 4",
    title: "Satisfied & Returning Customers",
    description: "Transparency builds loyalty. Customers who can see exactly what was done — and why — keep coming back and refer others.",
  },
];

export default function ProblemSection() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "#F05A28" }}>
            How It Works
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">The Workroo Story</h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-stretch">
          {/* Main image */}
          <div className="w-full lg:w-3/5 relative rounded-2xl overflow-hidden shadow-xl bg-gray-200" style={{ minHeight: 360 }}>
            <AnimatePresence mode="wait">
              <motion.img
                key={active}
                src={slides[active].url}
                alt={slides[active].alt}
                className="w-full h-full object-cover absolute inset-0"
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
              />
            </AnimatePresence>

            {/* Caption overlay */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`caption-${active}`}
                className="absolute bottom-0 left-0 right-0 p-6"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 100%)" }}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#F05A28" }}>
                  {slides[active].step}
                </span>
                <h3 className="text-white text-xl font-bold mt-1">{slides[active].title}</h3>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Story steps */}
          <div className="w-full lg:w-2/5 flex flex-col gap-3 justify-center">
            {slides.map((slide, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`text-left rounded-xl p-5 transition-all duration-400 border ${
                  active === i
                    ? "bg-white shadow-md border-orange-200"
                    : "bg-white/60 border-transparent hover:bg-white hover:shadow-sm"
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Thumbnail */}
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <img src={slide.url} alt={slide.alt} className="w-full h-full object-cover" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="text-xs font-bold uppercase tracking-wider"
                        style={{ color: active === i ? "#F05A28" : "#9CA3AF" }}
                      >
                        {slide.step}
                      </span>
                      {active === i && (
                        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: "#F05A28" }} />
                      )}
                    </div>
                    <h4
                      className="font-semibold text-sm leading-snug mb-1"
                      style={{ color: active === i ? "#111111" : "#6B7280" }}
                    >
                      {slide.title}
                    </h4>
                    <AnimatePresence>
                      {active === i && (
                        <motion.p
                          className="text-xs text-gray-500 leading-relaxed"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {slide.description}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Progress bar for active */}
                {active === i && (
                  <motion.div
                    className="mt-3 h-0.5 rounded-full"
                    style={{ backgroundColor: "#F05A28" }}
                    initial={{ scaleX: 0, originX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 7, ease: "linear" }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}