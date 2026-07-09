import React, { useState } from "react";

const features = [
  {
    number: "01",
    title: "Live work capture",
    headline: "Make every repair visible",
    description:
      "Give customers a live, visual capture of the work on their vehicle. Every step is documented in real time — a true record of the car that builds trust and loyalty.",
    highlight: "30% more customer engagement",
  },
  {
    number: "02",
    title: "Real-time customer connection",
    headline: "Answer questions instantly",
    description:
      "Workroo opens a direct channel between your team and your customers. No missed calls, no guessing. A clear conversation at every stage of the job.",
    highlight: "Answered questions build trust",
  },
  {
    number: "03",
    title: "Intelligent alerts",
    headline: "Never miss a beat",
    description:
      "Send automated alerts for bookings, pickups and drop-offs. Build custom alert sequences that match your workshop's workflow — no coding required.",
    highlight: "Custom alerts, on your schedule",
  },
  {
    number: "04",
    title: "Cloud-first workshop",
    headline: "Do business anywhere",
    description:
      "Connect to your workshop from any device, anywhere. Stay across every job in progress and manage operations remotely — even on holiday.",
    highlight: "Full visibility, from anywhere",
  },
  {
    number: "05",
    title: "Booking diary",
    headline: "Bookings made simple",
    description:
      "Create, reschedule or delete bookings in a few clicks. Bookings convert straight into jobs, which saves you time.",
    highlight: "Faster bookings, less admin",
  },
  {
    number: "06",
    title: "Job management",
    headline: "Your workshop at a glance",
    description:
      "Keep up to date with every job in your workshop at a glance. Manage jobs with your colleagues centrally and in real time.",
    highlight: "Every job, in view",
  },
  {
    number: "07",
    title: "Invoicing and quoting",
    headline: "Quick and easy invoicing",
    description:
      "Invoice and quote fast with preconfigured items. Convert invoices and quotes into jobs or bookings directly.",
    highlight: "Invoice faster, get paid sooner",
  },
  {
    number: "08",
    title: "Customer and vehicle management",
    headline: "Know your customers",
    description:
      "Store customer details once and use them across the system, with auto-suggest and auto-complete doing the typing for you.",
    highlight: "Smart suggestions, less typing",
  },
  {
    number: "09",
    title: "Supplier management",
    headline: "Stay on top of supply",
    description:
      "Reorder from your trusted suppliers in a dash. Keep bills and payments organised without effort.",
    highlight: "Suppliers organised, cash flow clear",
  },
  {
    number: "10",
    title: "Service scheduling",
    headline: "Never miss a service",
    description:
      "Know which vehicles are due or overdue for service, and send reminders to customers by email or SMS.",
    highlight: "Reminders that send themselves",
  },
  {
    number: "11",
    title: "Reporting",
    headline: "Understand your business",
    description:
      "See the numbers that matter — sales, payments received, stock value and team efficiency — in one reporting system.",
    highlight: "Decisions backed by numbers",
  },
];

export default function FeaturesSection() {
  const [activeFeature, setActiveFeature] = useState(0);
  const feature = features[activeFeature];

  return (
    <section id="features" className="section-pad bg-cream">
      <div className="max-w-6xl mx-auto px-6">
        <div data-reveal-group className="mb-14 md:mb-20">
          <p className="eyebrow label-bar mb-5" data-reveal>
            Features
          </p>
          <h2
            className="text-ink max-w-3xl"
            style={{ fontSize: "clamp(1.9rem, 4vw, 2.9rem)" }}
            data-reveal
          >
            Every tool your workshop <span className="text-rust">needs</span>.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16" data-reveal-group>
          {/* Feature index */}
          <div className="lg:col-span-5" data-reveal>
            {features.map((f, i) => (
              <button
                key={f.number}
                type="button"
                onClick={() => setActiveFeature(i)}
                aria-current={i === activeFeature}
                className={`flex w-full items-baseline gap-5 text-left hairline-t py-3.5 transition-colors duration-300 ${
                  i === features.length - 1 ? "hairline-b" : ""
                }`}
              >
                <span
                  className={`text-xs font-semibold transition-colors duration-300 ${
                    i === activeFeature ? "text-rust" : "text-taupe"
                  }`}
                >
                  {f.number}
                </span>
                <span
                  className={`text-base font-semibold transition-colors duration-300 ${
                    i === activeFeature ? "text-ink" : "text-taupe"
                  }`}
                >
                  {f.title}
                </span>
              </button>
            ))}
          </div>

          {/* Feature detail */}
          <div className="lg:col-span-7 lg:pt-2" data-reveal key={activeFeature}>
            <span className="font-bold text-rust" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
              {feature.number}
            </span>
            <h3
              className="text-ink mt-4 mb-6"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)" }}
            >
              {feature.headline}
            </h3>
            <p className="text-ink/75 text-lg leading-relaxed max-w-lg mb-10">
              {feature.description}
            </p>
            <p className="eyebrow eyebrow-muted hairline-t pt-6 inline-block">{feature.highlight}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
