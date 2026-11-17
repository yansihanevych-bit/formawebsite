import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";

/** Шапка внутренних страниц: светлый фон, крупная типографика */
export function PageIntro({ eyebrow, title, lead }: { eyebrow: string; title: string; lead?: string }) {
  return (
    <section className="container-x pb-14 pt-40 md:pb-20 md:pt-52">
      <p className="meta mb-8 text-muted">— {eyebrow}</p>
      <SplitText as="h1" lines={[title]} onMount delay={0.15} className="h-display max-w-[14ch]" />
      {lead && (
        <Reveal delay={0.35}>
          <p className="mt-10 max-w-2xl border-t border-ink pt-6 text-lg text-ink-2/80">{lead}</p>
        </Reveal>
      )}
    </section>
  );
}
