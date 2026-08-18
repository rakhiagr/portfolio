"use client";

import { useEffect, useState, type RefObject } from "react";

/**
 * Returns a 0..1 value for how far a target element has scrolled through the
 * viewport. Progress ramps from 0 (top of element roughly hitting 80% of the
 * viewport height) to 1 (bottom of element roughly at 20% of viewport height).
 *
 * Intended for scroll-driven reveals of moderate-height sections.
 */
export function useScrollProgress(ref: RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const compute = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // Start: top of element crosses 80% of viewport (element entering)
      // End: bottom of element crosses 20% of viewport (element leaving)
      const startY = vh * 0.8;
      const endY = -rect.height + vh * 0.2;
      const total = Math.max(1, startY - endY);
      const now = startY - rect.top;
      const p = Math.max(0, Math.min(1, now / total));
      setProgress(p);
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(compute);
    };
    compute();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", compute);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", compute);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref]);

  return progress;
}
