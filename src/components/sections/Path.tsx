"use client";

import { useCallback, useState } from "react";
import { stops } from "@/data/path";
import { Reveal } from "@/components/util/Reveal";
import { PathMap, PATH_STATS } from "@/components/path/PathMap";

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function formatRange(start?: string, end?: string | "Present") {
  if (!start) return "Origin";
  const [sy, sm] = start.split("-");
  if (!end) return sy;
  if (end === "Present") return `${sy} — Present`;
  const [ey, em] = end.split("-");
  if (sy === ey) {
    if (sm && em) return `${MONTHS[+sm - 1]}–${MONTHS[+em - 1]} ${sy}`;
    return sy;
  }
  // Compact for cards: 2015–19 (two-digit year)
  const shortEy = ey.slice(-2);
  return `${sy}–${shortEy}`;
}

export function Path() {
  // Two-tier state: `restingIndex` is where the map SITS when nothing is being
  // previewed (updated by autoplay + clicks); `hoveredIndex` is a transient
  // preview from cursor position on the legend. The effective display index is
  // hover (if any) or resting. This way, moving off the legend restores the
  // map to whatever the actual state was.
  const [restingIndex, setRestingIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const activeIndex = hoveredIndex ?? restingIndex;
  const handleActive = useCallback((i: number) => setRestingIndex(i), []);
  const active = stops[activeIndex];

  return (
    <section id="path" className="relative border-t border-edge bg-ink py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-3">
            <Reveal as="p" className="eyebrow">03 · The path</Reveal>
            <Reveal
              as="h2"
              delay={0.05}
              className="mt-4 font-display text-h2 font-normal text-paper"
            >
              Seven cities.
              <br />
              One path.
            </Reveal>
            <Reveal as="p" delay={0.1} className="mt-4 text-small text-paper/70">
              From Patna to Toronto, each place shaped what I studied, what I
              built, and where I thought I could go next.
            </Reveal>
          </div>

          <div className="md:col-span-9 space-y-6">
            <Reveal delay={0.1}>
              <div className="overflow-hidden rounded-xl border border-edge bg-surface p-6 md:p-8">
                <PathMap
                  activeIndex={activeIndex}
                  onActiveChange={handleActive}
                />

                {/* Aggregate stat line */}
                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-edge pt-4 font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-muted">
                  <span className="flex items-center gap-2 text-paper/80">
                    <span className="signal-dot" aria-hidden />
                    {PATH_STATS.countries} countries
                  </span>
                  <span aria-hidden className="text-edge">·</span>
                  <span>{PATH_STATS.cities} cities</span>
                  <span aria-hidden className="text-edge">·</span>
                  <span>{PATH_STATS.years} years</span>
                  <span aria-hidden className="text-edge">·</span>
                  <span>~{Math.round(PATH_STATS.km / 1000)}K km</span>
                </div>

                {/* Live active-city caption */}
                <div className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <p className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-signal">
                    {String(activeIndex + 1).padStart(2, "0")} ·{" "}
                    {formatRangeFull(active?.start, active?.end)}
                  </p>
                  <p className="font-display text-[1.25rem] leading-tight text-paper">
                    {active?.city}
                  </p>
                  <p className="text-small text-paper/75">— {active?.context}</p>
                </div>

                {/* Compact horizontal legend / controls */}
                <ol
                  className="mt-5 grid grid-cols-4 gap-x-4 gap-y-3 sm:grid-cols-7"
                  role="tablist"
                  aria-label="Cities in Rakhi's journey"
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {stops.map((s, i) => {
                    const isActive = i === activeIndex;
                    return (
                      <li key={s.id}>
                        <button
                          type="button"
                          role="tab"
                          aria-selected={isActive}
                          onMouseEnter={() => setHoveredIndex(i)}
                          onFocus={() => setHoveredIndex(i)}
                          onBlur={() => setHoveredIndex(null)}
                          onClick={() => {
                            setRestingIndex(i);
                            setHoveredIndex(null);
                          }}
                          className={
                            "group flex w-full flex-col items-start gap-0.5 border-t pt-2 text-left transition-colors duration-300 " +
                            (isActive
                              ? "border-signal"
                              : "border-edge hover:border-paper/40")
                          }
                        >
                          <span
                            className={
                              "font-mono text-[0.625rem] uppercase tracking-[0.14em] transition-colors " +
                              (isActive ? "text-signal" : "text-muted")
                            }
                          >
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span
                            className={
                              "text-[0.9375rem] leading-tight transition-colors " +
                              (isActive ? "text-paper" : "text-paper/75")
                            }
                          >
                            {s.city}
                          </span>
                          <span className="font-mono text-[0.625rem] uppercase tracking-widest text-muted">
                            {formatRange(s.start, s.end)}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </Reveal>

          </div>
        </div>
      </div>
    </section>
  );
}

// Full-word format for the caption above the strip (uses "—" and "Present")
function formatRangeFull(start?: string, end?: string | "Present") {
  if (!start) return "Origin";
  const [sy, sm] = start.split("-");
  if (!end) return sy;
  if (end === "Present") return `${sy} — Present`;
  const [ey, em] = end.split("-");
  if (sy === ey) {
    if (sm && em) return `${MONTHS[+sm - 1]}–${MONTHS[+em - 1]} ${sy}`;
    return sy;
  }
  return `${sy} — ${ey}`;
}
