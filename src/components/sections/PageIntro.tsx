import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";

/** Шапка внутренних страниц: светлый фон, крупная типографика */
export function PageIntro({ eyebrow, title, lead, tone = "milk" }: { eyebrow: string; title: string; lead?: string; tone?: string }) {
  return (
    <section data-tone={tone} className="container-x pb-14 pt-40 md:pb-20 md:pt-52">
      <p className="meta mb-8 flex items-center gap-3 text-muted">
        <span className="text-accent">+</span> {eyebrow}
      </p>
      <SplitText as="h1" lines={[title]} onMount delay={0.15} className="h-display max-w-[16ch] !text-[clamp(2.3rem,7.4vw,8rem)] !leading-[0.92]" />
      {lead && (
        <Reveal delay={0.35}>
          <p className="mt-10 max-w-2xl border-t border-ink pt-6 text-lg text-ink-2/80">{lead}</p>
        </Reveal>
      )}
    </section>
  );
}
