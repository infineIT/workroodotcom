import { useLayoutEffect, useRef } from "react";

export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Wires GSAP-driven motion for a page via data attributes:
 *  - [data-hero-letters]  hero wordmark; children .hero-letter rise letter by letter
 *  - [data-hero-rise]     remaining hero elements, staggered after the wordmark
 *  - [data-reveal-group]  container; children [data-reveal] rise + fade on scroll
 *  - [data-img-reveal]    frame whose <img> scales 1.08 -> 1 on scroll
 *  - [data-parallax]      frame whose <img> drifts ±6% with scroll (scrubbed)
 *
 * Content stays fully visible without JS: all tweens are `from` tweens, so if
 * GSAP is missing (or reduced motion is on) nothing is hidden.
 */
export function initPageMotion(root) {
  const gsap = typeof window !== "undefined" ? window.gsap : null;
  if (!root || !gsap || prefersReducedMotion()) return () => {};

  const ScrollTrigger = window.ScrollTrigger;
  if (ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

  const ctx = gsap.context(() => {
    // Hero intro: wordmark letters, then the rest of the hero
    const letters = root.querySelectorAll("[data-hero-letters] .hero-letter");
    const heroRest = root.querySelectorAll("[data-hero-rise]");
    if (letters.length || heroRest.length) {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      if (letters.length) {
        tl.from(letters, {
          yPercent: 112,
          duration: 1.1,
          stagger: 0.055,
        });
      }
      if (heroRest.length) {
        tl.from(
          heroRest,
          { y: 30, opacity: 0, duration: 1, stagger: 0.12 },
          letters.length ? "-=0.55" : 0
        );
      }
    }

    if (!ScrollTrigger) return;

    // Text reveals below the fold
    root.querySelectorAll("[data-reveal-group]").forEach((group) => {
      const items = group.querySelectorAll("[data-reveal]");
      if (!items.length) return;
      gsap.from(items, {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: group, start: "top 86%", once: true },
      });
    });

    // Image reveals: scale down inside overflow-hidden frames
    root.querySelectorAll("[data-img-reveal]").forEach((frame) => {
      const img = frame.querySelector("img");
      if (!img) return;
      gsap.from(img, {
        scale: 1.08,
        duration: 1.3,
        ease: "power3.out",
        scrollTrigger: { trigger: frame, start: "top 88%", once: true },
      });
    });

    // Gentle scrubbed parallax; frames size their image at 118%
    root.querySelectorAll("[data-parallax]").forEach((frame) => {
      const img = frame.querySelector("img");
      if (!img) return;
      gsap.fromTo(
        img,
        { yPercent: -6 },
        {
          yPercent: 6,
          ease: "none",
          scrollTrigger: {
            trigger: frame,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    });
  }, root);

  return () => ctx.revert();
}

/** Attach the returned ref to a page wrapper; re-runs when deps change. */
export function usePageMotion(deps = []) {
  const ref = useRef(null);
  useLayoutEffect(() => {
    return initPageMotion(ref.current);
  }, deps);
  return ref;
}
