"use client";

import { useState, type ComponentType } from "react";
import { Mail, FileDown, ArrowUpRight, Copy, Check } from "lucide-react";
import { contact } from "@/data/contact";
import { Reveal } from "@/components/util/Reveal";
import { GitHubMark, InstagramMark, LinkedInMark } from "@/components/util/Logos";

type CardKind = "email" | "resume" | "linkedin" | "github" | "instagram";

type CardIcon = ComponentType<{ className?: string; size?: number }>;

const SOCIAL_ICONS: Partial<Record<string, CardIcon>> = {
  LinkedIn: LinkedInMark,
  GitHub: GitHubMark,
  Instagram: InstagramMark,
};

export function Contact() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      window.location.href = `mailto:${contact.email}`;
    }
  }

  return (
    <section
      id="contact"
      className="relative border-t border-edge bg-ink pt-20 pb-16 md:pt-24 md:pb-20"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-3">
            <Reveal as="p" className="eyebrow">07 · Contact</Reveal>
          </div>
          <div className="md:col-span-9">
            <Reveal as="h2" delay={0.05} className="font-display text-display-l leading-[1.05] tracking-tight text-paper">
              Let&apos;s talk about
              <br />
              <span className="text-signal">a hard problem.</span>
            </Reveal>
            <p className="mt-6 max-w-2xl text-body text-paper/80">
              Toronto-based. Open to ambitious engineering problems and good conversations.
            </p>

            <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-edge bg-edge sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              <EmailCard email={contact.email} copied={copied} onCopy={copyEmail} />
              <ContactCard
                kind="resume"
                label="Resume"
                value="resume.pdf"
                icon={FileDown}
                href={contact.resumeHref}
                download
              />
              {contact.socials.map((s) => {
                const Icon = SOCIAL_ICONS[s.label];
                if (!Icon) return null;
                return (
                  <ContactCard
                    key={s.href}
                    kind={s.label.toLowerCase() as CardKind}
                    label={s.label}
                    value={`/${s.handle}`}
                    icon={Icon}
                    href={s.href}
                    external
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <footer className="mx-auto mt-24 max-w-6xl border-t border-edge px-6 pt-6">
        <div className="flex flex-wrap items-baseline justify-between gap-4 font-mono text-[0.75rem] text-muted">
          <p>
            © {new Date().getFullYear()} {contact.name} · {contact.location}
          </p>
          <p>Built with Next.js · Deployed on Vercel.</p>
        </div>
      </footer>
    </section>
  );
}

function EmailCard({
  email,
  copied,
  onCopy,
}: {
  email: string;
  copied: boolean;
  onCopy: () => void;
}) {
  const baseClass =
    "group relative flex flex-col gap-2 bg-surface p-6 text-left transition-colors duration-200 hover:bg-ink focus-visible:bg-ink";
  return (
    <a
      href={`mailto:${email}`}
      aria-label={`Send email to ${email}`}
      className={baseClass}
    >
      {/* Copy button — positioned above card link, still clickable */}
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onCopy();
        }}
        aria-label={copied ? "Email copied to clipboard" : `Copy email address ${email}`}
        className="pointer-events-auto absolute right-2 top-2 flex h-11 w-11 items-center justify-center rounded-md font-mono text-[0.6875rem] uppercase tracking-widest text-paper/60 transition hover:text-signal focus-visible:text-signal"
      >
        {copied ? <Check size={14} strokeWidth={2} /> : <Copy size={14} strokeWidth={2} />}
      </button>
      <div className="flex items-center gap-2">
        <Mail
          size={14}
          className="text-paper/60 transition-colors duration-200 group-hover:text-signal"
        />
        <p className="eyebrow">Email</p>
      </div>
      <p className="break-all font-mono text-[0.8125rem] leading-tight text-paper transition-colors duration-200 group-hover:text-signal">
        {email}
      </p>
    </a>
  );
}

type ContactCardProps = {
  kind: CardKind;
  label: string;
  value: string;
  icon: CardIcon;
  href: string;
  external?: boolean;
  download?: boolean;
};

function ContactCard({
  label,
  value,
  icon: Icon,
  href,
  external,
  download,
}: ContactCardProps) {
  const baseClass =
    "group relative flex flex-col gap-2 bg-surface p-6 text-left transition-colors duration-200 hover:bg-ink focus-visible:bg-ink";
  const isExternal = external === true;
  const IndicatorIcon = download ? FileDown : ArrowUpRight;

  return (
    <a
      href={href}
      {...(download ? { download: "" } : {})}
      {...(isExternal ? { target: "_blank", rel: "noreferrer" } : {})}
      aria-label={`${label}: ${value}${isExternal ? " (opens in new tab)" : ""}`}
      className={baseClass}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute right-4 top-4 flex items-center gap-1 font-mono text-[0.6875rem] uppercase tracking-widest text-signal opacity-0 transition group-hover:opacity-100"
      >
        <IndicatorIcon size={12} strokeWidth={2} />
      </span>
      <div className="flex items-center gap-2">
        <Icon
          size={14}
          className="text-paper/60 transition-colors duration-200 group-hover:text-signal"
        />
        <p className="eyebrow">{label}</p>
      </div>
      <p className="break-all font-mono text-[0.8125rem] leading-tight text-paper transition-colors duration-200 group-hover:text-signal">
        {value}
      </p>
    </a>
  );
}
