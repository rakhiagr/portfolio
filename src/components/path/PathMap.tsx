"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Sphere,
} from "react-simple-maps";
import { geoEqualEarth, geoDistance } from "d3-geo";
import { useReducedMotion } from "framer-motion";
import landMap from "world-atlas/land-110m.json";
import { stops, type PathStop } from "@/data/path";

const REVEAL_INTERVAL_MS = 950;
const W = 900;
const H = 440;
const SCALE = 155;
const CENTER: [number, number] = [15, 25];

// Same projection setup ComposableMap uses internally — used to plot arcs +
// packet in the exact same coordinate space as the Marker/Geography children.
const projection = geoEqualEarth()
  .scale(SCALE)
  .center(CENTER)
  .translate([W / 2, H / 2]);

function projectXY(lng: number, lat: number): [number, number] {
  const p = projection([lng, lat]);
  return p ?? [0, 0];
}

/** Quadratic bezier arc between two projected points, bending toward the north. */
function arcPath([x1, y1]: [number, number], [x2, y2]: [number, number]) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const dist = Math.sqrt(dx * dx + dy * dy);
  const nx = -dy / (dist || 1);
  const ny = dx / (dist || 1);
  const bend = Math.min(90, dist * 0.22);
  // Bias control point slightly upward for a flight-path feel
  const cx = mx + nx * bend * (ny < 0 ? 1 : -1);
  const cy = my + ny * bend * (ny < 0 ? 1 : -1) - Math.abs(dist) * 0.08;
  return `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;
}

// Precompute stat: total great-circle km along consecutive stops.
const EARTH_R_KM = 6371;
const TOTAL_KM = stops.reduce((sum, s, i) => {
  if (i === 0) return 0;
  const prev = stops[i - 1];
  const d = geoDistance([prev.lng, prev.lat], [s.lng, s.lat]) * EARTH_R_KM;
  return sum + d;
}, 0);

export const PATH_STATS = {
  countries: new Set(stops.map((s) => s.countryCode)).size,
  cities: stops.length,
  years: 11,
  km: Math.round(TOTAL_KM),
} as const;

type Props = {
  activeIndex: number;
  onActiveChange: (index: number) => void;
};

export function PathMap({ activeIndex, onActiveChange }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<PathStop | null>(null);
  const [autoplayed, setAutoplayed] = useState(false);
  const [started, setStarted] = useState(false);
  const reducedMotion = useReducedMotion();

  const N = stops.length;

  // Reduced motion: jump straight to the final state and never autoplay.
  useEffect(() => {
    if (!reducedMotion) return;
    if (activeIndex !== N - 1) onActiveChange(N - 1);
    setAutoplayed(true);
  }, [reducedMotion, activeIndex, N, onActiveChange]);

  // Kick off the animation once the map enters the viewport (non-reduced only).
  useEffect(() => {
    if (reducedMotion || !rootRef.current || autoplayed) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !started) {
            setStarted(true);
            io.disconnect();
          }
        }
      },
      { threshold: 0.3 },
    );
    io.observe(rootRef.current);
    return () => io.disconnect();
  }, [started, autoplayed, reducedMotion]);

  useEffect(() => {
    if (reducedMotion || !started || autoplayed) return;
    if (activeIndex >= N - 1) {
      setAutoplayed(true);
      return;
    }
    const t = setTimeout(
      () => onActiveChange(Math.min(N - 1, activeIndex + 1)),
      REVEAL_INTERVAL_MS,
    );
    return () => clearTimeout(t);
  }, [started, autoplayed, activeIndex, onActiveChange, N, reducedMotion]);

  // Project stop coordinates once for arc/label math.
  const projected = useMemo(
    () => stops.map((s) => ({ ...s, xy: projectXY(s.lng, s.lat) })),
    [],
  );

  return (
    <div ref={rootRef} className="relative w-full">
      <ComposableMap
        projectionConfig={{ scale: SCALE, center: CENTER }}
        projection="geoEqualEarth"
        width={W}
        height={H}
        style={{ width: "100%", height: "auto" }}
      >
        <Sphere id="ocean" fill="transparent" stroke="var(--edge)" strokeWidth={0.4} />

        {/* Land outlines — no country borders */}
        <Geographies geography={landMap}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                style={{
                  default: {
                    fill: "rgba(245, 241, 232, 0.06)",
                    stroke: "rgba(245, 241, 232, 0.22)",
                    strokeWidth: 0.45,
                    outline: "none",
                  },
                  hover: {
                    fill: "rgba(245, 241, 232, 0.06)",
                    stroke: "rgba(245, 241, 232, 0.22)",
                    outline: "none",
                  },
                  pressed: {
                    fill: "rgba(245, 241, 232, 0.06)",
                    outline: "none",
                  },
                }}
              />
            ))
          }
        </Geographies>

        {/* Arcs — custom SVG so we can attach a moving packet to each one */}
        {projected.slice(0, -1).map((a, i) => {
          const b = projected[i + 1];
          const d = arcPath(a.xy, b.xy);
          const revealed = i < activeIndex;
          const drawing = i === activeIndex - 1;
          return (
            <g key={`arc-${i}`}>
              <path
                id={`arc-path-${i}`}
                d={d}
                fill="none"
                stroke="var(--signal)"
                strokeWidth={1.3}
                strokeLinecap="round"
                pathLength={1}
                strokeDasharray={1}
                strokeDashoffset={revealed ? 0 : 1}
                opacity={revealed ? 0.85 : 0}
                style={{
                  transition:
                    "stroke-dashoffset 900ms cubic-bezier(0.32,0.72,0,1), opacity 300ms ease",
                }}
              />
              {/* Traveling packet — only mounts while this arc is drawing.
                  key on activeIndex forces remount → fresh animation. */}
              {drawing && (
                <g key={`packet-${activeIndex}`}>
                  <circle r={5.5} fill="var(--signal)" opacity={0.28}>
                    <animateMotion
                      dur="900ms"
                      fill="freeze"
                      calcMode="spline"
                      keySplines="0.32 0.72 0 1"
                      keyTimes="0;1"
                    >
                      <mpath href={`#arc-path-${i}`} />
                    </animateMotion>
                  </circle>
                  <circle r={2.6} fill="var(--signal)">
                    <animateMotion
                      dur="900ms"
                      fill="freeze"
                      calcMode="spline"
                      keySplines="0.32 0.72 0 1"
                      keyTimes="0;1"
                    >
                      <mpath href={`#arc-path-${i}`} />
                    </animateMotion>
                  </circle>
                </g>
              )}
            </g>
          );
        })}

        {/* Pins */}
        {stops.map((s, i) => {
          const isRevealed = i <= activeIndex;
          const isActive = i === activeIndex;
          const isCurrent = i === N - 1 && activeIndex === N - 1;
          const isPast = isRevealed && !isActive && !isCurrent;

          // Pin size hierarchy: current > active > past
          const radius = isCurrent ? 4.2 : isActive ? 3.6 : isPast ? 2.5 : 2.5;
          const dotOpacity = isPast ? 0.6 : 1;

          return (
            <Marker
              key={s.id}
              coordinates={[s.lng, s.lat]}
              onMouseEnter={() => setHovered(s)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => onActiveChange(i)}
              style={{ default: { cursor: "pointer" } }}
            >
              <g
                style={{
                  opacity: isRevealed ? 1 : 0,
                  transform: `scale(${isRevealed ? 1 : 0.2})`,
                  transformOrigin: "center",
                  transition:
                    "opacity 500ms ease, transform 500ms cubic-bezier(0.32,0.72,0,1)",
                }}
              >
                {/* Ambient glow — brighter for current, subtle for active */}
                <circle
                  r={isCurrent ? 18 : 14}
                  fill="var(--signal)"
                  opacity={isCurrent ? 0.24 : isActive ? 0.16 : 0}
                >
                  {isCurrent && !reducedMotion && (
                    <animate
                      attributeName="r"
                      values="14;26;14"
                      dur="3s"
                      repeatCount="indefinite"
                    />
                  )}
                </circle>
                {/* Ring around active pin */}
                {isActive && !isCurrent && (
                  <circle
                    r={7}
                    fill="none"
                    stroke="var(--signal)"
                    strokeWidth={0.9}
                    opacity={0.6}
                  />
                )}
                <circle
                  r={radius}
                  fill={isActive || isCurrent ? "var(--signal)" : "var(--paper)"}
                  stroke="var(--ink)"
                  strokeWidth={1}
                  opacity={dotOpacity}
                />
                {/* Numeric tag above pin */}
                <text
                  y={isCurrent ? -12 : -10}
                  textAnchor="middle"
                  fontSize={7}
                  fill={isActive || isCurrent ? "var(--signal)" : "var(--muted)"}
                  style={{ fontFamily: "var(--font-mono), monospace" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </text>
                {/* City label on active/current pin only */}
                {(isActive || isCurrent) && (
                  <text
                    y={isCurrent ? 16 : 14}
                    textAnchor="middle"
                    fontSize={8.5}
                    fontWeight={500}
                    letterSpacing={0.5}
                    fill="var(--paper)"
                    style={{
                      fontFamily: "var(--font-mono), monospace",
                      textTransform: "uppercase",
                      paintOrder: "stroke",
                      stroke: "var(--ink)",
                      strokeWidth: 3,
                      strokeLinejoin: "round",
                    }}
                  >
                    {s.city}
                  </text>
                )}
              </g>
            </Marker>
          );
        })}
      </ComposableMap>

      {/* Replay button */}
      {autoplayed && (
        <button
          type="button"
          onClick={() => {
            setAutoplayed(false);
            onActiveChange(0);
          }}
          className="absolute bottom-2 right-2 flex items-center gap-1.5 rounded-full border border-edge bg-ink/70 px-2.5 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted backdrop-blur transition hover:border-signal/40 hover:text-signal"
          aria-label="Replay journey animation"
        >
          <span aria-hidden>↻</span>
          Replay
        </button>
      )}

      {hovered && <HoverCallout stop={hovered} />}
    </div>
  );
}

function HoverCallout({ stop }: { stop: PathStop }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center">
      <div className="min-w-[220px] rounded-lg border border-edge bg-ink/95 px-3 py-2 text-center shadow-2xl backdrop-blur">
        <p className="font-mono text-[0.6875rem] uppercase tracking-widest text-muted">
          {stop.region} · {stop.country}
        </p>
        <p className="mt-1 font-display text-[1.125rem] leading-tight text-paper">
          {stop.city}
        </p>
        <p className="mt-1 text-small text-paper/85">{stop.context}</p>
      </div>
    </div>
  );
}
