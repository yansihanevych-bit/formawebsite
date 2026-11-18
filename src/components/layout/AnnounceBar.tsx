"use client";

/**
 * Полоска с ключевыми фактами над шапкой (бегущая строка).
 * Пауза при наведении, статичная при prefers-reduced-motion.
 */
export function AnnounceBar({ items, hidden }: { items: string[]; hidden: boolean }) {
  const row = (aria: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={aria || undefined}>
      {items.map((it, k) => (
        <li key={k} className="meta flex items-center whitespace-nowrap px-6 text-[0.62rem] md:px-8">
          <span className="mr-6 inline-block h-1 w-1 rotate-45 bg-stone md:mr-8" aria-hidden />
          {it}
        </li>
      ))}
    </ul>
  );
  return (
    <div
      className={`group overflow-hidden bg-graphite text-warm/85 transition-[height,opacity] duration-500 ease-[cubic-bezier(.16,1,.3,1)] ${hidden ? "h-0 opacity-0" : "h-8 opacity-100"}`}
      role="region"
      aria-label="FORMA BURO"
    >
      <div className="announce-track flex h-8 w-max items-center group-hover:[animation-play-state:paused]">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
