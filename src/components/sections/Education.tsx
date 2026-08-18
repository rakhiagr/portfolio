import { schools } from "@/data/education";
import { Reveal } from "@/components/util/Reveal";
import { ASUMark } from "@/components/util/Logos";

const schoolLogo: Record<string, (props: { className?: string; size?: number }) => React.JSX.Element> = {
  "Arizona State University": ASUMark,
};

function formatRange(start: string, end: string) {
  const [sy, sm] = start.split("-");
  const [ey, em] = end.split("-");
  const s = new Date(Number(sy), Number(sm) - 1).toLocaleString("en-US", {
    month: "short",
    year: "numeric",
  });
  const e = new Date(Number(ey), Number(em) - 1).toLocaleString("en-US", {
    month: "short",
    year: "numeric",
  });
  return `${s} — ${e}`;
}

export function Education() {
  return (
    <section id="education" className="relative border-t border-edge bg-ink py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-3">
            <Reveal as="p" className="eyebrow">04 · Education</Reveal>
            <Reveal
              as="h2"
              delay={0.05}
              className="mt-4 font-display text-h2 font-normal text-paper"
            >
              Where I learned.
            </Reveal>
          </div>

          <div className="md:col-span-9 space-y-16">
            {schools.map((s) => {
              const Logo = schoolLogo[s.school];
              return (
                <div key={s.id} className="space-y-10">
                  <header className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <div>
                      <div className="flex items-center gap-3">
                        {Logo && (
                          <span className="flex h-8 w-8 items-center justify-center rounded-md border border-edge bg-surface text-paper/85">
                            <Logo size={16} />
                          </span>
                        )}
                        <h3 className="font-display text-h2 font-normal text-paper">
                          {s.degree}{" "}
                          <span className="text-signal">· {s.school}</span>
                        </h3>
                      </div>
                      <p className="mt-1 font-mono text-small text-muted">
                        {s.location} · GPA {s.gpa}
                      </p>
                    </div>
                    <p className="font-mono text-small text-muted">
                      {formatRange(s.start, s.end)}
                    </p>
                  </header>

                  {s.summary && (
                    <p className="max-w-3xl text-body text-paper/80">{s.summary}</p>
                  )}

                  {s.publications.length > 0 && (
                    <div>
                      <p className="eyebrow mb-4">Publications</p>
                      <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-edge bg-edge">
                        {s.publications.map((p) => (
                          <li
                            key={p.id}
                            className="group relative flex flex-col gap-3 overflow-hidden bg-surface p-6 transition-colors duration-300 hover:bg-ink"
                          >
                            <span
                              aria-hidden
                              className="pointer-events-none absolute left-0 top-0 h-full w-px origin-top scale-y-0 bg-signal transition-transform duration-[600ms] ease-out group-hover:scale-y-100"
                            />
                            <div className="flex items-start justify-between gap-4">
                              <p className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-signal">
                                {p.venue}
                              </p>
                              <p className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-muted">
                                {p.year}
                              </p>
                            </div>
                            <h4 className="font-display text-[1.5rem] leading-tight text-paper transition-colors duration-300 group-hover:text-signal">
                              {p.title}
                            </h4>
                            <p className="text-small text-paper/70">
                              {p.authors}
                            </p>
                            <p className="text-small text-paper/80">{p.summary}</p>
                            {p.links.length > 0 && (
                              <ul className="mt-2 flex flex-wrap gap-2 font-mono text-small">
                                {p.links.map((l) => (
                                  <li key={l.href}>
                                    <a
                                      href={l.href}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="link-underline inline-flex min-h-[44px] items-center gap-1 px-1 py-2"
                                      aria-label={`${l.label} — ${p.title} (opens in new tab)`}
                                    >
                                      {l.label} <span aria-hidden>↗</span>
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {s.coursework.length > 0 && (
                    <div>
                      <p className="eyebrow mb-4">Selected graduate work</p>
                      <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-edge bg-edge md:grid-cols-2">
                        {s.coursework.map((c) => (
                          <li
                            key={c.id}
                            className="group relative flex flex-col gap-3 overflow-hidden bg-surface p-6 transition-colors duration-300 hover:bg-ink"
                          >
                            <span
                              aria-hidden
                              className="pointer-events-none absolute left-0 top-0 h-full w-px origin-top scale-y-0 bg-signal transition-transform duration-[600ms] ease-out group-hover:scale-y-100"
                            />
                            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-muted">
                              {c.term}
                            </p>
                            <h4 className="font-display text-[1.375rem] leading-tight text-paper transition-colors duration-300 group-hover:text-signal">
                              {c.name}
                            </h4>
                            <p className="text-small text-paper/75">{c.summary}</p>
                            <ul className="space-y-1.5 border-l border-edge pl-4">
                              {c.outcomes.map((o, i) => (
                                <li key={i} className="text-small text-paper/70">
                                  {o}
                                </li>
                              ))}
                            </ul>
                            <ul className="mt-auto flex flex-wrap gap-1.5 pt-2">
                              {c.stack.map((t) => (
                                <li
                                  key={t}
                                  className="rounded-full border border-edge px-2 py-0.5 font-mono text-[0.6875rem] uppercase tracking-widest text-muted transition-colors duration-300 group-hover:border-signal/30 group-hover:text-paper/80"
                                >
                                  {t}
                                </li>
                              ))}
                            </ul>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {s.courses && s.courses.length > 0 && (
                    <div>
                      <p className="eyebrow mb-4">Coursework</p>
                      <ul className="grid grid-cols-1 gap-x-8 gap-y-0 sm:grid-cols-2 lg:grid-cols-3">
                        {s.courses.map((c) => (
                          <li
                            key={c.code}
                            className="flex items-baseline justify-between gap-4 border-b border-edge py-2.5"
                          >
                            <span className="text-small text-paper">{c.name}</span>
                            <span className="font-mono text-[0.75rem] text-muted whitespace-nowrap">
                              {c.code}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
