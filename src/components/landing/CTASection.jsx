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
    <section ref={ref} id="cta" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: "#E8481A" }}
            >
              Get Started
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight"
            >
              Your Workshop's{" "}
              <span style={{ color: "#E8481A" }}>Digital Future</span>{" "}
              Starts Today.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="text-gray-500 text-lg leading-relaxed mb-8"
            >
              Join workshops across Australia already using workroo to build trust, reduce friction, and grow their business.
            </motion.p>

            <ul className="space-y-3 mb-8">
              {included.map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#FEF0EA" }}>
                    <Check className="w-3 h-3" style={{ color: "#E8481A" }} strokeWidth={3} />
                  </div>
                  <span className="text-gray-600 text-sm">{item}</span>
                </li>
              ))}
            </ul>

            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg border border-gray-200">
              <span className="text-gray-400 text-sm">Promo Code</span>
              <span className="font-bold text-sm tracking-widest" style={{ color: "#E8481A" }}>INNOVHUB</span>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8 md:p-10"
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <div className="w-14 h-14 rounded-full flex items-center justify-center mb-5" style={{ backgroundColor: "#FEF0EA" }}>
                  <Check className="w-7 h-7" style={{ color: "#E8481A" }} strokeWidth={2.5} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">You're on the list.</h3>
                <p className="text-gray-500 text-sm">
                  We'll be in touch at <span className="text-gray-800">{email}</span>
                </p>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-bold text-gray-900 mb-1">Request Early Access</h3>
                <p className="text-gray-400 text-sm mb-6">No credit card required.</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Workshop Name</label>
                    <input
                      type="text"
                      placeholder="Hallam Hi-Tech"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="hello@yourworkshop.com.au"
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Workshop Size</label>
                    <select
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white"
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
                    className="w-full flex items-center justify-center gap-2 py-3 text-white font-semibold rounded-lg text-sm transition-opacity hover:opacity-90 mt-2"
                    style={{ backgroundColor: "#E8481A" }}
                  >
                    Get Early Access
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>

                <p className="text-gray-400 text-xs text-center mt-4">
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