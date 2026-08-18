"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

type Screen = { src: string; alt: string };

type Props = {
  screens: Screen[];
  /** Aspect hint for the framed preview. Defaults to a modern iPhone ratio. */
  aspect?: string;
  /** ms between auto-advance ticks. */
  intervalMs?: number;
};

export function ScreenshotGallery({
  screens,
  aspect = "9 / 19.5",
  intervalMs = 3200,
}: Props) {
  const [index, setIndex] = useState(0);
  const [hoverPaused, setHoverPaused] = useState(false);
  const [focusPaused, setFocusPaused] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [isNarrow, setIsNarrow] = useState(false);
  const reduced = useReducedMotion();

  // Detect mobile viewport once mounted — no autoplay on small screens.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setIsNarrow(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const paused = hoverPaused || focusPaused || userPaused;

  useEffect(() => {
    if (paused || reduced || isNarrow || screens.length <= 1) return;
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % screens.length);
    }, intervalMs);
    return () => clearInterval(t);
  }, [paused, reduced, isNarrow, screens.length, intervalMs]);

  if (!screens.length) return null;
  const current = screens[index];
  const showsAutoplay = !reduced && !isNarrow && screens.length > 1;

  return (
    <div
      className="pointer-events-auto absolute inset-0 flex items-center justify-center p-6"
      onMouseEnter={() => setHoverPaused(true)}
      onMouseLeave={() => setHoverPaused(false)}
      onFocus={() => setFocusPaused(true)}
      onBlur={(e) => {
        // Only unpause when focus actually leaves the gallery
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          setFocusPaused(false);
        }
      }}
    >
      {/* Phone-bezel shell — no fake notch (real iOS chrome cropped out of source screenshots) */}
      <div
        className="relative h-full overflow-hidden rounded-[2rem] border border-edge bg-ink shadow-[0_25px_70px_rgba(0,0,0,0.6),0_0_0_1px_rgba(245,241,232,0.03)_inset]"
        style={{ aspectRatio: aspect }}
      >
        {/* Screen */}
        <div className="absolute inset-0.5 overflow-hidden rounded-[1.85rem] bg-ink">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.src}
              initial={reduced ? undefined : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduced ? undefined : { opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={current.src}
                alt={current.alt}
                fill
                sizes="(max-width: 768px) 60vw, 260px"
                className="object-cover"
                priority={index === 0}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Dot indicators — invisible 44×44 hit areas around the visible pill */}
      {screens.length > 1 && (
        <div
          role="tablist"
          aria-label="Project screenshots"
          className="absolute inset-x-0 bottom-1 flex justify-center gap-0.5"
        >
          {screens.map((s, i) => {
            const isActive = i === index;
            return (
              <button
                key={s.src}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-current={isActive ? "true" : undefined}
                onClick={(e) => {
                  e.stopPropagation();
                  setIndex(i);
                  setUserPaused(true);
                }}
                aria-label={`Show screen ${i + 1} of ${screens.length}: ${s.alt}`}
                className="group inline-flex h-11 w-11 items-center justify-center"
              >
                <span
                  aria-hidden
                  className={
                    "block h-1.5 rounded-full transition-all duration-300 " +
                    (isActive
                      ? "w-6 bg-signal"
                      : "w-1.5 bg-paper/25 group-hover:bg-paper/50 group-focus-visible:bg-paper/70")
                  }
                />
              </button>
            );
          })}
        </div>
      )}
      {/* Visible pause/play control for the auto-advancing carousel */}
      {showsAutoplay && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setUserPaused((v) => !v);
          }}
          aria-label={userPaused ? "Resume screenshot slideshow" : "Pause screenshot slideshow"}
          className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full border border-edge bg-ink/70 font-mono text-[0.6875rem] text-paper/80 backdrop-blur transition hover:border-signal/40 hover:text-signal focus-visible:border-signal focus-visible:text-signal"
        >
          <span aria-hidden>{userPaused ? "▶" : "❚❚"}</span>
        </button>
      )}
    </div>
  );
}
