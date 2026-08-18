import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — packet lost",
  description: "The requested route doesn't exist on this system.",
};

export default function NotFound() {
  return (
    <main className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-ink px-6">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 45%, rgba(232,160,56,0.10), transparent 70%)",
        }}
      />
      <div className="relative z-10 max-w-2xl text-center">
        <p className="eyebrow mb-8">
          <span className="signal-dot mr-2" />
          Status 404 · packet lost
        </p>
        <h1 className="font-display text-display-xl leading-[0.95] tracking-tight text-paper">
          404.
        </h1>
        <p className="mt-8 font-mono text-small text-muted">
          $ trace-route <span className="text-paper">/</span><span className="text-signal">?</span>
        </p>
        <p className="mx-auto mt-3 max-w-md font-mono text-small text-paper/80">
          <span className="text-signal">✗</span> destination not found in the mesh.
        </p>
        <p className="mt-10">
          <Link
            href="/"
            className="link-underline font-mono text-small uppercase tracking-[0.14em]"
          >
            ← Return to origin
          </Link>
        </p>
      </div>
    </main>
  );
}
