import React from "react";

export default function HeroSection() {
  return (
    <section id="top" className="relative bg-ink text-white">
      {/* Workshop backdrop */}
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src="https://media.base44.com/images/public/69d78b7f4ff0affa598fbcbb/f53e445e5_generated_image.png"
          alt=""
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(13,12,12,0.93) 0%, rgba(13,12,12,0.72) 55%, rgba(13,12,12,0.45) 100%)",
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 min-h-[88vh] flex flex-col justify-center pt-28 pb-20">
        <div className="max-w-3xl">
          <p className="eyebrow label-bar mb-6" data-hero-rise>
            Live workshop &amp; customer updates
          </p>

          <h1
            className="text-white mb-6"
            style={{ fontSize: "clamp(2.9rem, 7.5vw, 5.6rem)" }}
            data-hero-rise
          >
            Mechanics and customers,{" "}
            <span className="text-rust-bright">connected in real time.</span>
          </h1>

          <p className="text-white/80 text-lg max-w-xl mb-9" data-hero-rise>
            A live, transparent record of every repair. Customers see what they
            pay for. Mechanics get credit for the work they do.
          </p>

          <div className="flex flex-wrap gap-3 mb-9" data-hero-rise>
            <a href="#cta" className="btn-pill btn-pill-solid">
              Get early access
            </a>
            <a href="#how-it-works" className="btn-pill btn-pill-light">
              See how it works
            </a>
          </div>

          <p className="eyebrow !text-white/60" data-hero-rise>
            Trusted by workshops across Australia
          </p>
        </div>
      </div>
    </section>
  );
}
