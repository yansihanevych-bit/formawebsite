import type { ReactNode } from "react";
import { SplitText } from "@/components/ui/SplitText";
import { DrawLine } from "@/components/ui/DrawLine";

/** Нумерованный раздел кейса: 01 — Название */
export function CaseSection({ n, title, children, dark }: { n: string; title: string; children: ReactNode; dark?: boolean }) {
  return (
    <section className={dark ? "bg-graphite text-warm" : ""}>
      <div className="container-x py-20 md:py-28">
        <DrawLine className={dark ? "!bg-white/25" : ""} strong={!dark} />
        <div className="mb-10 flex items-baseline gap-6 pt-6 md:mb-14">
          <span className={`meta ${dark ? "text-stone" : "text-accent"}`}>{n}</span>
          <SplitText lines={[title]} className="font-display text-[clamp(1.8rem,3.4vw,3.25rem)] font-medium leading-none tracking-[-0.035em]" />
        </div>
        {children}
      </div>
    </section>
  );
}
