import React from "react";

export default function HeroSection() {
  return (
    <section id="top" className="hero relative text-white">
      <div className="hero-split">
        {/* Left: type on its own clean field — never competing with the photo */}
        <div className="hero-panel">
          <div className="hero-panel-inner">
            <p className="eyebrow label-bar" data-hero-rise>
              Live workshop &amp; customer updates
            </p>

            <h1 className="hero-title" data-hero-rise>
              Mechanics and customers,{" "}
              <span className="hero-title-accent">connected in real time.</span>
            </h1>

            <p className="hero-body" data-hero-rise>
              A live, transparent record of every repair. Customers see what
              they pay for. Mechanics get credit for the work they do.
            </p>

            <div className="hero-actions" data-hero-rise>
              <a href="#cta" className="btn-pill btn-pill-solid">
                Get early access
              </a>
              <a href="#how-it-works" className="btn-pill btn-pill-light">
                See how it works
              </a>
            </div>
          </div>
        </div>

        {/* Right: the photo, left as a photo — graded warm, not buried */}
        <div className="hero-figure" aria-hidden="true">
          <img
            src="https://media.base44.com/images/public/69d78b7f4ff0affa598fbcbb/f53e445e5_generated_image.png"
            alt=""
          />
          <div className="hero-figure-grade" />
          <div className="hero-figure-edge" />
          <div className="hero-grain" />
        </div>
      </div>

      {/* Trust line moved out of the stack and onto its own full-width rail */}
      <div className="hero-rail">
        <span className="hero-rail-mark" />
        Trusted by workshops across Australia
      </div>

      <div className="hero-grain hero-grain-global" aria-hidden="true" />
    </section>
  );
}
