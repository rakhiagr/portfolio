// Global scroll progress ref. Updated on scroll (rAF-throttled),
// read by the WebGL scene in useFrame without triggering React re-renders.

export type ScrollProgress = {
  overall: number; // 0..1 for whole document
  y: number; // current scrollY in px
  vh: number; // viewport height
  docH: number; // document scrollable height
  reducedMotion: boolean;
};

export const scrollProgress: ScrollProgress = {
  overall: 0,
  y: 0,
  vh: typeof window !== "undefined" ? window.innerHeight : 0,
  docH: typeof document !== "undefined" ? document.documentElement.scrollHeight : 0,
  reducedMotion: false,
};

let installed = false;

export function installScrollProgress() {
  if (installed || typeof window === "undefined") return;
  installed = true;

  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  scrollProgress.reducedMotion = media.matches;
  media.addEventListener("change", (e) => {
    scrollProgress.reducedMotion = e.matches;
  });

  let raf = 0;
  const measure = () => {
    scrollProgress.vh = window.innerHeight;
    scrollProgress.docH = document.documentElement.scrollHeight;
  };
  const update = () => {
    raf = 0;
    const y = window.scrollY;
    scrollProgress.y = y;
    const range = Math.max(1, scrollProgress.docH - scrollProgress.vh);
    scrollProgress.overall = Math.max(0, Math.min(1, y / range));
  };
  const schedule = () => {
    if (raf) return;
    raf = requestAnimationFrame(update);
  };

  measure();
  update();
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", () => {
    measure();
    update();
  });
  // ResizeObserver catches content changes (e.g. font loads changing height)
  if ("ResizeObserver" in window) {
    const ro = new ResizeObserver(() => {
      measure();
      update();
    });
    ro.observe(document.documentElement);
  }
}

/**
 * Utility: given a 0..1 overall progress and a [start,end] beat window,
 * return 0..1 progress within that beat, clamped.
 */
export function beat(p: number, start: number, end: number) {
  if (end <= start) return p >= end ? 1 : 0;
  return Math.max(0, Math.min(1, (p - start) / (end - start)));
}

/**
 * Smoothstep easing (Ken Perlin) — smooth 0..1 curve.
 */
export function smoothstep(t: number) {
  const x = Math.max(0, Math.min(1, t));
  return x * x * (3 - 2 * x);
}

/**
 * Mix two numbers by t in [0,1].
 */
export function mix(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
