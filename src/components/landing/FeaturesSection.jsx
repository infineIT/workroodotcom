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
    <section ref={ref} id="features" className="py-40 overflow-hidden" style={{ backgroundColor: "#FAF9F6" }}>
      <div className="max-w-[1400px] mx-auto px-8 md:px-16">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <span className="text-xs font-display tracking-[0.2em] uppercase text-obsidian/40">
            Features
          </span>
          <div className="mt-4 w-12 h-px bg-obsidian/20" />
          <h2
            className="font-display font-800 text-obsidian mt-6 leading-tight max-w-2xl"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
          >
            Every Tool Your Workshop Needs.{" "}
            <span style={{ color: "#FF4D00" }}>Nothing It Doesn't.</span>
          </h2>
        </motion.div>

        {/* Feature tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Tab list */}
          <div className="lg:col-span-2 flex flex-col gap-0">
            {features.map((f, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                onClick={() => setActiveFeature(i)}
                className="text-left p-6 relative transition-all duration-300 group"
                style={{
                  borderLeft: i === activeFeature ? "2px solid #FF4D00" : "2px solid transparent",
                  borderBottom: "0.5px solid #E5E5E1",
                  backgroundColor: i === activeFeature ? "rgba(255,77,0,0.03)" : "transparent",
                }}
              >
                <div className="flex items-center gap-4">
                  <span
                    className="text-xs font-display tracking-widest"
                    style={{ color: i === activeFeature ? "#FF4D00" : "#C8C8C2" }}
                  >
                    {f.number}
                  </span>
                  <span
                    className="font-display font-600 text-base transition-colors"
                    style={{ color: i === activeFeature ? "#1A1A1A" : "#C8C8C2" }}
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-3 p-10 md:p-14 flex flex-col justify-between"
            style={{
              background: "rgba(250,249,246,0.6)",
              border: "0.5px solid #E5E5E1",
              backdropFilter: "blur(12px)",
              minHeight: 360,
            }}
          >
            <div>
              <div
                className="w-14 h-14 flex items-center justify-center mb-10"
                style={{ backgroundColor: "#FF4D00" }}
              >
                {React.createElement(features[activeFeature].icon, {
                  className: "w-6 h-6 text-white",
                })}
              </div>
              <h3 className="font-display font-800 text-obsidian text-3xl md:text-4xl mb-6 leading-tight">
                {features[activeFeature].headline}
              </h3>
              <p className="text-obsidian/60 font-body text-lg leading-relaxed mb-10">
                {features[activeFeature].description}
              </p>
            </div>
            <div
              className="px-5 py-4"
              style={{ backgroundColor: "#1A1A1A" }}
            >
              <p className="text-white/80 font-display text-sm tracking-wide">
                {features[activeFeature].highlight}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}