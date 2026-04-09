import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const testimonials = [
  {
    quote:
      "Our customer engagement is 20% higher and increasing. workroo provides a platform to build trust on transparency.",
    name: "Yass",
    role: "Owner, Hallam Hi-Tech Australia",
    initial: "Y",
    photo: "https://www.workroo.com/assets/img/testimonials/testimonials-2.jpg",
    type: "Workshop Owner",
  },
  {
    quote:
      "I have total visibility on what's happening in my workshop. Confidently I can take a vacation.",
    name: "Nigal",
    role: "Operations Manager, Omega Auto Parts",
    initial: "N",
    photo: null,
    type: "Operations",
  },
  {
    quote:
      "Wow — this is so amazing! I have never seen what was done to my car before. Now I know what I pay for.",
    name: "Joanna Li",
    role: "Hallam Hi-Tech Customer",
    initial: "J",
    photo: "https://www.workroo.com/assets/img/testimonials/testimonials-1.jpg",
    type: "Customer",
  },
];

export default function TestimonialsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      id="testimonials"
      className="py-40 overflow-hidden"
      style={{ backgroundColor: "#FAF9F6" }}
    >
      <div className="max-w-[1400px] mx-auto px-8 md:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <span className="text-xs font-display tracking-[0.2em] uppercase text-obsidian/40">
            What Our Customers Say
          </span>
          <div className="mt-4 w-12 h-px bg-obsidian/20" />
          <h2
            className="font-display font-800 text-obsidian mt-6 leading-tight max-w-xl"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
          >
            Real Words from Real Workshops.
          </h2>
        </motion.div>

        {/* Testimonial grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className="p-10 flex flex-col justify-between"
              style={{
                background: i === 1 ? "#1A1A1A" : "rgba(250,249,246,0.8)",
                border: i === 1 ? "none" : "0.5px solid #E5E5E1",
                minHeight: 320,
              }}
            >
              {/* Type badge */}
              <div>
                <div
                  className="inline-block text-xs font-display tracking-widest uppercase px-3 py-1 mb-8"
                  style={{
                    backgroundColor: i === 1 ? "rgba(255,77,0,0.15)" : "rgba(26,26,26,0.05)",
                    color: i === 1 ? "#FF4D00" : "#C8C8C2",
                  }}
                >
                  {t.type}
                </div>

                {/* Quote mark */}
                <div
                  className="font-display text-5xl leading-none mb-4 -mt-2"
                  style={{ color: i === 1 ? "rgba(255,77,0,0.4)" : "#E5E5E1" }}
                >
                  "
                </div>

                <p
                  className="font-body text-lg leading-relaxed mb-10"
                  style={{ color: i === 1 ? "rgba(250,249,246,0.85)" : "#1A1A1A" }}
                >
                  {t.quote}
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-sm overflow-hidden flex-shrink-0">
                  {t.photo ? (
                    <img src={t.photo} alt={t.name} className="w-full h-full object-cover" />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center font-display font-700 text-sm"
                      style={{
                        backgroundColor: i === 1 ? "#FF4D00" : "#1A1A1A",
                        color: "#FAF9F6",
                      }}
                    >
                      {t.initial}
                    </div>
                  )}
                </div>
                <div>
                  <div
                    className="font-display font-600 text-sm"
                    style={{ color: i === 1 ? "#FAF9F6" : "#1A1A1A" }}
                  >
                    {t.name}
                  </div>
                  <div
                    className="text-xs font-body"
                    style={{ color: i === 1 ? "rgba(250,249,246,0.4)" : "#C8C8C2" }}
                  >
                    {t.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}