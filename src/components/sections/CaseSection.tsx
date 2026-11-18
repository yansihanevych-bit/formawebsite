import type { ReactNode } from "react";
import { SplitText } from "@/components/ui/SplitText";
import { DrawLine } from "@/components/ui/DrawLine";

/** Нумерованный раздел кейса: огромный номер-контур + название; tone — тон секции (смена фона при прокрутке) */
export function CaseSection({ n, title, children, tone = "milk" }: { n: string; title: string; children: ReactNode; tone?: string }) {
  return (
    <section data-tone={tone}>
      <div className="container-x py-20 md:py-32">
        <DrawLine strong />
        <div className="mb-10 flex items-end gap-6 pt-6 md:mb-16 md:gap-10">
          <span className="h-numeral text-outline text-6xl [--outline:var(--color-accent)] md:text-8xl">{n}</span>
          <SplitText lines={[title]} className="h-section pb-1 !text-[clamp(1.4rem,3vw,3rem)]" />
        </div>
        {children}
      </div>
    </section>
  );
}
