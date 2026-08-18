"use client";

import { useEffect, useState } from "react";
import { MobileMenu } from "./MobileMenu";

const items = [
  { label: "About", id: "about" },
  { label: "Experience", id: "experience" },
  { label: "Path", id: "path" },
  { label: "Education", id: "education" },
  { label: "Projects", id: "projects" },
  { label: "Skills", id: "skills" },
  { label: "Contact", id: "contact" },
];

export function TopNav() {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const targets = items
      .map((it) => document.getElementById(it.id))
      .filter((el): el is HTMLElement => !!el);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );

    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  function openPalette() {
    window.dispatchEvent(new CustomEvent("open-command-palette"));
  }

  return (
    <nav
      className="fixed top-4 left-1/2 z-40 -translate-x-1/2"
      aria-label="Section navigation"
    >
      <div className="flex items-center gap-1 rounded-full border border-edge bg-ink/70 px-2 py-1 backdrop-blur-md">
        <a
          href="#top"
          className="rounded-full px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-paper transition hover:text-signal"
          aria-label="Home"
        >
          <span className="signal-dot mr-2" />
          RA
        </a>
        <span className="hidden h-4 w-px bg-edge md:inline-block" aria-hidden />
        {items.map((it) => {
          const isActive = active === it.id;
          return (
            <a
              key={it.id}
              href={`#${it.id}`}
              aria-current={isActive ? "location" : undefined}
              className={
                "hidden rounded-full px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] transition md:inline-block " +
                (isActive
                  ? "bg-signal/10 text-signal"
                  : "text-muted hover:text-paper")
              }
            >
              {it.label}
            </a>
          );
        })}
        <span className="hidden h-4 w-px bg-edge md:inline-block" aria-hidden />
        {/* Desktop: ⌘K palette hint. Mobile: full nav menu. */}
        <button
          type="button"
          onClick={openPalette}
          className="hidden items-center gap-1.5 rounded-full border border-edge px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted transition hover:border-signal/40 hover:text-signal md:flex"
          aria-label="Open command palette (Cmd/Ctrl + K)"
          title="Command palette (⌘K)"
        >
          <span aria-hidden>⌘</span>
          <span>K</span>
        </button>
        <MobileMenu items={items} />
      </div>
    </nav>
  );
}
