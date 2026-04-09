import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

const included = [
  "Live job capture & customer portal",
  "Real-time messaging & alerts",
  "Cloud dashboard — any device",
  "Digital car record per vehicle",
  "No setup fees",
];

export default function CTASection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section
      ref={ref}
      id="cta"
      className="py-40 overflow-hidden"
      style={{ backgroundColor: "#1A1A1A" }}
    >
      <div className="max-w-[1400px] mx-auto px-8 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left: Copy */}
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              className="text-xs font-display tracking-[0.2em] uppercase text-white/30"
            >
              Get Started
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display font-800 text-white mt-5 leading-tight mb-6"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
            >
              Your Workshop's{" "}
              <span style={{ color: "#FF4D00" }}>Digital Future</span>{" "}
              Starts Today.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-white/50 text-lg leading-relaxed mb-12"
            >
              Join workshops across Australia already using workroo to build
              trust, reduce friction, and grow their business — one transparent
              job at a time.
            </motion.p>

            {/* Included list */}
            <motion.ul
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="space-y-3 mb-10"
            >
              {included.map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div
                    className="w-5 h-5 rounded-sm flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "#FF4D00" }}
                  >
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                  </div>
                  <span className="text-white/70 font-body text-base">{item}</span>
                </li>
              ))}
            </motion.ul>

            {/* Promo code */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="inline-flex items-center gap-3 px-5 py-3"
              style={{ border: "0.5px solid rgba(255,255,255,0.12)" }}
            >
              <span className="text-white/30 text-sm font-body">Promo Code</span>
              <span className="font-display font-700 tracking-widest text-sm" style={{ color: "#FF4D00" }}>
                INNOVHUB
              </span>
            </motion.div>
          </div>

          {/* Right: Form card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="p-10 md:p-14"
            style={{
              background: "rgba(250,249,246,0.04)",
              border: "0.5px solid rgba(255,255,255,0.1)",
              backdropFilter: "blur(12px)",
            }}
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div
                  className="w-16 h-16 flex items-center justify-center mb-6"
                  style={{ backgroundColor: "#FF4D00" }}
                >
                  <Check className="w-8 h-8 text-white" strokeWidth={2.5} />
                </div>
                <h3 className="font-display font-700 text-white text-2xl mb-3">
                  You're on the list.
                </h3>
                <p className="text-white/50 font-body">
                  We'll be in touch shortly at{" "}
                  <span className="text-white/80">{email}</span>
                </p>
              </div>
            ) : (
              <>
                <h3 className="font-display font-700 text-white text-2xl mb-2">
                  Request Early Access
                </h3>
                <p className="text-white/40 font-body text-base mb-8">
                  Join the workshop revolution. No credit card required.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-display tracking-widest uppercase text-white/30 mb-2">
                      Workshop Name
                    </label>
                    <input
                      type="text"
                      placeholder="Hallam Hi-Tech"
                      className="w-full px-4 py-3.5 bg-transparent text-white placeholder-white/20 font-body text-base focus:outline-none"
                      style={{ border: "0.5px solid rgba(255,255,255,0.15)" }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-display tracking-widest uppercase text-white/30 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="hello@yourworkshop.com.au"
                      required
                      className="w-full px-4 py-3.5 bg-transparent text-white placeholder-white/20 font-body text-base focus:outline-none"
                      style={{ border: "0.5px solid rgba(255,255,255,0.15)" }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-display tracking-widest uppercase text-white/30 mb-2">
                      Workshop Size
                    </label>
                    <select
                      className="w-full px-4 py-3.5 bg-obsidian text-white/60 font-body text-base focus:outline-none appearance-none"
                      style={{ border: "0.5px solid rgba(255,255,255,0.15)" }}
                    >
                      <option value="">Select size</option>
                      <option>Solo mechanic</option>
                      <option>2–5 staff</option>
                      <option>5–20 staff</option>
                      <option>20+ staff / dealership</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-3 px-6 py-4 text-white font-display font-600 text-base transition-opacity duration-200 hover:opacity-90 mt-6 group"
                    style={{ backgroundColor: "#FF4D00" }}
                  >
                    Get Early Access
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </form>

                <p className="text-white/25 text-xs font-body text-center mt-6">
                  By submitting, you agree to be contacted by the workroo team.
                </p>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}