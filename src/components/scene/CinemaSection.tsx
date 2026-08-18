"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  id: string;
  height?: string;
  children?: ReactNode;
  eyebrow?: string;
  title?: string;
};

/**
 * A tall, transparent section that lets the persistent StoryCanvas show through.
 * Optionally overlays a small piece of copy anchored center-bottom.
 */
export function CinemaSection({
  id,
  height = "min-h-[110vh]",
  children,
  eyebrow,
  title,
}: Props) {
  const reduced = useReducedMotion();
  return (
    <section
      id={id}
      className={`relative w-full ${height}`}
      aria-hidden={!eyebrow && !title && !children}
    >
      {(eyebrow || title || children) && (
        <div className="pointer-events-none sticky top-1/2 -translate-y-1/2 px-6">
          <div className="mx-auto max-w-6xl text-center">
            {eyebrow && (
              <motion.p
                initial={reduced ? undefined : { opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                className="eyebrow"
              >
                {eyebrow}
              </motion.p>
            )}
            {title && (
              <motion.h2
                initial={reduced ? undefined : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1], delay: 0.08 }}
                className="mt-6 font-display text-display-l leading-[1.05] tracking-tight text-paper"
              >
                {title}
              </motion.h2>
            )}
            {children}
          </div>
        </div>
      )}
    </section>
  );
}
