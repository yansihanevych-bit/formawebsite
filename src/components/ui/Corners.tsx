/**
 * Угловые метки чертежа (L-кутики 8px). Родителю нужны `relative` и `group`.
 * При наведении на группу метки расходятся на 4px и окрашиваются акцентом.
 */
export function Corners({ className = "", tone = "ink" }: { className?: string; tone?: "ink" | "warm" }) {
  const c = tone === "warm" ? "border-warm/70" : "border-ink/50";
  const base = `pointer-events-none absolute h-2 w-2 ${c} transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:border-accent`;
  return (
    <span aria-hidden className={className}>
      <span className={`${base} left-1.5 top-1.5 border-l border-t group-hover:-translate-x-1 group-hover:-translate-y-1`} />
      <span className={`${base} right-1.5 top-1.5 border-r border-t group-hover:-translate-y-1 group-hover:translate-x-1`} />
      <span className={`${base} bottom-1.5 left-1.5 border-b border-l group-hover:-translate-x-1 group-hover:translate-y-1`} />
      <span className={`${base} bottom-1.5 right-1.5 border-b border-r group-hover:translate-x-1 group-hover:translate-y-1`} />
    </span>
  );
}
