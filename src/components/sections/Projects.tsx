import { projects } from "@/data/projects";
import { Reveal } from "@/components/util/Reveal";
import { ScreenshotGallery } from "@/components/project-visuals/ScreenshotGallery";

export function Projects() {
  return (
    <section id="projects" className="relative border-t border-edge bg-ink py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-3">
            <Reveal as="p" className="eyebrow">05 · Projects</Reveal>
            <Reveal as="h2" delay={0.05} className="mt-4 font-display text-h2 font-normal text-paper">
              What I build in the margins.
            </Reveal>
            <Reveal as="p" delay={0.1} className="mt-4 text-small text-paper/70">
              Built for myself first. Designed like they weren&apos;t.
            </Reveal>
          </div>

          <div className="md:col-span-9 space-y-10">
            {projects.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i + 1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  const screens = project.screens ?? [];
  return (
    <article className="group relative overflow-hidden rounded-xl border border-edge bg-surface">
      <div className="grid grid-cols-1 md:grid-cols-12">
        <div className="md:col-span-5 border-b border-edge bg-ink md:border-b-0 md:border-r">
          <div className="grid-background relative aspect-[4/3] w-full md:aspect-auto md:h-full min-h-[380px]">
            {/* Faint radial glow behind the device to lift it off the background */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(55% 55% at 50% 55%, rgba(232,160,56,0.10), transparent 70%)",
              }}
            />
            {screens.length > 0 && <ScreenshotGallery screens={screens} />}
          </div>
        </div>
        <div className="md:col-span-7 p-6 md:p-8">
          <header className="mb-4">
            <div className="flex items-baseline justify-between gap-4">
              <p className="font-mono text-small text-muted">{project.role}</p>
              <p className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-signal">
                {String(index).padStart(2, "0")} · {project.year}
              </p>
            </div>
            <h3 className="mt-3 font-display text-[1.875rem] leading-tight text-paper">
              {project.name}
            </h3>
            <p className="mt-2 font-display text-[1.125rem] leading-snug text-paper/85">
              {project.thesis}
            </p>
          </header>
          <p className="text-small text-paper/75">{project.summary}</p>
          <ul className="mt-5 space-y-2.5 border-l border-edge pl-5">
            {project.outcomes.map((o, i) => (
              <li key={i} className="text-small text-paper/75">
                {o.label && (
                  <span className="text-paper">{o.label} — </span>
                )}
                <span className={o.label ? "text-paper/70" : undefined}>
                  {o.description}
                </span>
              </li>
            ))}
          </ul>
          {project.metrics && project.metrics.length > 0 && (
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-muted">
              {project.metrics.map((m) => (
                <span key={m} className="whitespace-nowrap">
                  {m}
                </span>
              ))}
            </div>
          )}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <ul className="flex flex-wrap gap-1.5">
              {project.stack.map((s) => (
                <li
                  key={s}
                  className="rounded-full border border-edge px-2 py-0.5 font-mono text-[0.6875rem] uppercase tracking-widest text-muted"
                >
                  {s}
                </li>
              ))}
            </ul>
            {project.links && project.links.length > 0 && (
              <ul className="flex gap-4 font-mono text-small">
                {project.links.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="link-underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {l.label} →
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
