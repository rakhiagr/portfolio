/**
 * Fixed, pointer-inert film-grain overlay. Adds warmth to the flat ink surface
 * without adding motion. Rendered via an inline SVG filter data-URI so it costs
 * zero network requests and no runtime work after paint.
 */
export function FilmGrain() {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.96  0 0 0 0 0.94  0 0 0 0 0.91  0 0 0 0.5 0'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>`;
  const uri = `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`;
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-30"
      style={{
        backgroundImage: uri,
        backgroundRepeat: "repeat",
        mixBlendMode: "overlay",
        opacity: 0.06,
      }}
    />
  );
}
