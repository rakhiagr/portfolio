import Image from "next/image";
import { Reveal } from "@/components/util/Reveal";
import { contact } from "@/data/contact";

export function About() {
  return (
    <section id="about" className="relative border-t border-edge bg-ink py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-3">
            <Reveal as="p" className="eyebrow">01 · About</Reveal>
            <Reveal delay={0.05} className="mt-8">
              <Portrait />
            </Reveal>
          </div>
          <div className="md:col-span-9">
            <Reveal
              as="p"
              delay={0.05}
              className="font-display text-display-l leading-[1.05] tracking-tight text-paper"
            >
              I build the systems that other systems depend on.
            </Reveal>
            <div className="mt-10 space-y-6 text-body text-paper/80">
              <Reveal as="p" delay={0.1}>
                I spent nearly four years working on LinkedIn&apos;s data infrastructure —
                the systems that keep track of{" "}
                <em className="not-italic text-signal">data, ownership, access, and lifecycle</em>
                {" "}across the company. When it&apos;s fast and correct, nobody notices.
                That&apos;s the point.
              </Reveal>
              <Reveal as="p" delay={0.15}>
                Off the clock, I build things I want to use. I built a finance app to
                track expenses, set savings goals, and manage money across currencies —
                without paying another subscription. Then I built a workout tracker for
                the same reason: I wanted something that worked the way I wanted it to.
                The pattern is simple: <span className="text-paper">if I want something,
                I&apos;ll probably try to build it</span>.
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Portrait() {
  const size = 200;
  if (contact.photoHref) {
    // Warm-duotone treatment: shifts cool blues toward the ochre/paper palette
    // without cartoonifying. Sepia gives warmth; hue-rotate nudges toward gold;
    // saturate rebuilds a little life; contrast/brightness taste-adjust.
    const warmFilter =
      "sepia(0.35) saturate(1.15) hue-rotate(-8deg) contrast(1.06) brightness(0.98)";
    const filter = contact.photo?.warmDuotone ? warmFilter : undefined;
    const focusY = contact.photo?.focusY ?? 30;
    return (
      <div
        className="relative overflow-hidden rounded-full border border-edge bg-surface shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
        style={{ width: size, height: size }}
      >
        <Image
          src={contact.photoHref}
          alt={`Portrait of ${contact.name}`}
          width={size}
          height={size}
          className="h-full w-full object-cover"
          style={{
            objectPosition: `50% ${focusY}%`,
            filter,
          }}
          priority
        />
        {/* Signal-color rim light overlay — extremely subtle */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full"
          style={{
            boxShadow: "inset 0 0 0 1px rgba(232,160,56,0.12)",
            background:
              "radial-gradient(80% 80% at 30% 20%, rgba(232,160,56,0.06), transparent 65%)",
          }}
        />
      </div>
    );
  }
  return (
    <div
      className="relative flex items-center justify-center overflow-hidden rounded-full border border-edge bg-surface"
      style={{ width: size, height: size }}
      aria-label={`Portrait placeholder for ${contact.name}`}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 60% at 30% 30%, rgba(232,160,56,0.18), transparent 70%)",
        }}
      />
      <span className="font-display text-[4rem] leading-none text-paper/95">
        {contact.initials}
      </span>
      <span
        aria-hidden
        className="absolute right-3 top-3 signal-dot"
        style={{ opacity: 0.85 }}
      />
    </div>
  );
}
