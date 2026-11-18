import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import { getDict } from "@/dictionaries";
import { studio } from "@/content/studio";
import { PageIntro } from "@/components/sections/PageIntro";
import { MaskImage } from "@/components/ui/MaskImage";
import { SectionHead } from "@/components/ui/SectionHead";
import { SplitText } from "@/components/ui/SplitText";
import { Reveal } from "@/components/ui/Reveal";
import { CountUp } from "@/components/ui/CountUp";
import { Corners } from "@/components/ui/Corners";
import { Arrow } from "@/components/ui/Arrow";
import { Process } from "@/components/sections/Process";
import { pageMeta, sized } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]/studio">) {
  const lang = (await params).lang as Locale;
  const d = getDict(lang);
  return pageMeta(lang, "/studio", d.studioPage.title, t(studio.intro, lang), sized(studio.hero.src, 1200));
}

export default async function Page({ params }: PageProps<"/[lang]/studio">) {
  const lang = (await params).lang as Locale;
  const d = getDict(lang);
  return (
    <>
      <PageIntro eyebrow={d.studioPage.eyebrow} title={d.studioPage.title} />
      <section className="container-x pb-24 md:pb-32">
        <MaskImage img={studio.hero} priority sizes="(min-width: 768px) 92vw, 100vw" className="aspect-[16/9] md:aspect-[21/9]" />
        <div className="mt-14 grid gap-10 md:mt-20 md:grid-cols-12">
          <SplitText as="p" lines={[t(studio.manifesto, lang)]} className="font-display text-[clamp(1.6rem,3vw,2.75rem)] font-medium leading-[1.1] tracking-tight md:col-span-7" />
          <Reveal delay={0.15} className="text-lg text-muted md:col-span-4 md:col-start-9">
            <p>{t(studio.intro, lang)}</p>
          </Reveal>
        </div>
      </section>

      <section data-tone="olive" className="py-6">
        <div className="container-x grid grid-cols-2 md:grid-cols-4">
          {studio.numbers.map((n, k) => (
            <Reveal key={k} delay={k * 0.06} className={`py-12 pr-4 md:py-16 ${k ? "md:border-l md:border-line md:pl-8" : ""}`}>
              <p className="meta text-muted">0{k + 1}</p>
              <CountUp value={n.v} className="h-numeral mt-6 block text-6xl md:text-8xl" />
              <p className="mt-3 text-sm text-muted">{t(n.l, lang)}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section data-tone="sand" className="container-x py-24 md:py-32">
        <SectionHead eyebrow={d.studioPage.principles} title={d.home.whyTitle} />
        <div className="grid gap-px bg-line md:grid-cols-3">
          {studio.principles.map((p, k) => (
            <Reveal key={k} delay={k * 0.08} className="group relative bg-paper-2/50 p-8 md:p-10">
              <Corners />
              <p className="meta text-accent">0{k + 1}</p>
              <h3 className="mt-10 font-display text-2xl uppercase leading-tight">{t(p.t, lang)}</h3>
              <p className="mt-4 text-muted">{t(p.d, lang)}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section data-tone="milk" className="container-x py-24 md:py-32">
        <SectionHead eyebrow={d.studioPage.team} title={d.studioPage.team} aside={<p className="meta text-muted">{d.studioPage.teamNote}</p>} />
        <ul className="border-t border-ink">
          {studio.team.map((m, k) => (
            <Reveal as="li" key={k} delay={k * 0.05} className="grid grid-cols-[3rem_minmax(0,1fr)_auto] items-baseline gap-4 border-b border-line py-6">
              <span className="meta text-muted">0{k + 1}</span>
              <span className="font-display text-xl uppercase leading-tight md:text-3xl">{t(m.role, lang)}</span>
              <span className="meta text-muted">{m.name}</span>
            </Reveal>
          ))}
        </ul>
      </section>

      <Process lang={lang} eyebrow={d.home.processEyebrow} title={d.home.processTitle} tone="sand" />

      <section data-tone="walnut" className="container-x py-24 md:py-32">
        <div className="grid gap-4 md:grid-cols-3">
          {studio.gallery.map((g, k) => (
            <MaskImage key={g.src} img={g} delay={k * 0.1} sizes="(min-width: 768px) 30vw, 100vw" className="aspect-[4/5]" />
          ))}
        </div>
        <div className="mt-14 flex flex-wrap gap-3">
          <Link href={`/${lang}/projects`} className="btn btn-ghost">{d.common.viewProjects} <Arrow /></Link>
          <Link href={`/${lang}/start`} className="btn btn-solid">{d.common.startProject} <Arrow /></Link>
        </div>
      </section>
    </>
  );
}
