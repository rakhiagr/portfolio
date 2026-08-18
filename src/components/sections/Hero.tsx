export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] w-full items-end overflow-hidden"
    >
      {/* Vignette so foreground copy reads even against bright bloom from the persistent canvas */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(140% 100% at 50% 60%, rgba(10,13,20,0) 40%, rgba(10,13,20,0.9) 100%)",
        }}
      />
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-20 pt-40 md:pb-28">
        <p className="eyebrow mb-6">
          <span className="signal-dot mr-3 align-middle" />
          Software Engineer · Distributed Systems
        </p>
        <h1 className="font-display text-display-xl font-normal leading-[0.95] tracking-tight text-paper">
          Rakhi
          <br />
          Agrawal.
        </h1>
        <p className="mt-8 max-w-2xl text-body text-paper/80">
          Software engineer building large-scale distributed systems and data infrastructure. Nearly four years at LinkedIn, building systems that process <span className="text-paper">hundreds of millions of metadata events every day</span>.
        </p>
      </div>
    </section>
  );
}
