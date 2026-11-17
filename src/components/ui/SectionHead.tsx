import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function SectionHead({ eyebrow, title, aside, className = "" }: { eyebrow: string; title: ReactNode; aside?: ReactNode; className?: string }) {
  return (
    <div className={`mb-12 grid gap-6 md:mb-20 md:grid-cols-12 md:items-end ${className}`}>
      <Reveal className="md:col-span-8">
        <p className="eyebrow mb-5 text-stone">{eyebrow}</p>
        <h2 className="h-section max-w-[18ch]">{title}</h2>
      </Reveal>
      {aside && <Reveal delay={0.1} className="md:col-span-4 md:justify-self-end">{aside}</Reveal>}
    </div>
  );
}
