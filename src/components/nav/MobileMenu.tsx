"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

type Item = { label: string; id: string };

export function MobileMenu({ items }: { items: Item[] }) {
  const [open, setOpen] = useState(false);

  // Lock scroll when open
  useEffect(() => {
    if (!open) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, [open]);

  // Escape to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open navigation menu"
        aria-expanded={open}
        aria-controls="mobile-nav"
        className="flex h-11 w-11 items-center justify-center rounded-full border border-edge text-paper/85 transition hover:border-signal/40 hover:text-signal md:hidden"
      >
        <Menu size={16} strokeWidth={2} aria-hidden />
      </button>

      {open && (
        <div
          id="mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="fixed inset-0 z-50 md:hidden"
        >
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="absolute inset-0 h-full w-full bg-ink/70 backdrop-blur-md"
          />
          {/* Sheet */}
          <div className="relative mx-auto mt-16 max-w-md rounded-2xl border border-edge bg-surface shadow-[0_40px_80px_rgba(0,0,0,0.6)]">
            <div className="flex items-center justify-between border-b border-edge px-5 py-4">
              <p className="eyebrow">
                <span className="signal-dot mr-2" /> Navigation
              </p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close navigation menu"
                className="flex h-11 w-11 items-center justify-center rounded-full text-paper/70 transition hover:text-signal"
              >
                <X size={18} strokeWidth={2} aria-hidden />
              </button>
            </div>
            <ul className="p-2">
              {items.map((it, i) => (
                <li key={it.id}>
                  <a
                    href={`#${it.id}`}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between rounded-lg px-4 py-4 text-paper transition hover:bg-ink hover:text-signal focus-visible:bg-ink focus-visible:text-signal"
                  >
                    <span className="flex items-baseline gap-3">
                      <span className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted">
                        0{i + 1}
                      </span>
                      <span className="font-display text-[1.375rem] leading-none">
                        {it.label}
                      </span>
                    </span>
                    <span aria-hidden className="font-mono text-signal">→</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
