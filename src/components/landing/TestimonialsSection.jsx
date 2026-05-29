import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const testimonials = [
  {
    quote: "Our customer engagement is 20% higher and increasing. workroo provides a platform to build trust on transparency.",
    name: "Yass",
    role: "Owner, Hallam Hi-Tech Australia",
    initial: "Y",
    photo: null,
    type: "Workshop Owner",
    logo: "https://media.base44.com/images/public/69d78b7f4ff0affa598fbcbb/68dea466b_Hallam-Hi-Tech-Logo-Light-Background.png",
  },
  {
    quote: "I have total visibility on what's happening in my workshop. Confidently I can take a vacation.",
    name: "Nigal",
    role: "Operations Manager, Omega Auto Parts",
    initial: "N",
    photo: null,
    type: "Operations",
    featured: true,
    logo: "https://media.base44.com/images/public/69d78b7f4ff0affa598fbcbb/b8325d390_omega-auto-parts-logo-colour.svg",
  },
  {
    quote: "Wow — this is so amazing! I have never seen what was done to my car before. Now I know what I pay for.",
    name: "Joanna Li",
    role: "Hallam Hi-Tech Customer",
    initial: "J",
    photo: null,
    type: "Customer",
    logo: "https://media.base44.com/images/public/69d78b7f4ff0affa598fbcbb/68dea466b_Hallam-Hi-Tech-Logo-Light-Background.png",
  },
];

export default function TestimonialsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="testimonials" className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-14"
        >
          <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "#F05A28" }}>Testimonials</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Real Words from Real Workshops.</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className={`rounded-2xl p-8 flex flex-col justify-between ${
                t.featured
                  ? "text-white"
                  : "bg-white border border-gray-100 shadow-sm"
              }`}
              style={t.featured ? { backgroundColor: "#111111" } : {}}
            >
              <div>
                <span
                  className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-6"
                  style={{
                    backgroundColor: t.featured ? "rgba(240,90,40,0.18)" : "#FEF0EA",
                    color: t.featured ? "#F07A55" : "#F05A28",
                  }}
                >
                  {t.type}
                </span>
                <p
                  className="text-base leading-relaxed mb-6"
                  style={{ color: t.featured ? "rgba(255,255,255,0.85)" : "#374151" }}
                >
                  "{t.quote}"
                </p>
              </div>
              {t.logo && (
                <div className="mb-4">
                  <img src={t.logo} alt="Company logo" className="h-6 w-auto object-contain" />
                </div>
              )}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0">
                  {t.photo ? (
                    <img src={t.photo} alt={t.name} className="w-full h-full object-cover" />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center text-white text-sm font-bold"
                      style={{ backgroundColor: "#F05A28" }}
                    >
                      {t.initial}
                    </div>
                  )}
                </div>
                <div>
                  <div
                    className="text-sm font-semibold"
                    style={{ color: t.featured ? "#fff" : "#111111" }}
                  >
                    {t.name}
                  </div>
                  <div
                    className="text-xs"
                    style={{ color: t.featured ? "rgba(255,255,255,0.4)" : "#9CA3AF" }}
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