import React from "react";

const WORDMARK = "Workroo";

export default function HeroSection() {
  return (
    <section id="top" className="bg-cream pt-32 md:pt-40">
      <div className="max-w-6xl mx-auto px-6">
        <p className="eyebrow mb-6" data-hero-rise>
          Live workshop &amp; customer updates
        </p>

        <h1
          className="font-display text-ink leading-[0.92] tracking-[-0.03em] mb-8"
          style={{ fontSize: "clamp(4.2rem, 15vw, 12.5rem)", fontWeight: 340 }}
          data-hero-letters
          aria-label={WORDMARK}
        >
          {WORDMARK.split("").map((ch, i) => (
            <span key={i} className="hero-letter-wrap" aria-hidden="true">
              <span className="hero-letter">{ch}</span>
            </span>
          ))}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-16 md:pb-24">
          <div className="lg:col-span-7">
            <p
              className="font-display text-ink leading-[1.15]"
              style={{ fontSize: "clamp(1.7rem, 3.4vw, 2.7rem)", fontWeight: 340 }}
              data-hero-rise
            >
              Mechanics and customers,{" "}
              <em className="italic text-rust">connected</em> in real time.
            </p>
          </div>

          <div className="lg:col-span-5 flex flex-col items-start gap-8">
            <p className="text-ink/75 max-w-md" data-hero-rise>
              A live, transparent record of every repair. Customers see what
              they pay for. Mechanics get credit for the work they do.
            </p>

            <div className="flex flex-wrap gap-3" data-hero-rise>
              <a href="#cta" className="btn-pill btn-pill-solid">
                Get early access
              </a>
              <a href="#how-it-works" className="btn-pill">
                See how it works
              </a>
            </div>

            <p className="eyebrow" data-hero-rise>
              Trusted by workshops across Australia
            </p>
          </div>
        </div>
      </div>

      {/* Full-bleed hero image */}
      <div
        className="img-frame w-full h-[52vh] md:h-[74vh]"
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
