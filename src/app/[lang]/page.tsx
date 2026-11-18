import Link from "next/link";
import type { Metadata } from "next";
import { hasLocale, t, type Locale } from "@/lib/i18n";
import { getDict } from "@/dictionaries";
import { IMG } from "@/content/images";
import { segments } from "@/content/segments";
import { projects } from "@/content/projects";
import { services } from "@/content/services";
import { plans, faqs } from "@/content/misc";
import { Hero } from "@/components/sections/Hero";
import { SegmentList } from "@/components/sections/SegmentList";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { EditorialGrid } from "@/components/sections/Editorial";
import { ServicesList } from "@/components/sections/ServicesList";
import { Process } from "@/components/sections/Process";
import { PricingCards } from "@/components/sections/PricingCards";
import { FaqList, faqJsonLd } from "@/components/sections/FaqList";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";
import { CountUp } from "@/components/ui/CountUp";
import { CalcCta } from "@/components/sections/CalcCta";
import { Arrow } from "@/components/ui/Arrow";
import { alternates } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return { alternates: alternates(lang) };
}

export default async function Home({ params }: PageProps<"/[lang]">) {
  const lang = (await params).lang as Locale;
  const d = getDict(lang);
  const featured = projects.filter((p) => p.featured).slice(0, 3);
  const faqTeaser = faqs.slice(0, 5);

  return (
    <>
      <Hero
        image={IMG.hero}
        eyebrow={d.home.eyebrow}
        lines={[d.home.h1a, d.home.h1b]}
        sub={d.home.sub}
        primary={{ label: d.common.startProject, href: `/${lang}/start` }}
        secondary={{ label: d.common.viewProjects, href: `/${lang}/projects` }}
        scroll={d.home.scroll}
        meta={[
          { k: "Concept", v: "48–72h" },
          { k: d.home.langs, v: "IT · EN · RU" },
        ]}
      />

      {/* Показатели */}
      <section className="border-b border-line">
        <div className="container-x grid grid-cols-2 md:grid-cols-4">
          {d.home.stats.map((s, k) => (
            <Reveal key={k} delay={k * 0.06} className={`py-12 pr-4 md:py-16 ${k ? "md:border-l md:border-line md:pl-8" : ""}`}>
              <p className="meta text-muted">0{k + 1}</p>
              <CountUp value={s.v} className="mt-6 block whitespace-nowrap font-display text-4xl font-medium tracking-tight sm:text-5xl md:text-6xl" />
              <p className="mt-3 text-sm text-muted">{s.l}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Аудитории */}
      <section className="container-x py-24 md:py-36">
        <SectionHead eyebrow={d.home.segmentsEyebrow} title={d.home.segmentsTitle} />
        <SegmentList
          items={segments.map((s) => ({
            id: s.id,
            n: s.n,
            who: t(s.who, lang),
            title: t(s.title, lang),
            href: `/${lang}/${s.slug}`,
            img: s.image,
          }))}
        />
      </section>

      {/* Selected projects — редакционная галерея */}
      <section className="container-x pb-24 md:pb-36">
        <SectionHead
          eyebrow={d.home.featuredEyebrow}
          title={d.home.featuredTitle}
          aside={
            <Link href={`/${lang}/projects`} className="btn btn-ghost">
              {d.common.allProjects} <Arrow />
            </Link>
          }
        />
        <EditorialGrid items={featured} lang={lang} />
      </section>

      {/* Before / after */}
      <section className="bg-graphite py-24 text-warm md:py-36">
        <div className="container-x">
          <div className="mb-12 grid gap-8 md:mb-16 md:grid-cols-12">
            <div className="md:col-span-8">
              <p className="meta mb-6 text-stone">— {d.home.baEyebrow}</p>
              <SplitText lines={[d.home.baTitle]} className="h-section max-w-[20ch]" />
            </div>
            <Reveal delay={0.1} className="self-end md:col-span-4">
              <p className="text-warm/70">{d.home.baText}</p>
            </Reveal>
          </div>
          <Reveal>
            <BeforeAfter before={IMG.plans} after={IMG.living5} labels={{ before: d.common.before, after: d.common.after, drag: d.common.drag }} />
          </Reveal>
        </div>
      </section>

      {/* What we do */}
      <section id="services" className="container-x scroll-mt-24 py-24 md:py-36">
        <ServicesList
          eyebrow={d.home.servicesEyebrow}
          title={d.home.servicesTitle}
          lead={d.home.servicesLead}
          deliverables={d.home.deliverables}
          items={services.map((s) => ({
            id: s.id,
            n: s.n,
            title: t(s.title, lang),
            short: t(s.short, lang),
            body: t(s.body, lang),
            includes: s.includes.map((x) => t(x, lang)),
            timing: t(s.timing, lang),
            image: s.image,
          }))}
        />
      </section>

      {/* Почему мы */}
      <section className="border-y border-line">
        <div className="container-x py-24 md:py-32">
          <SectionHead eyebrow={d.home.whyEyebrow} title={d.home.whyTitle} />
          <div className="grid md:grid-cols-2 lg:grid-cols-4">
            {d.home.why.map((w, k) => (
              <Reveal key={k} delay={k * 0.06} className={`border-t border-ink py-8 lg:pr-8 ${k ? "lg:border-l lg:border-t lg:pl-8" : ""}`}>
                <p className="meta text-accent">0{k + 1}</p>
                <h3 className="mt-8 font-display text-2xl font-medium tracking-tight">{w.t}</h3>
                <p className="mt-3 text-sm text-muted">{w.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <Process lang={lang} eyebrow={d.home.processEyebrow} title={d.home.processTitle} />

      {/* Переход к калькулятору */}
      <CalcCta lang={lang} t={d.calcCta} />

      {/* Pricing */}
      <section className="container-x py-24 md:py-36">
        <SectionHead
          eyebrow={d.home.pricingEyebrow}
          title={d.home.pricingTitle}
          aside={
            <Link href={`/${lang}/pricing`} className="btn btn-ghost">
              {d.common.seeAll} <Arrow />
            </Link>
          }
        />
        <PricingCards items={plans} lang={lang} cta={d.pricing.choose} popular={d.pricing.popular} />
      </section>

      {/* FAQ */}
      <section className="container-x pb-24 md:pb-36">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="meta mb-6 text-muted">— {d.home.faqEyebrow}</p>
            <SplitText lines={["FAQ"]} className="h-section" />
            <Link href={`/${lang}/faq`} className="btn btn-ghost mt-10">
              {d.common.seeAll} <Arrow />
            </Link>
          </div>
          <div className="md:col-span-8">
            <FaqList items={faqTeaser} lang={lang} />
          </div>
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqTeaser, lang)) }} />
      </section>
    </>
  );
}
