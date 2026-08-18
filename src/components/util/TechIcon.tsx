"use client";

import { useEffect, useState } from "react";
import { LABEL_TO_KEY } from "./tech-icons-map";

type Icon = { title: string; path: string };
type IconMap = Record<string, Icon>;

// Module-level cache — the 50KB path data loads once per page and is reused.
let cache: IconMap | null = null;
let loadPromise: Promise<IconMap> | null = null;

function loadIcons(): Promise<IconMap> {
  if (cache) return Promise.resolve(cache);
  if (loadPromise) return loadPromise;
  loadPromise = import("./tech-icons-data").then((m) => {
    cache = m.ICONS as IconMap;
    return cache;
  });
  return loadPromise;
}

export { hasTechIcon } from "./tech-icons-map";

export function TechIcon({
  label,
  size = 11,
  className,
}: {
  label: string;
  size?: number;
  className?: string;
}) {
  const [icons, setIcons] = useState<IconMap | null>(cache);
  useEffect(() => {
    if (!icons) loadIcons().then(setIcons);
  }, [icons]);
  const key = LABEL_TO_KEY[label];
  const icon = key && icons ? icons[key] : undefined;
  if (!icon) return null;
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-label={icon.title}
      className={className}
    >
      <path d={icon.path} />
    </svg>
  );
}
