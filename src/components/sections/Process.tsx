import { processSteps } from "@/content/misc";
import { t, type Locale } from "@/lib/i18n";
import { Reveal } from "@/components/ui/Reveal";

export function Process({ lang }: { lang: Locale }) {
  return (
    <ol className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-5">
      {processSteps.map((s, k) => (
        <Reveal as="li" key={k} delay={k * 0.06} className="flex min-h-64 flex-col bg-paper p-6 md:p-8">
          <span className="font-display text-5xl font-extralight text-stone/60">{String(k + 1).padStart(2, "0")}</span>
          <h3 className="mt-auto pt-10 font-display text-xl font-normal">{t(s.title, lang)}</h3>
          <p className="mt-2 text-sm text-stone">{t(s.text, lang)}</p>
          <p className="eyebrow mt-5 text-[0.6rem] text-ochre">{t(s.time, lang)}</p>
        </Reveal>
      ))}
    </ol>
  );
}
