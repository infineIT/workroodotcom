import React from "react";

const COPIES = 8;

export default function WordmarkMarquee() {
  return (
    <div className="marquee hairline-t hairline-b py-5 md:py-7" aria-hidden="true">
      <div className="marquee-track">
        {[0, 1].map((half) => (
          <div key={half} className="flex shrink-0 items-baseline">
            {Array.from({ length: COPIES }).map((_, i) => (
              <span
                key={i}
                className="font-display text-ink leading-none flex items-baseline"
                style={{ fontSize: "clamp(2.4rem, 6vw, 4.8rem)" }}
              >
                <span className="px-6 md:px-10">Workroo</span>
                <span className="font-display italic text-taupe text-[0.4em]">est. Melbourne</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
