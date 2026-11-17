import type { ReactNode } from "react";
import { SplitText } from "@/components/ui/SplitText";

/** Нумерованный раздел кейса: 01 — Название */
export function CaseSection({ n, title, children, dark }: { n: string; title: string; children: ReactNode; dark?: boolean }) {
  return (
    <section className={dark ? "bg-ink text-paper" : ""}>
      <div className="container-x py-20 md:py-28">
        <div className={`mb-10 flex items-baseline gap-6 border-t pt-6 md:mb-14 ${dark ? "border-white/20" : "border-ink"}`}>
          <span className={`meta ${dark ? "text-stone" : "text-accent"}`}>{n}</span>
          <SplitText lines={[title]} className="font-display text-[clamp(1.8rem,3.4vw,3.25rem)] font-medium leading-none tracking-[-0.035em]" />
        </div>
        {children}
      </div>
    </section>
  );
}
