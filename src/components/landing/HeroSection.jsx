import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay },
});

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen overflow-hidden pt-14"
      style={{ background: "linear-gradient(135deg, #FFF3EE 0%, #FFE4D6 40%, #FFF5F0 100%)" }}
    >
      {/* Hero background image — right side */}
      <div
        className="absolute inset-y-0 right-0 w-full lg:w-3/5 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://media.base44.com/images/public/69d78b7f4ff0affa598fbcbb/e16354ee4_generated_image.png')`,
        }}
      >
        {/* Fade overlay so text side stays readable */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, #FFF3EE 0%, rgba(255,243,238,0.5) 40%, transparent 100%)" }} />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-56px)]">
        {/* Left: Text */}
        <div className="flex flex-col justify-center py-16">
          <motion.h1
            {...fadeUp(0.1)}
            className="font-bold text-gray-900 leading-[1.1] mb-5"
            style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)" }}
          >
            Mechanics &amp; Customers{" "}
            <span style={{ color: "#F05A28" }} className="underline decoration-orange-400 underline-offset-4">
              Connected in Real Time.
            </span>
          </motion.h1>

          <motion.p {...fadeUp(0.2)} className="text-gray-500 text-lg leading-relaxed max-w-md mb-8">
            workroo creates a live, transparent record of every repair — so
            customers know what they pay for, and mechanics finally get the
            recognition their work deserves.
          </motion.p>

          <motion.div {...fadeUp(0.3)} className="flex flex-col sm:flex-row gap-3 mb-10">
            <a
              href="#cta"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-semibold text-white rounded-lg transition-all hover:opacity-90"
              style={{ backgroundColor: "#F05A28" }}
            >
              Start Free Trial
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#solution"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-all"
            >
              See How It Works
            </a>
          </motion.div>

          <motion.div {...fadeUp(0.4)} className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {["#F05A28", "#111111", "#D44D1F"].map((c, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-semibold"
                  style={{ backgroundColor: c }}
                >
                  {["Y", "N", "J"][i]}
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500">Trusted by workshops across Australia</p>
          </motion.div>
        </div>

        {/* Right: empty — image fills this space via absolute bg */}
        <div className="hidden lg:block" />
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-gray-400">
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </div>
    </section>
  );
}