import type { Locale } from "@/lib/i18n";
import { t as tr } from "@/lib/i18n";
import type { Dict } from "@/dictionaries";
import { segments } from "@/content/segments";
import { IMG } from "@/content/images";
import { Pic } from "@/components/ui/Pic";
import { QuickForm } from "@/components/form/QuickForm";
import { Reveal } from "@/components/ui/Reveal";

export function CtaBand({ lang, d, defaultType, title }: { lang: Locale; d: Dict; defaultType?: string; title?: string }) {
  return (
    <section className="relative overflow-hidden bg-ink text-paper">
      <Pic img={IMG.houseDusk} className="absolute inset-0 opacity-30" sizes="100vw" quality={60} />
      <div className="container-x relative py-24 md:py-36">
        <Reveal>
          <p className="eyebrow mb-6 text-paper/60">{d.quick.title}</p>
          <h2 className="h-section max-w-[16ch]">{title ?? d.home.ctaTitle}</h2>
          <p className="mt-6 max-w-xl text-paper/75">{d.home.ctaText}</p>
        </Reveal>
        <Reveal delay={0.1} className="mt-12 max-w-4xl">
          <QuickForm lang={lang} t={d.quick} defaultType={defaultType} options={segments.map((s) => ({ id: s.id, label: tr(s.who, lang) }))} />
        </Reveal>
      </div>
    </section>
  );
}
