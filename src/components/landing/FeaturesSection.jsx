import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Eye, MessageCircle, Bell, Cloud } from "lucide-react";

const features = [
  {
    icon: Eye,
    number: "01",
    title: "Live Work Capture",
    headline: "Make Every Repair Visible",
    description:
      "Provide customers with a live, visual capture of all work carried out on their vehicle. Every step is documented in real time — creating a True Car Record that builds genuine trust and brand loyalty.",
    highlight: "20% increase in customer engagement",
  },
  {
    icon: MessageCircle,
    number: "02",
    title: "Real-Time Customer Connection",
    headline: "Answer Questions Instantly",
    description:
      "workroo opens seamless communication channels between your team and your customers. No more missed calls, no more guessing. Transparent dialogue at every stage of the job.",
    highlight: "Answer queries → Build trust → Grow business",
  },
  {
    icon: Bell,
    number: "03",
    title: "Intelligent Alerts",
    headline: "Never Miss a Beat",
    description:
      "Send automated alerts for bookings, pickups, and drop-offs. Build custom alert sequences and schedule them to match your workshop's unique workflow — no coding required.",
    highlight: "Custom alerts, on your schedule",
  },
  {
    icon: Cloud,
    number: "04",
    title: "Cloud-First Workshop",
    headline: "Do Business Anywhere",
    description:
      "Connect to your workshop from any device, anywhere in the world. Stay informed about every job in progress, manage operations remotely, and never be out of the loop — even on vacation.",
    highlight: "Full visibility. Zero boundaries.",
  },
];

export default function FeaturesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [activeFeature, setActiveFeature] = useState(0);

  return (
    <section ref={ref} id="features" className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-14 text-center"
        >
          <p className="text-sm font-semibold text-indigo-500 uppercase tracking-widest mb-3">Features</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 max-w-2xl mx-auto leading-tight">
            Every Tool Your Workshop Needs.{" "}
            <span className="text-indigo-500">Nothing It Doesn't.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Tab list */}
          <div className="lg:col-span-2 flex flex-col gap-2">
            {features.map((f, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                onClick={() => setActiveFeature(i)}
                className={`text-left p-5 rounded-xl border transition-all duration-200 ${
                  i === activeFeature
                    ? "bg-white border-indigo-200 shadow-sm"
                    : "bg-transparent border-transparent hover:bg-white hover:border-gray-100"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="text-xs font-mono"
                    style={{ color: i === activeFeature ? "#6366F1" : "#9CA3AF" }}
                  >
                    {f.number}
                  </span>
                  <span
                    className="font-semibold text-sm"
                    style={{ color: i === activeFeature ? "#111111" : "#9CA3AF" }}
                  >
                    {f.title}
                  </span>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Feature detail */}
          <motion.div
            key={activeFeature}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 shadow-sm p-8 md:p-10 flex flex-col justify-between"
            style={{ minHeight: 320 }}
          >
            <div>
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                style={{ backgroundColor: "#EEF2FF" }}
              >
                {React.createElement(features[activeFeature].icon, {
                  className: "w-6 h-6",
                  style: { color: "#6366F1" },
                })}
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                {features[activeFeature].headline}
              </h3>
              <p className="text-gray-500 text-base leading-relaxed mb-8">
                {features[activeFeature].description}
              </p>
            </div>
            <div className="bg-gray-900 text-white text-sm font-medium rounded-lg px-5 py-3 inline-block">
              {features[activeFeature].highlight}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}