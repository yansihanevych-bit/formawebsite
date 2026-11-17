import { Reveal } from "@/components/ui/Reveal";

/** Шапка внутренних страниц: светлый фон, под фиксированной шапкой */
export function PageIntro({ eyebrow, title, lead }: { eyebrow: string; title: string; lead?: string }) {
  return (
    <section className="container-x pb-14 pt-40 md:pb-20 md:pt-52">
      <Reveal>
        <p className="eyebrow mb-6 text-stone">{eyebrow}</p>
        <h1 className="h-display max-w-[14ch]">{title}</h1>
      </Reveal>
      {lead && (
        <Reveal delay={0.1}>
          <p className="mt-8 max-w-2xl text-lg text-ink-2/80">{lead}</p>
        </Reveal>
      )}
    </section>
  );
}
