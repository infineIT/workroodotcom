import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

/**
 * In-view fade/slide. No-ops (renders a plain element) under reduced motion.
 *
 * Uses an IntersectionObserver via useInView for scroll-triggered reveals, plus
 * a short mount fallback so content is never left permanently hidden if the
 * observer can't fire (e.g. a backgrounded tab on first paint).
 */
export default function Reveal({
  as = "div",
  delay = 0,
  y = 24,
  className,
  children,
  ...props
}) {
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setFallback(true), 600);
    return () => clearTimeout(t);
  }, []);

  if (reduced) {
    const Tag = as;
    return (
      <Tag ref={ref} className={className} {...props}>
        {children}
      </Tag>
    );
  }

  const MotionTag = motion[as] || motion.div;
  const show = inView || fallback;

  return (
    <MotionTag
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      {...props}
    >
      {children}
    </MotionTag>
  );
}
