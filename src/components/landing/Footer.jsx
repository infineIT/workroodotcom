import React from "react";
import { Globe } from "lucide-react";

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
            <a href="mailto:workroo@infineit.com" className="text-gray-400 text-sm hover:text-white transition-colors block mb-2">
              workroo@infineit.com
            </a>
            <a href="tel:+61425164118" className="text-gray-400 text-sm hover:text-white transition-colors">
              +61 425 164 118
            </a>
          </div>

          {/* Platform links */}
          <div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-5">Platform</div>
            <ul className="space-y-3">
              {["Solution", "Features", "Market", "Testimonials"].map((item) =>
              <li key={item}>
                  <a
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-400 text-sm hover:text-orange-400 transition-colors">
                  
                    {item}
                  </a>
                </li>
              )}
              <li><a href="/blog" className="text-gray-400 text-sm hover:text-orange-400 transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-5">Follow Us</div>
            <div className="flex items-center gap-4">
              <a href="https://www.workroo.com.au" target="_blank" rel="noopener noreferrer" title="Website" className="text-gray-400 hover:text-white transition-colors">
                <Globe className="w-5 h-5" />
              </a>
              <a href="https://www.facebook.com/workroo/" target="_blank" rel="noopener noreferrer" title="Facebook" className="text-gray-400 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987H7.898V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/company/workroo/" target="_blank" rel="noopener noreferrer" title="LinkedIn" className="text-gray-400 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between gap-3 text-xs text-gray-600">
          <span>© 2026 workroo. All rights reserved.</span>
        </div>
      </div>
    </footer>);

}