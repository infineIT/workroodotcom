import React, { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-sm border-b border-gray-100" : "bg-white"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <span className="font-bold text-gray-900 text-lg tracking-tight">WORKROO</span>

        <div className="hidden md:flex items-center gap-8">
          {["Solution", "Features", "Market", "Testimonials"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
                className="text-sm text-gray-600 hover:text-orange-500 transition-colors"
            >
              {item}
            </a>
          ))}
        </div>

        <a
          href="#cta"
          className="hidden md:inline-flex items-center px-4 py-2 text-sm font-medium text-white rounded transition-all hover:opacity-90"
          style={{ backgroundColor: "#E8481A" }}
        >
          Get Early Access
        </a>

        <button className="md:hidden flex flex-col gap-1.5 p-2">
          <span className="w-5 h-px bg-gray-900 block" />
          <span className="w-5 h-px bg-gray-900 block" />
          <span className="w-3 h-px bg-gray-900 block" />
        </button>
      </div>
    </nav>
  );
}