import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-alabaster/90 backdrop-blur-md border-b border-stone"
          : "bg-transparent"
      }`}
      style={{ backdropFilter: scrolled ? "blur(16px)" : "none" }}
    >
      <div className="max-w-[1400px] mx-auto px-8 md:px-16 h-16 flex items-center justify-between">
        {/* Logo — real Workroo logo, inverted to show dark on light bg */}
        <div className="flex items-center">
          <img
            src="https://www.workroo.com/assets/img/logo.png"
            alt="Workroo"
            className="h-9 object-contain"
            style={{ filter: "brightness(0) saturate(100%)" }}
            onError={(e) => {
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "flex";
            }}
          />
          {/* Fallback */}
          <div className="items-center gap-1.5" style={{ display: "none" }}>
            <svg width="22" height="14" viewBox="0 0 22 14" fill="none">
              <path d="M1 13 Q11 1 21 13" stroke="#FF4D00" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
            </svg>
            <span className="font-display font-800 text-obsidian text-lg tracking-tight">WORKROO</span>
          </div>
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-10">
          {["Solution", "Features", "Market", "Testimonials"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-body text-obsidian/60 hover:text-obsidian transition-colors duration-200 tracking-wide"
            >
              {item}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#cta"
          className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-display font-600 tracking-wide text-white transition-all duration-200 hover:opacity-90 focus:outline-2 focus:outline-offset-2"
          style={{ backgroundColor: "#FF4D00" }}
        >
          Get Early Access
        </a>

        {/* Mobile hamburger */}
        <button className="md:hidden flex flex-col gap-1.5 p-2">
          <span className="w-5 h-px bg-obsidian block" />
          <span className="w-5 h-px bg-obsidian block" />
          <span className="w-3 h-px bg-obsidian block" />
        </button>
      </div>
    </motion.nav>
  );
}