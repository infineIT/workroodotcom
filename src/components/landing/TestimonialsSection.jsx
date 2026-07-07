import React from "react";

const testimonials = [
  {
    quote:
      "Our customer engagement is 20% higher and increasing. Workroo gives us a platform to build trust on transparency.",
    name: "Yass",
    role: "Owner, Hallam Hi-Tech Australia",
    type: "Workshop owner",
    logo: "https://media.base44.com/images/public/69d78b7f4ff0affa598fbcbb/68dea466b_Hallam-Hi-Tech-Logo-Light-Background.png",
    logoSize: "h-10",
  },
  {
    quote:
      "I have total visibility on what's happening in my workshop. I can take a vacation with confidence.",
    name: "Nigal",
    role: "Operations Manager, Omega Auto Parts",
    type: "Operations",
    logo: "https://media.base44.com/images/public/69d78b7f4ff0affa598fbcbb/b8325d390_omega-auto-parts-logo-colour.svg",
    logoSize: "h-6",
  },
  {
    quote:
      "I had never seen what was done to my car before. Now I know what I pay for.",
    name: "Joanna Li",
    role: "Hallam Hi-Tech Customer",
    type: "Customer",
    logo: "https://media.base44.com/images/public/69d78b7f4ff0affa598fbcbb/68dea466b_Hallam-Hi-Tech-Logo-Light-Background.png",
    logoSize: "h-10",
  },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="section-pad bg-cream">
      <div className="max-w-6xl mx-auto px-6">
        <div data-reveal-group className="mb-14 md:mb-20">
          <p className="eyebrow mb-5" data-reveal>
            Testimonials
          </p>
          <h2
            className="font-display text-ink max-w-3xl"
            style={{ fontSize: "clamp(2.3rem, 5vw, 4rem)" }}
            data-reveal
          >
            Real words from{" "}
            <em className="italic text-rust">real workshops</em>.
          </h2>
        </div>

        <div data-reveal-group>
          {testimonials.map((t, i) => (
            <figure
              key={t.name}
              className={`hairline-t py-10 md:py-12 grid grid-cols-1 md:grid-cols-12 gap-6 ${
                i === testimonials.length - 1 ? "hairline-b" : ""
              }`}
              data-reveal
            >
              <div className="md:col-span-3">
                <p className="eyebrow">{t.type}</p>
              </div>
              <blockquote className="md:col-span-6">
                <p
                  className="font-display text-ink leading-snug"
                  style={{ fontSize: "clamp(1.35rem, 2.4vw, 1.9rem)" }}
                >
                  “{t.quote}”
                </p>
              </blockquote>
              <figcaption className="md:col-span-3 flex md:flex-col md:items-end justify-between gap-4">
                <div className="md:text-right">
                  <div className="text-ink text-sm font-medium">{t.name}</div>
                  <div className="text-taupe text-xs mt-1">{t.role}</div>
                </div>
                {t.logo && (
                  <img
                    src={t.logo}
                    alt={`${t.role.split(", ")[1] || t.name} logo`}
                    className={`${t.logoSize} w-auto object-contain opacity-70`}
                  />
                )}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
