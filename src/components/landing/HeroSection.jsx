import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay },
});

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-alabaster overflow-hidden flex flex-col justify-center pt-16">
      {/* Architectural grid lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-px h-full bg-stone opacity-40" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-stone opacity-20" />
        <div className="absolute top-1/3 left-0 right-0 h-px bg-stone opacity-30" />
      </div>

      {/* Accent circle */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.04] pointer-events-none"
        style={{ backgroundColor: "#FF4D00", filter: "blur(80px)" }}
      />

      <div className="max-w-[1400px] mx-auto px-8 md:px-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[calc(100vh-64px)]">
          {/* Left: Text */}
          <div className="flex flex-col justify-center py-20">
            <motion.div {...fadeUp(0.1)} className="mb-6">
              <span
                className="inline-block text-xs font-display tracking-[0.2em] uppercase px-3 py-1.5 border text-obsidian/60"
                style={{ borderColor: "#E5E5E1" }}
              >
                The True Car Record
              </span>
            </motion.div>

            <motion.h1
              {...fadeUp(0.2)}
              className="font-display font-800 text-obsidian leading-[1.05] mb-6"
              style={{ fontSize: "clamp(3rem, 6vw, 5.5rem)" }}
            >
              Mechanics &amp;{" "}
              <span className="relative">
                Customers
                <span
                  className="absolute -bottom-1 left-0 right-0 h-px"
                  style={{ backgroundColor: "#FF4D00" }}
                />
              </span>
              <br />
              Connected in{" "}
              <em className="not-italic" style={{ color: "#FF4D00" }}>
                Real Time.
              </em>
            </motion.h1>

            <motion.p
              {...fadeUp(0.35)}
              className="text-obsidian/60 text-lg leading-relaxed max-w-md mb-10"
            >
              workroo creates a live, transparent record of every repair — so
              customers know what they pay for, and mechanics finally get the
              recognition their work deserves.
            </motion.p>

            <motion.div {...fadeUp(0.45)} className="flex flex-col sm:flex-row gap-4">
              <a
                href="#cta"
                className="inline-flex items-center gap-2 px-7 py-4 text-base font-display font-600 text-white transition-all duration-200 hover:opacity-90 group"
                style={{ backgroundColor: "#FF4D00" }}
              >
                Start Free Trial
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#solution"
                className="inline-flex items-center gap-2 px-7 py-4 text-base font-display text-obsidian border transition-all duration-200 hover:bg-stone/40"
                style={{ borderColor: "#E5E5E1" }}
              >
                See How It Works
              </a>
            </motion.div>

            {/* Trust badge */}
            <motion.div {...fadeUp(0.55)} className="mt-12 flex items-center gap-6">
              <div className="flex -space-x-2">
                {["#1A1A1A", "#444", "#666"].map((c, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-alabaster flex items-center justify-center text-white text-xs font-display"
                    style={{ backgroundColor: c }}
                  >
                    {["Y", "N", "J"][i]}
                  </div>
                ))}
              </div>
              <p className="text-sm text-obsidian/50 font-body">
                Trusted by workshops across Australia
              </p>
            </motion.div>
          </div>

          {/* Right: Visual dashboard mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="hidden lg:flex items-center justify-center relative py-20"
          >
            <div className="relative w-full max-w-lg">
              {/* Main card */}
              <div
                className="w-full rounded-sm p-6 shadow-2xl"
                style={{
                  background: "rgba(250,249,246,0.7)",
                  backdropFilter: "blur(20px)",
                  border: "0.5px solid #E5E5E1",
                  boxShadow: "0 40px 80px rgba(26,26,26,0.12)",
                }}
              >
                {/* Header bar */}
                <div className="flex items-center justify-between mb-5 pb-4" style={{ borderBottom: "0.5px solid #E5E5E1" }}>
                  <div>
                    <div className="text-xs font-display tracking-widest uppercase text-obsidian/40 mb-1">Live Job</div>
                    <div className="font-display font-700 text-obsidian text-lg">Toyota Camry 2021</div>
                  </div>
                  <div
                    className="px-3 py-1 text-xs font-display tracking-wide text-white"
                    style={{ backgroundColor: "#FF4D00" }}
                  >
                    IN PROGRESS
                  </div>
                </div>

                {/* Steps */}
                {[
                  { step: "01", label: "Oil filter replacement", done: true },
                  { step: "02", label: "Brake pad inspection", done: true },
                  { step: "03", label: "Tyre rotation — Front axle", done: false },
                  { step: "04", label: "Full safety check", done: false },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 py-3" style={{ borderBottom: i < 3 ? "0.5px solid #E5E5E1" : "none" }}>
                    <div
                      className="w-8 h-8 rounded-sm flex items-center justify-center text-xs font-display font-600 flex-shrink-0"
                      style={{
                        backgroundColor: item.done ? "#1A1A1A" : "#E5E5E1",
                        color: item.done ? "#FAF9F6" : "#1A1A1A",
                      }}
                    >
                      {item.done ? "✓" : item.step}
                    </div>
                    <span className={`text-sm font-body ${item.done ? "line-through text-obsidian/30" : "text-obsidian/80"}`}>
                      {item.label}
                    </span>
                  </div>
                ))}

                {/* Progress bar */}
                <div className="mt-5">
                  <div className="flex justify-between text-xs text-obsidian/40 font-body mb-2">
                    <span>Progress</span>
                    <span>50%</span>
                  </div>
                  <div className="w-full h-1 bg-stone rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "50%" }}
                      transition={{ delay: 1, duration: 1.2, ease: "easeOut" }}
                      className="h-full"
                      style={{ backgroundColor: "#FF4D00" }}
                    />
                  </div>
                </div>
              </div>

              {/* Floating notification */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="absolute -bottom-8 -left-10 px-4 py-3 rounded-sm shadow-lg"
                style={{
                  background: "rgba(250,249,246,0.95)",
                  border: "0.5px solid #E5E5E1",
                  backdropFilter: "blur(12px)",
                  minWidth: 200,
                }}
              >
                <div className="text-xs text-obsidian/40 font-display tracking-wide uppercase mb-0.5">Customer Alert</div>
                <div className="text-sm font-body text-obsidian">Your car is ready for pickup 🚗</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-px h-12 bg-gradient-to-b from-obsidian/30 to-transparent" />
        <span className="text-xs font-display tracking-[0.15em] uppercase text-obsidian/30">Scroll</span>
      </motion.div>
    </section>
  );
}