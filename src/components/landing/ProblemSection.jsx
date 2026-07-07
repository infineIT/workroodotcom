import React, { useState, useEffect } from "react";

const slides = [
  {
    url: "https://media.base44.com/images/public/69d78b7f4ff0affa598fbcbb/cf4c7e93a_generated_image.png",
    alt: "Workshop booking and job management dashboard",
    step: "01",
    title: "Bookings and jobs, in one place",
    description:
      "Bookings confirm themselves. Jobs live in a single view. Your team always knows what comes next.",
  },
  {
    url: "https://media.base44.com/images/public/69d78b7f4ff0affa598fbcbb/f72246a88_workroocustomerview-task.jpg",
    alt: "Customer connected in real time",
    step: "02",
    title: "Customers connect in real time",
    description:
      "The moment work begins, updates reach the customer's phone. No more wondering what's happening to the car.",
  },
  {
    url: "https://media.base44.com/images/public/69d78b7f4ff0affa598fbcbb/f53e445e5_generated_image.png",
    alt: "Mechanic documenting progress",
    step: "03",
    title: "Mechanics document the work",
    description:
      "Technicians log each job as they go. The result is a verified record that ends disputes before they start.",
  },
  {
    url: "https://media.base44.com/images/public/69d78b7f4ff0affa598fbcbb/40b0203b6_WorkrooOnthephone1.jpg",
    alt: "Satisfied and returning customers",
    step: "04",
    title: "Customers come back",
    description:
      "People who can see what was done, and why, return. And they tell others.",
  },
];

export default function ProblemSection() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="section-pad bg-cream" id="how-it-works">
      <div className="max-w-6xl mx-auto px-6">
        <div data-reveal-group className="mb-14 md:mb-20">
          <p className="eyebrow mb-5" data-reveal>
            How it works
          </p>
          <h2
            className="text-ink max-w-3xl"
            style={{ fontSize: "clamp(1.9rem, 4vw, 2.9rem)" }}
            data-reveal
          >
            Every repair, <span className="text-rust">on the record</span>.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Slideshow image */}
          <div
            className="img-frame h-[340px] md:h-[480px] lg:h-[560px]"
            data-img-reveal
          >
            {slides.map((slide, i) => (
              <img
                key={slide.step}
                src={slide.url}
                alt={slide.alt}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-out ${
                  active === i ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </div>

          {/* Steps */}
          <div data-reveal-group>
            {slides.map((slide, i) => (
              <button
                key={slide.step}
                type="button"
                onClick={() => setActive(i)}
                aria-current={active === i}
                className={`block w-full text-left hairline-t py-6 transition-colors duration-300 ${
                  i === slides.length - 1 ? "hairline-b" : ""
                }`}
                data-reveal
              >
                <div className="flex items-baseline gap-6">
                  <span
                    className={`text-sm font-semibold transition-colors duration-300 ${
                      active === i ? "text-rust" : "text-taupe"
                    }`}
                  >
                    {slide.step}
                  </span>
                  <div className="flex-1">
                    <h3
                      className={`text-lg md:text-xl font-semibold transition-colors duration-300 ${
                        active === i ? "text-ink" : "text-taupe"
                      }`}
                    >
                      {slide.title}
                    </h3>
                    {active === i && (
                      <p className="text-ink/70 text-sm md:text-base mt-3 max-w-md">
                        {slide.description}
                      </p>
                    )}
                  </div>
                </div>
                {active === i && (
                  <div key={`bar-${active}`} className="step-progress mt-5" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
