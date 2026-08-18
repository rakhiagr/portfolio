"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  Code2,
  Database,
  Cloud,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import dynamic from "next/dynamic";
import { skills } from "@/data/projects";
import { Reveal } from "@/components/util/Reveal";
import { hasTechIcon } from "@/components/util/tech-icons-map";

const TechIcon = dynamic(
  () => import("@/components/util/TechIcon").then((m) => m.TechIcon),
  { ssr: false, loading: () => null },
);

type Panel = {
  label: string;
  unit: string;
  items: string[];
  accent?: boolean;
  icon: LucideIcon;
};

const panels: Panel[] = [
  { label: "Languages", unit: "lang", items: skills.languages, icon: Code2 },
  {
    label: "Backend & Data Infra",
    unit: "stack",
    items: skills.backend,
    accent: true,
    icon: Database,
  },
  { label: "Cloud & Tooling", unit: "svc", items: skills.cloud, icon: Cloud },
  { label: "AI-native workflow", unit: "tool", items: skills.ai, icon: Sparkles },
];

export function Skills() {
  return (
    <section id="skills" className="relative border-t border-edge bg-ink py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-3">
            <Reveal as="p" className="eyebrow">06 · Skills</Reveal>
            <Reveal
              as="h2"
              delay={0.05}
              className="mt-4 font-display text-h2 font-normal text-paper"
            >
              The stack.
            </Reveal>
            <Reveal as="p" delay={0.1} className="mt-4 text-small text-paper/70">
              Languages, systems, and tools I reach for.
            </Reveal>
          </div>

          <div className="md:col-span-9">
            <div className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-edge bg-edge md:grid-cols-2">
              {panels.map((p) => (
                <SkillPanel key={p.label} panel={p} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillPanel({ panel }: { panel: Panel }) {
  const reduced = useReducedMotion();
  const Icon = panel.icon;

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduced ? 0 : 0.028,
        delayChildren: reduced ? 0 : 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.32, 0.72, 0, 1] },
    },
  };

  return (
    <div className="group flex flex-col gap-4 bg-surface p-6 transition-colors duration-300 hover:bg-ink">
      <header className="flex items-center gap-2.5 border-b border-edge pb-3">
        <span
          className={
            "flex h-7 w-7 items-center justify-center rounded-md border transition-colors duration-300 " +
            (panel.accent
              ? "border-signal/40 bg-signal/10 text-signal"
              : "border-edge bg-ink/50 text-paper/80 group-hover:border-signal/25 group-hover:text-signal")
          }
        >
          <Icon size={14} strokeWidth={1.75} />
        </span>
        <p className="eyebrow">{panel.label}</p>
      </header>
      <motion.ul
        className="flex flex-wrap gap-1.5"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        {panel.items.map((it) => {
          const hasIcon = hasTechIcon(it);
          return (
            <motion.li
              key={it}
              variants={itemVariants}
              className={
                "group flex items-center rounded-md border px-2.5 py-1 font-mono text-[0.75rem] transition-colors duration-200 " +
                (panel.accent
                  ? "border-signal/30 bg-signal/5 text-paper hover:border-signal/70"
                  : "border-edge bg-ink/40 text-paper/85 hover:border-signal/50 hover:text-paper")
              }
            >
              {hasIcon && (
                <span
                  aria-hidden
                  className="flex max-w-0 shrink-0 items-center overflow-hidden text-paper/50 opacity-0 transition-all duration-300 group-hover:mr-1.5 group-hover:max-w-[16px] group-hover:text-signal group-hover:opacity-100"
                >
                  <TechIcon label={it} size={11} />
                </span>
              )}
              <span>{it}</span>
            </motion.li>
          );
        })}
      </motion.ul>
    </div>
  );
}
