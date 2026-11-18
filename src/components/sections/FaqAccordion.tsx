"use client";
import { useId, useState } from "react";

/**
 * Минималистичный accordion: номер, вопрос, «+» → «×».
 * Плавное раскрытие через grid-template-rows (ответы всегда в DOM — для поиска и Ctrl+F).
 */
export function FaqAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const id = useId();
  return (
    <div className="border-t border-ink">
      {items.map((f, k) => {
        const on = open === k;
        return (
          <div key={k} className="border-b border-line">
            <h3>
              <button
                type="button"
                id={`${id}-q${k}`}
                aria-expanded={on}
                aria-controls={`${id}-a${k}`}
                onClick={() => setOpen(on ? null : k)}
                className="group grid w-full grid-cols-[2.5rem_minmax(0,1fr)_auto] items-baseline gap-3 py-6 text-left md:grid-cols-[3.5rem_minmax(0,1fr)_auto] md:py-7"
              >
                <span className={`meta tabular-nums transition-colors duration-500 ${on ? "text-accent" : "text-muted"}`}>{String(k + 1).padStart(2, "0")}</span>
                <span className={`font-display text-lg leading-snug transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] md:text-2xl ${on ? "translate-x-2" : "group-hover:translate-x-2"}`}>{f.q}</span>
                <span className="relative mt-2 h-4 w-4 shrink-0" aria-hidden>
                  <span className={`absolute left-0 top-1/2 h-px w-full bg-current transition-transform duration-500 ${on ? "rotate-45" : ""}`} />
                  <span className={`absolute left-1/2 top-0 h-full w-px bg-current transition-transform duration-500 ${on ? "rotate-45" : ""}`} />
                </span>
              </button>
            </h3>
            <div
              id={`${id}-a${k}`}
              role="region"
              aria-labelledby={`${id}-q${k}`}
              className={`grid transition-[grid-template-rows,opacity] duration-700 ease-[cubic-bezier(.16,1,.3,1)] ${on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
            >
              <div className="overflow-hidden">
                <p className="max-w-3xl pb-8 pl-[calc(2.5rem+0.75rem)] text-ink-2/80 md:pl-[calc(3.5rem+0.75rem)] md:text-lg">{f.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
