"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { contact } from "@/data/contact";

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

type Action = {
  id: string;
  label: string;
  hint: string;
  keywords: string;
  run: () => void;
  kind: "jump" | "external" | "action";
};

const SECTION_ITEMS: Array<{ id: string; label: string; hint: string }> = [
  { id: "top", label: "Home", hint: "Return to top" },
  { id: "about", label: "About", hint: "Who I am" },
  { id: "experience", label: "Experience", hint: "LinkedIn + earlier roles" },
  { id: "path", label: "The Path", hint: "Cities, timeline, journey" },
  { id: "education", label: "Education", hint: "ASU, publications, coursework" },
  { id: "projects", label: "Projects", hint: "Expenses, GymPal" },
  { id: "skills", label: "Skills", hint: "Languages, systems, tools" },
  { id: "contact", label: "Contact", hint: "Email, LinkedIn, GitHub" },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const actions = useMemo<Action[]>(() => {
    const scrollTo = (id: string) => () => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    const external = (href: string) => () => {
      window.open(href, "_blank", "noreferrer");
    };
    const copyEmail = () => async () => {
      try {
        await navigator.clipboard.writeText(contact.email);
      } catch {
        window.location.href = `mailto:${contact.email}`;
      }
    };
    const download = (href: string) => () => {
      const a = document.createElement("a");
      a.href = href;
      a.download = "";
      a.rel = "noreferrer";
      document.body.appendChild(a);
      a.click();
      a.remove();
    };

    return [
      ...SECTION_ITEMS.map((s) => ({
        id: `jump-${s.id}`,
        label: `Jump to ${s.label}`,
        hint: s.hint,
        keywords: `go section jump navigate ${s.label} ${s.hint}`,
        run: scrollTo(s.id),
        kind: "jump" as const,
      })),
      {
        id: "copy-email",
        label: "Copy email address",
        hint: contact.email,
        keywords: "copy email address mail message contact",
        run: copyEmail(),
        kind: "action" as const,
      },
      {
        id: "send-email",
        label: "Send email",
        hint: `mailto:${contact.email}`,
        keywords: "send email compose message contact",
        run: () => {
          window.location.href = `mailto:${contact.email}`;
        },
        kind: "action" as const,
      },
      {
        id: "download-resume",
        label: "Download resume",
        hint: "PDF",
        keywords: "resume cv download pdf",
        run: download(contact.resumeHref),
        kind: "action" as const,
      },
      ...contact.socials.map((s) => ({
        id: `open-${s.label.toLowerCase()}`,
        label: `Open ${s.label}`,
        hint: `/${s.handle}`,
        keywords: `open ${s.label.toLowerCase()} link social profile external`,
        run: external(s.href),
        kind: "external" as const,
      })),
    ];
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return actions;
    const tokens = q.split(/\s+/);
    return actions.filter((a) => {
      const hay = `${a.label} ${a.hint} ${a.keywords}`.toLowerCase();
      return tokens.every((t) => hay.includes(t));
    });
  }, [query, actions]);

  useEffect(() => {
    setActive(0);
  }, [query, open]);

  // External open event (used by the mobile menu button on TopNav)
  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("open-command-palette", onOpen);
    return () => window.removeEventListener("open-command-palette", onOpen);
  }, []);

  const dialogRef = useRef<HTMLDivElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  // Global keydown handler
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const isMod = e.metaKey || e.ctrlKey;
      if (isMod && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
        return;
      }
      if (!open) return;
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((i) => Math.min(results.length - 1, i + 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((i) => Math.max(0, i - 1));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const chosen = results[active];
        if (chosen) {
          chosen.run();
          setOpen(false);
          setQuery("");
        }
      } else if (e.key === "Tab" && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE);
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const activeEl = document.activeElement as HTMLElement | null;
        if (e.shiftKey && activeEl === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && activeEl === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, results, active]);

  // Focus input when opened; lock body scroll (save/restore prior value);
  // restore focus to the trigger on close.
  useEffect(() => {
    if (!open) return;
    returnFocusRef.current = document.activeElement as HTMLElement | null;
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const t = setTimeout(() => inputRef.current?.focus(), 0);
    return () => {
      clearTimeout(t);
      document.documentElement.style.overflow = prevOverflow;
      returnFocusRef.current?.focus?.();
    };
  }, [open]);

  // Keep active item in view
  useEffect(() => {
    if (!open || !listRef.current) return;
    const item = listRef.current.children[active] as HTMLElement | undefined;
    item?.scrollIntoView({ block: "nearest" });
  }, [active, open]);

  if (!open) return null;

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[12vh]"
    >
      <button
        type="button"
        aria-label="Close command palette"
        onClick={() => setOpen(false)}
        className="absolute inset-0 h-full w-full bg-ink/70 backdrop-blur-md"
      />
      <div className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-edge bg-surface shadow-[0_40px_80px_rgba(0,0,0,0.6)]">
        <div className="flex items-center gap-3 border-b border-edge px-4">
          <span className="signal-dot" aria-hidden />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Jump to a section, copy email, open GitHub…"
            className="w-full bg-transparent py-4 font-mono text-small text-paper outline-none placeholder:text-muted"
            aria-label="Command palette input"
          />
          <kbd className="hidden shrink-0 rounded-md border border-edge px-1.5 py-0.5 font-mono text-[0.6875rem] text-muted sm:inline-block">
            Esc
          </kbd>
        </div>
        {results.length === 0 ? (
          <p className="p-8 text-center font-mono text-small text-muted">
            No matches. Try &quot;projects&quot; or &quot;linkedin&quot;.
          </p>
        ) : (
          <ul
            ref={listRef}
            role="listbox"
            aria-label="Commands"
            className="max-h-[50vh] overflow-y-auto"
          >
            {results.map((a, i) => (
              <li
                key={a.id}
                role="option"
                aria-selected={i === active}
                onMouseEnter={() => setActive(i)}
                onClick={() => {
                  a.run();
                  setOpen(false);
                  setQuery("");
                }}
                className={
                  "group flex cursor-pointer items-center justify-between gap-4 border-b border-edge/60 px-4 py-3 last:border-b-0 " +
                  (i === active ? "bg-ink" : "hover:bg-ink/60")
                }
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span
                    aria-hidden
                    className={
                      "flex h-6 w-6 shrink-0 items-center justify-center rounded-md border font-mono text-[0.6875rem] " +
                      (i === active
                        ? "border-signal/50 bg-signal/10 text-signal"
                        : "border-edge text-muted")
                    }
                  >
                    {a.kind === "jump" ? "↳" : a.kind === "external" ? "↗" : "•"}
                  </span>
                  <span className="truncate">
                    <span className="text-paper">{a.label}</span>
                    <span className="ml-2 font-mono text-[0.75rem] text-muted">
                      {a.hint}
                    </span>
                  </span>
                </div>
                {i === active && (
                  <kbd className="shrink-0 rounded-md border border-signal/40 bg-signal/10 px-1.5 py-0.5 font-mono text-[0.6875rem] text-signal">
                    ↵
                  </kbd>
                )}
              </li>
            ))}
          </ul>
        )}
        <div className="flex items-center justify-between border-t border-edge px-4 py-2 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted">
          <span>
            <span className="text-paper/70">↑↓</span> navigate
            <span className="ml-3 text-paper/70">↵</span> run
          </span>
          <span>
            <span className="text-paper/70">⌘K</span> anytime
          </span>
        </div>
      </div>
    </div>
  );
}
