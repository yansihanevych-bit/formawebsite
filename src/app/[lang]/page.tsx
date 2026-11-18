import Link from "next/link";
import type { Metadata } from "next";
import { hasLocale, t, type Locale } from "@/lib/i18n";
import { getDict } from "@/dictionaries";
import { IMG } from "@/content/images";
import { segments } from "@/content/segments";
import { projects } from "@/content/projects";
import { services, serviceById } from "@/content/services";
import { plans, faqs } from "@/content/misc";
import { studio } from "@/content/studio";
import { Hero } from "@/components/sections/Hero";
import { SegmentList } from "@/components/sections/SegmentList";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { PortfolioRail, type RailItem } from "@/components/sections/PortfolioRail";
import { Manifesto } from "@/components/sections/Manifesto";
import { Founder } from "@/components/sections/Founder";
import { ServicesList } from "@/components/sections/ServicesList";
import { Process } from "@/components/sections/Process";
import { PricingCards } from "@/components/sections/PricingCards";
import { FaqList, faqJsonLd } from "@/components/sections/FaqList";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";
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
  const faqTeaser = faqs.slice(0, 5);

  const rail: RailItem[] = projects.map((p) => ({
    slug: p.slug,
    href: `/${lang}/projects/${p.slug}`,
    title: t(p.title, lang),
    location: p.location,
    type: t(p.propertyType, lang).split("·")[0].trim(),
    year: p.year,
    area: p.area,
    services: p.services.map((s) => t(serviceById(s).title, lang)).join(" · "),
    img: p.cover,
    imgAlt: p.gallery[1],
  }));
  const heroSet = ["attico-porto-vecchio", "villa-mare-bordighera", "appartamento-corso-imperatrice"].map((slug) => projects.find((p) => p.slug === slug)!);

  return (
    <>
      <Hero
        images={heroSet.map((p) => p.cover)}
        captions={heroSet.map((p) => `${t(p.title, lang)} · ${p.location}`)}
        eyebrow={d.home.eyebrow}
        lines={[d.home.h1a, d.home.h1b]}
        sub={d.home.sub}
        primary={{ label: d.common.startProject, href: `/${lang}/start` }}
        secondary={{ label: d.common.viewProjects, href: `/${lang}/projects` }}
        scroll={d.home.scroll}
        meta={[
          { k: "Concept", v: "48–72h" },
          { k: d.home.langs, v: "IT·EN·RU" },
        ]}
      />

      <Manifesto
        lineA={d.home.manifestoA}
        lineB={d.home.manifestoB}
        manifestoTitle={d.home.manifestoTitle}
        manifesto={t(studio.manifesto, lang)}
        intro={t(studio.intro, lang)}
        numbers={studio.numbers.map((n) => ({ v: n.v, l: t(n.l, lang) }))}
        image={IMG.closeEames}
        image2={IMG.kitchen1}
        more={{ label: d.nav.studioPage, href: `/${lang}/studio` }}
      />

      <Founder c={d.home.about} ctaHref={`/${lang}/start`} />

      <PortfolioRail items={rail} eyebrow={d.home.featuredEyebrow} title={d.home.featuredTitle} allLabel={d.common.allProjects} allHref={`/${lang}/projects`} />

      {/* Для кого */}
      <section data-tone="sand" className="py-24 md:py-36">
        <div className="container-x">
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
        </div>
      </section>

      {/* От чертежа к рендеру: шторка следует за прокруткой */}
      <section data-tone="milk" className="py-24 md:py-36">
        <div className="container-x">
          <div className="mb-12 grid gap-8 md:mb-16 md:grid-cols-12">
            <div className="md:col-span-8">
              <p className="meta mb-6 flex items-center gap-3 text-muted">
                <span className="text-accent">+</span> {d.home.baEyebrow}
              </p>
              <SplitText lines={[d.home.baTitle]} className="h-section max-w-[22ch]" />
            </div>
            <Reveal delay={0.1} className="self-end md:col-span-4">
              <p className="text-muted">{d.home.baText}</p>
            </Reveal>
          </div>
          <BeforeAfter scrub before={IMG.plans} after={IMG.living5} labels={{ before: d.common.before, after: d.common.after, drag: d.common.drag }} />
        </div>
      </section>

      {/* Услуги + почему мы */}
      <section id="services" data-tone="olive" className="scroll-mt-24 py-24 md:py-36">
        <div className="container-x">
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
          <div className="mt-28 grid gap-px md:mt-40 md:grid-cols-2 lg:grid-cols-4">
            {d.home.why.map((w, k) => (
              <Reveal key={k} delay={k * 0.06} className={`border-t border-ink/40 py-8 lg:pr-8 ${k ? "lg:border-l lg:pl-8" : ""}`}>
                <span className="h-numeral text-outline text-5xl">{String(k + 1).padStart(2, "0")}</span>
                <h3 className="mt-8 font-display text-lg uppercase leading-tight">{w.t}</h3>
                <p className="mt-3 text-sm text-muted">{w.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Process lang={lang} eyebrow={d.home.processEyebrow} title={d.home.processTitle} tone="sand" />

      <CalcCta lang={lang} t={d.calcCta} />

      {/* Цены + вопросы */}
      <section data-tone="milk" className="py-24 md:py-36">
        <div className="container-x">
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

          <div className="mt-28 grid gap-10 md:mt-40 md:grid-cols-12">
            <div className="md:col-span-4">
              <p className="meta mb-6 flex items-center gap-3 text-muted">
                <span className="text-accent">+</span> {d.home.faqEyebrow}
              </p>
              <SplitText lines={["FAQ"]} className="h-display" />
              <Link href={`/${lang}/faq`} className="btn btn-ghost mt-10">
                {d.common.seeAll} <Arrow />
              </Link>
            </div>
            <div className="md:col-span-8">
              <FaqList items={faqTeaser} lang={lang} />
            </div>
          </div>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqTeaser, lang)) }} />
        </div>
      </section>
    </>
  );
}
