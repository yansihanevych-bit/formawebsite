import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import { SplitText } from "./SplitText";

export function SectionHead({ eyebrow, title, aside, className = "" }: { eyebrow: string; title: string; aside?: ReactNode; className?: string }) {
  return (
    <div className={`mb-12 grid gap-6 md:mb-20 md:grid-cols-12 md:items-end ${className}`}>
      <div className="md:col-span-8">
        <p className="meta mb-6 text-muted">— {eyebrow}</p>
        <SplitText lines={[title]} className="h-section max-w-[18ch]" />
      </div>
      {aside && <Reveal delay={0.1} className="md:col-span-4 md:justify-self-end">{aside}</Reveal>}
    </div>
  );
}
