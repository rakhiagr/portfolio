import { roles } from "@/data/experience";
import { Reveal } from "@/components/util/Reveal";
import { LinkedInMark } from "@/components/util/Logos";

const companyLogo: Record<string, (props: { className?: string; size?: number }) => React.JSX.Element> = {
  LinkedIn: LinkedInMark,
};

function formatRange(start: string, end: string | "Present") {
  const [sy, sm] = start.split("-");
  const s = new Date(Number(sy), Number(sm) - 1).toLocaleString("en-US", {
    month: "short",
    year: "numeric",
  });
  if (end === "Present") return `${s} — Present`;
  const [ey, em] = end.split("-");
  const e = new Date(Number(ey), Number(em) - 1).toLocaleString("en-US", {
    month: "short",
    year: "numeric",
  });
  return `${s} — ${e}`;
}

export function Experience() {
  return (
    <section id="experience" className="relative border-t border-edge bg-ink py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-3">
            <Reveal as="p" className="eyebrow">02 · Experience</Reveal>
            <Reveal as="h2" delay={0.05} className="mt-4 font-display text-h2 font-normal text-paper">
              Where I&apos;ve built.
            </Reveal>
          </div>
          <div className="md:col-span-9">
            <ol className="space-y-16">
              {roles.map((role) => {
                const Logo = companyLogo[role.company];
                return (
                <li key={role.id} className="relative">
                  <header className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <div>
                      <div className="flex items-center gap-3">
                        {Logo && (
                          <span className="flex h-8 w-8 items-center justify-center rounded-md border border-edge bg-surface text-paper/85">
                            <Logo size={16} />
                          </span>
                        )}
                        <h3 className="font-display text-h2 font-normal text-paper">
                          {role.title}{" "}
                          <span className="text-signal">· {role.company}</span>
                        </h3>
                      </div>
                      <p className="mt-1 font-mono text-small text-muted">
                        {role.location}
                      </p>
                    </div>
                    <p className="font-mono text-small text-muted">
                      {formatRange(role.start, role.end)}
                    </p>
                  </header>

                  {role.summary && (
                    <p className="mt-4 max-w-3xl text-body text-paper/80">
                      {role.summary}
                    </p>
                  )}

                  {role.highlights && (
                    <ul className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-edge bg-edge md:grid-cols-2">
                      {role.highlights.map((h) => (
                        <li
                          key={h.id}
                          className={
                            "group relative flex flex-col gap-4 overflow-hidden bg-surface p-6 transition-colors duration-300 hover:bg-ink " +
                            (h.featured ? "md:col-span-2 md:p-8" : "")
                          }
                        >
                          {/* Signal ray that draws in from top on hover */}
                          <span
                            aria-hidden
                            className="pointer-events-none absolute left-0 top-0 h-full w-px origin-top scale-y-0 bg-signal transition-transform duration-[600ms] ease-out group-hover:scale-y-100"
                          />
                          {h.featured && (
                            <span
                              aria-hidden
                              className="absolute right-6 top-6 font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-signal"
                            >
                              ● Featured
                            </span>
                          )}
                          <div className="flex items-start justify-between gap-4">
                            <h4
                              className={
                                "font-display leading-tight text-paper transition-colors duration-300 group-hover:text-signal " +
                                (h.featured
                                  ? "text-[1.75rem] md:text-[2rem] max-w-xl"
                                  : "text-[1.375rem]")
                              }
                            >
                              {h.title}
                            </h4>
                            {!h.featured && (
                              <span
                                className="mt-1 signal-dot shrink-0 transition-transform duration-500 group-hover:scale-[1.6]"
                                style={{ transitionProperty: "transform, box-shadow" }}
                              />
                            )}
                          </div>
                          <p
                            className={
                              h.featured
                                ? "max-w-3xl text-body text-paper/80"
                                : "text-small text-paper/75"
                            }
                          >
                            {h.summary}
                          </p>
                          <dl
                            className={
                              "flex flex-wrap gap-x-6 gap-y-2 font-mono " +
                              (h.featured ? "text-[0.9375rem] md:gap-x-10" : "text-[0.8125rem]")
                            }
                          >
                            {h.metrics.map((m, i) => (
                              <div key={i}>
                                <dd className="text-signal">{m}</dd>
                              </div>
                            ))}
                          </dl>
                          <ul className="mt-auto flex flex-wrap gap-1.5 pt-2">
                            {h.stack.map((s) => (
                              <li
                                key={s}
                                className="rounded-full border border-edge px-2 py-0.5 font-mono text-[0.6875rem] uppercase tracking-widest text-muted transition-colors duration-300 group-hover:border-signal/30 group-hover:text-paper/80"
                              >
                                {s}
                              </li>
                            ))}
                          </ul>
                        </li>
                      ))}
                    </ul>
                  )}

                  {role.bullets && (
                    <ul className="mt-6 space-y-3 border-l border-edge pl-6">
                      {role.bullets.map((b, i) => (
                        <li key={i} className="text-body text-paper/80">
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
