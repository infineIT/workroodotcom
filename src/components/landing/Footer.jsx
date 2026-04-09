import React from "react";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer
      className="py-16 overflow-hidden"
      style={{ backgroundColor: "#1A1A1A", borderTop: "0.5px solid rgba(255,255,255,0.06)" }}
    >
      <div className="max-w-[1400px] mx-auto px-8 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-20 mb-16">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <div className="w-7 h-7 bg-white/10 rounded-sm flex items-center justify-center">
                <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: "#FF4D00" }} />
              </div>
              <span className="font-display font-700 text-white text-lg tracking-tight">workroo</span>
            </div>
            <p className="text-white/35 font-body text-sm leading-relaxed max-w-xs">
              Connecting mechanics and customers in real time. Building the True Car Record.
            </p>
            <div className="mt-6">
              <a
                href="mailto:hello@workroo.com.au"
                className="text-sm font-body transition-colors duration-200 hover:text-white"
                style={{ color: "rgba(255,77,0,0.8)" }}
              >
                hello@workroo.com.au
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <div className="text-xs font-display tracking-[0.2em] uppercase text-white/20 mb-6">Platform</div>
            <ul className="space-y-3">
              {["Solution", "Features", "Market", "Testimonials"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-white/40 font-body text-sm hover:text-white transition-colors duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="text-xs font-display tracking-[0.2em] uppercase text-white/20 mb-6">Company</div>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://www.workroo.com.au"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/40 font-body text-sm hover:text-white transition-colors duration-200"
                >
                  www.workroo.com.au
                </a>
              </li>
              <li>
                <span className="text-white/40 font-body text-sm">
                  Built by Charith Haputhanthree
                </span>
              </li>
              <li>
                <div
                  className="inline-flex items-center gap-2 px-3 py-2 mt-2"
                  style={{ border: "0.5px solid rgba(255,77,0,0.3)" }}
                >
                  <span className="text-white/30 text-xs font-body">Promo</span>
                  <span className="font-display font-700 text-xs tracking-widest" style={{ color: "#FF4D00" }}>
                    INNOVHUB
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: "0.5px solid rgba(255,255,255,0.06)" }}
        >
          <p className="text-white/20 text-xs font-body">
            © 2024 workroo. All rights reserved.
          </p>
          <p className="text-white/20 text-xs font-body">
            IBISWorld report G3911 · NADA Data
          </p>
        </div>
      </div>
    </footer>
  );
}