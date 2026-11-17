import Link from "next/link";
import type { Metadata } from "next";
import { hasLocale, t, type Locale } from "@/lib/i18n";
import { getDict } from "@/dictionaries";
import { IMG } from "@/content/images";
import { segments } from "@/content/segments";
import { projects } from "@/content/projects";
import { services } from "@/content/services";
import { plans, faqs, site } from "@/content/misc";
import { Hero } from "@/components/sections/Hero";
import { SegmentList } from "@/components/sections/SegmentList";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { ServicesAlt } from "@/components/sections/ServicesAlt";
import { Process } from "@/components/sections/Process";
import { PricingCards } from "@/components/sections/PricingCards";
import { FaqList, faqJsonLd } from "@/components/sections/FaqList";
import { CtaBand } from "@/components/sections/CtaBand";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/ui/Reveal";
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
  const featured = projects.filter((p) => p.featured).slice(0, 4);
  const faqTeaser = faqs.slice(0, 5);

  return (
    <>
      <Hero
        slides={[IMG.villaPool, IMG.living2, IMG.houseDusk, IMG.living7]}
        eyebrow={d.home.eyebrow}
        lines={[d.home.h1a, d.home.h1b, d.home.h1c]}
        sub={d.home.sub}
        primary={{ label: d.common.startProject, href: `/${lang}/start` }}
        secondary={{ label: d.common.viewProjects, href: `/${lang}/projects` }}
        scroll={d.home.scroll}
        towns={site.towns}
      />

      {/* Stats */}
      <section className="border-b border-line">
        <div className="container-x grid grid-cols-2 gap-y-10 py-14 md:grid-cols-4 md:py-20">
          {d.home.stats.map((s, k) => (
            <Reveal key={k} delay={k * 0.06} className="pr-4">
              <p className="font-display text-4xl font-light md:text-5xl">{s.v}</p>
              <p className="mt-2 text-sm text-stone">{s.l}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Segments */}
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

      {/* Featured projects */}
      <section className="bg-paper-2/60 py-24 md:py-36">
        <div className="container-x">
          <SectionHead
            eyebrow={d.home.featuredEyebrow}
            title={d.home.featuredTitle}
            aside={
              <Link href={`/${lang}/projects`} className="btn btn-ghost">
                {d.common.allProjects} <Arrow />
              </Link>
            }
          />
          <div className="grid gap-x-8 gap-y-16 md:grid-cols-12">
            {featured.map((p, k) => (
              <Reveal
                key={p.slug}
                delay={(k % 2) * 0.1}
                className={k % 4 === 0 ? "md:col-span-7" : k % 4 === 1 ? "md:col-span-5 md:mt-32" : k % 4 === 2 ? "md:col-span-5" : "md:col-span-7 md:-mt-24"}
              >
                <ProjectCard
                  p={p}
                  lang={lang}
                  ratio={k % 4 === 0 || k % 4 === 3 ? "aspect-[4/3]" : "aspect-[4/5]"}
                  sizes="(min-width: 768px) 55vw, 100vw"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Before / after */}
      <section className="container-x py-24 md:py-36">
        <div className="mb-12 grid gap-8 md:mb-16 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <p className="eyebrow mb-5 text-stone">{d.home.baEyebrow}</p>
            <h2 className="h-section max-w-[20ch]">{d.home.baTitle}</h2>
          </Reveal>
          <Reveal delay={0.1} className="self-end md:col-span-4 md:col-start-9">
            <p className="text-ink-2/80">{d.home.baText}</p>
          </Reveal>
        </div>
        <Reveal>
          <BeforeAfter before={IMG.plans} after={IMG.living7} labels={{ before: d.common.before, after: d.common.after, drag: d.common.drag }} />
        </Reveal>
      </section>

      {/* Services */}
      <section className="container-x pb-24 md:pb-36">
        <SectionHead eyebrow={d.home.servicesEyebrow} title={d.home.servicesTitle} />
        <ServicesAlt items={services} lang={lang} />
      </section>

      {/* Why */}
      <section className="bg-ink py-24 text-paper md:py-36">
        <div className="container-x">
          <Reveal>
            <p className="eyebrow mb-5 text-stone">{d.home.whyEyebrow}</p>
            <h2 className="h-section max-w-[16ch]">{d.home.whyTitle}</h2>
          </Reveal>
          <div className="mt-16 grid gap-px bg-white/10 md:mt-24 md:grid-cols-2 lg:grid-cols-4">
            {d.home.why.map((w, k) => (
              <Reveal key={k} delay={k * 0.06} className="bg-ink p-8 md:p-10">
                <span className="font-display text-sm text-ochre">0{k + 1}</span>
                <h3 className="mt-10 font-display text-2xl font-light">{w.t}</h3>
                <p className="mt-3 text-sm text-paper/65">{w.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="container-x py-24 md:py-36">
        <SectionHead eyebrow={d.home.processEyebrow} title={d.home.processTitle} />
        <Process lang={lang} />
      </section>

      {/* Pricing */}
      <section className="container-x pb-24 md:pb-36">
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
          <Reveal className="md:col-span-4">
            <p className="eyebrow mb-5 text-stone">{d.home.faqEyebrow}</p>
            <h2 className="h-section">FAQ</h2>
            <Link href={`/${lang}/faq`} className="btn btn-ghost mt-10">
              {d.common.seeAll} <Arrow />
            </Link>
          </Reveal>
          <div className="md:col-span-8">
            <FaqList items={faqTeaser} lang={lang} />
          </div>
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqTeaser, lang)) }} />
      </section>

      <CtaBand lang={lang} d={d} />
    </>
  );
}
