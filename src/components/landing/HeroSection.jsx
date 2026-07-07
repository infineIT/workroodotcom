import React from "react";

export default function HeroSection() {
  return (
    <section id="top" className="bg-cream pt-28 md:pt-36">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-3xl pb-14 md:pb-20">
          <p className="eyebrow mb-5" data-hero-rise>
            Live workshop &amp; customer updates
          </p>

          <h1
            className="text-ink mb-6"
            style={{ fontSize: "clamp(2.4rem, 6vw, 4.3rem)" }}
            data-hero-rise
          >
            Mechanics and customers,{" "}
            <span className="text-rust">connected in real time.</span>
          </h1>

          <p className="text-ink/75 text-lg max-w-xl mb-9" data-hero-rise>
            A live, transparent record of every repair. Customers see what they
            pay for. Mechanics get credit for the work they do.
          </p>

          <div className="flex flex-wrap gap-3 mb-9" data-hero-rise>
            <a href="#cta" className="btn-pill btn-pill-solid">
              Get early access
            </a>
            <a href="#how-it-works" className="btn-pill">
              See how it works
            </a>
          </div>

          <p className="eyebrow eyebrow-muted" data-hero-rise>
            Trusted by workshops across Australia
          </p>
        </div>
      </div>

      {/* Full-bleed hero image */}
      <div
        className="img-frame w-full h-[52vh] md:h-[70vh]"
        data-img-reveal
        data-parallax
      >
        <img
          src="https://media.base44.com/images/public/69d78b7f4ff0affa598fbcbb/874291538_image.png"
          alt="Customer checking vehicle status on their phone"
        />
      </div>
    </section>
  );
}
