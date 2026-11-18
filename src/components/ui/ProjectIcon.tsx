/**
 * Пиктограмма-планировка проекта (идея BIG: у каждого проекта свой знак).
 * Детерминированно строится из slug: контур + 2–3 перегородки + проём — как мини-план.
 */
function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
}

export function ProjectIcon({ slug, className = "h-9 w-9" }: { slug: string; className?: string }) {
  const r = hash(slug);
  const w = 26 + Math.round(r() * 8);
  const h = 22 + Math.round(r() * 10);
  const x0 = (40 - w) / 2;
  const y0 = (40 - h) / 2;
  const vx = x0 + Math.round(w * (0.35 + r() * 0.3));
  const hy = y0 + Math.round(h * (0.35 + r() * 0.3));
  const notch = r() > 0.5;
  const door = r() > 0.5;
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" stroke="currentColor" aria-hidden>
      <rect x="0.5" y="0.5" width="39" height="39" strokeOpacity="0.25" />
      <path d={notch ? `M${x0} ${y0}H${x0 + w}V${y0 + h - 6}H${x0 + w - 6}V${y0 + h}H${x0}Z` : `M${x0} ${y0}H${x0 + w}V${y0 + h}H${x0}Z`} strokeWidth="1.6" />
      <path d={`M${vx} ${y0}V${hy - 3}M${vx} ${hy + 3}V${y0 + h}`} strokeWidth="1" />
      <path d={`M${x0} ${hy}H${vx - 4}`} strokeWidth="1" />
      {door && <path d={`M${vx} ${hy + 3}A6 6 0 0 1 ${vx + 6} ${hy - 3}`} strokeWidth="0.8" strokeOpacity="0.7" />}
    </svg>
  );
}
