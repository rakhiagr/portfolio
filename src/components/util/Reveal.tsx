"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type AsTag = "div" | "span" | "p" | "h2" | "h3" | "section" | "li" | "header";

type Props = {
  children: ReactNode;
  delay?: number;
  as?: AsTag;
  className?: string;
  /** Distance in pixels to rise from (default 12) */
  rise?: number;
  /** When true, animate every time it enters view; default false = once */
  amount?: number;
};

// Explicit lookup avoids dynamic `motion[Tag]` access — which in some
// framer-motion v12 code-paths triggers React warnings.
const motionByTag = {
  div: motion.div,
  span: motion.span,
  p: motion.p,
  h2: motion.h2,
  h3: motion.h3,
  section: motion.section,
  li: motion.li,
  header: motion.header,
} as const;

export function Reveal({
  children,
  delay = 0,
  as = "div",
  className,
  rise = 12,
  amount = 0.35,
}: Props) {
  const reduced = useReducedMotion();

  const variants: Variants = {
    hidden: reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: rise },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        delay,
        ease: [0.32, 0.72, 0, 1],
      },
    },
  };

  const MotionTag = motionByTag[as];

  return (
    <MotionTag
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={variants}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
