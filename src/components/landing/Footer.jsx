import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-white">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#F05A28" }}>
                <span className="text-white font-bold text-sm">W</span>
              </div>
              <span className="font-bold text-white text-base tracking-tight">WORKROO</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4 max-w-xs">
              Connecting mechanics and customers in real time, building the True Car Record.
            </p>
            <a href="mailto:hello@workroo.com.au" className="text-gray-400 text-sm hover:text-white transition-colors">
              hello@workroo.com.au
            </a>
          </div>

          {/* Platform links */}
          <div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-5">Platform</div>
            <ul className="space-y-3">
              {["Solution", "Features", "Market", "Testimonials"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-400 text-sm hover:text-orange-400 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-5">Company</div>
            <ul className="space-y-3">
              <li>
                <a href="https://www.workroo.com.au" target="_blank" rel="noopener noreferrer" className="text-gray-400 text-sm hover:text-white transition-colors">
                  www.workroo.com.au
                </a>
              </li>
              <li>
                <span className="text-gray-400 text-sm">Built by Chanth Haputhantree</span>
              </li>
              <li>
                <span
                  className="inline-flex items-center gap-2 text-xs font-bold tracking-widest px-3 py-1.5 rounded"
                  style={{ backgroundColor: "#F05A28", color: "#fff" }}
                >
                  Promo: IWISHWUR
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between gap-3 text-xs text-gray-600">
          <span>© 2024 workroo. All rights reserved.</span>
          <span>MECHANIC'S ONLY - NDIA</span>
          <span>WISHWUR report ©2021</span>
        </div>
      </div>
    </footer>
  );
}