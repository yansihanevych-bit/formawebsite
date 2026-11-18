import Link from "next/link";
import type { Metadata } from "next";
import { t, type Locale } from "@/lib/i18n";
import { getDict } from "@/dictionaries";
import { segmentById, type SegmentId } from "@/content/segments";
import { projectBySlug } from "@/content/projects";
import { serviceById } from "@/content/services";
import { faqs, plans } from "@/content/misc";
import { Pic } from "@/components/ui/Pic";
import { Reveal } from "@/components/ui/Reveal";
import { Arrow } from "@/components/ui/Arrow";
import { SectionHead } from "@/components/ui/SectionHead";
import { EditorialCard } from "./Editorial";
import { Process } from "./Process";
import { PricingCards } from "./PricingCards";
import { FaqList, faqJsonLd } from "./FaqList";
import { SegmentTracker } from "./SegmentTracker";
import { pageMeta, sized } from "@/lib/seo";

export function segmentMeta(id: SegmentId, lang: Locale): Metadata {
  const s = segmentById(id);
  return pageMeta(lang, `/${s.slug}`, t(s.title, lang), t(s.lead, lang), sized(s.image.src, 1200));
}

export function SegmentPage({ id, lang }: { id: SegmentId; lang: Locale }) {
  const d = getDict(lang);
  const s = segmentById(id);
  const cases = s.projects.map(projectBySlug).filter((p) => !!p);
  const segFaq = faqs.filter((f) => !f.segments || f.segments.includes(id)).slice(0, 6);
  const segPlans = plans.filter((p) => p.forSegments.includes(id));
  const startHref = `/${lang}/start?type=${id}`;

  return (
    <>
      <SegmentTracker id={id} />
      {/* Hero */}
      <section data-hero-dark className="relative min-h-[88svh] overflow-hidden bg-graphite text-warm">
        <Pic img={s.image} priority sizes="100vw" className="absolute inset-0" imgClassName="opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40" />
        <div className="container-x relative flex min-h-[88svh] flex-col justify-end pb-14 pt-40 md:pb-20">
          <Reveal>
            <p className="eyebrow mb-6 text-warm/75">
              {s.n} · {t(s.label, lang)}
            </p>
            <h1 className="max-w-[16ch] font-display text-[clamp(2.4rem,5.6vw,5.75rem)] font-medium leading-[0.95] tracking-[-0.04em]">{t(s.title, lang)}</h1>
          </Reveal>
          <Reveal delay={0.15} className="mt-10 grid gap-8 md:grid-cols-12 md:items-end">
            <p className="max-w-xl text-lg text-warm/85 md:col-span-6">{t(s.lead, lang)}</p>
            <div className="flex flex-wrap gap-3 md:col-span-6 md:justify-end">
              <Link href={startHref} className="btn btn-light">
                {id === "developers" ? d.segment.b2bCta : d.common.startProject} <Arrow />
              </Link>
              <span className="eyebrow self-center text-warm/70">{t(s.priceFrom, lang)}</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Pains → outcomes */}
      <section className="container-x py-24 md:py-36">
        <div className="grid gap-16 md:grid-cols-12">
          <Reveal className="md:col-span-4">
            <p className="eyebrow mb-8 text-muted">{d.segment.painsTitle}</p>
            <ul className="space-y-5">
              {s.pains.map((p, k) => (
                <li key={k} className="flex gap-4 font-display text-xl font-normal leading-snug text-ink-2/80 line-through decoration-accent/60 decoration-1">
                  {t(p, lang)}
                </li>
              ))}
            </ul>
          </Reveal>
          <div className="md:col-span-7 md:col-start-6">
            <p className="eyebrow mb-8 text-muted">{d.segment.outcomesTitle}</p>
            <div className="border-t border-line">
              {s.outcomes.map((o, k) => (
                <Reveal key={k} delay={k * 0.06} className="grid gap-3 border-b border-line py-8 md:grid-cols-[3rem_1fr_1.2fr]">
                  <span className="font-display text-sm text-accent">0{k + 1}</span>
                  <h3 className="font-display text-2xl font-normal">{t(o.title, lang)}</h3>
                  <p className="text-ink-2/75">{t(o.text, lang)}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Developers: two tracks */}
      {s.tracks && (
        <section className="bg-graphite py-24 text-warm md:py-32">
          <div className="container-x">
            <Reveal>
              <p className="eyebrow mb-5 text-muted">{d.segment.tracksTitle}</p>
            </Reveal>
            <div className="mt-10 grid gap-px bg-white/10 md:grid-cols-2">
              {s.tracks.map((tr, k) => (
                <Reveal key={tr.id} delay={k * 0.1} className="bg-graphite p-8 md:p-14">
                  <p className="font-display text-sm text-accent">0{k + 1}</p>
                  <h3 className="mt-6 font-display text-5xl font-normal md:text-6xl">{t(tr.title, lang)}</h3>
                  <p className="mt-4 text-lg text-warm/75">{t(tr.text, lang)}</p>
                  <ul className="mt-10 space-y-3 border-t border-white/15 pt-6 text-warm/85">
                    {tr.points.map((p, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="text-accent">+</span>
                        {t(p, lang)}
                      </li>
                    ))}
                  </ul>
                  <Link href={`${startHref}&track=${tr.id}`} className="btn btn-light mt-10">
                    {d.segment.b2bCta} <Arrow />
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Cases */}
      <section className="bg-paper-2/60 py-24 md:py-32">
        <div className="container-x">
          <SectionHead
            eyebrow={d.segment.casesTitle}
            title={d.home.featuredTitle}
            aside={
              <Link href={`/${lang}/projects?s=${id}`} className="btn btn-ghost">
                {d.common.allProjects} <Arrow />
              </Link>
            }
          />
          <div className="grid gap-x-8 gap-y-14 md:grid-cols-3">
            {cases.map((p, k) => (
              <Reveal key={p!.slug} delay={k * 0.08}>
                <EditorialCard p={p!} lang={lang} size="narrow" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Services for this segment */}
      <section className="container-x py-24 md:py-32">
        <SectionHead eyebrow={d.segment.servicesTitle} title={d.home.servicesTitle} />
        <div className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
          {s.services.map((sid, k) => {
            const sv = serviceById(sid);
            return (
              <Reveal key={sid} delay={k * 0.05} className="group bg-paper">
                <Pic img={sv.image} sizes="(min-width: 1024px) 33vw, 50vw" className="aspect-[16/10]" imgClassName="transition-transform duration-[1.2s] group-hover:scale-105" />
                <div className="p-7">
                  <p className="eyebrow text-[0.6rem] text-accent">{sv.n} — {t(sv.timing, lang)}</p>
                  <h3 className="mt-4 font-display text-2xl font-normal">{t(sv.title, lang)}</h3>
                  <p className="mt-2 text-sm text-muted">{t(sv.short, lang)}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <Process lang={lang} eyebrow={d.home.processEyebrow} title={d.home.processTitle} />

      <section className="container-x pb-24 md:pb-32">
        <SectionHead eyebrow={d.segment.priceTitle} title={d.home.pricingTitle} />
        <PricingCards items={segPlans} lang={lang} cta={d.pricing.choose} popular={d.pricing.popular} />
      </section>

      <section className="container-x pb-24 md:pb-32">
        <div className="grid gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-4">
            <p className="eyebrow mb-5 text-muted">{d.segment.faqTitle}</p>
            <h2 className="h-section">FAQ</h2>
          </Reveal>
          <div className="md:col-span-8">
            <FaqList items={segFaq} lang={lang} />
          </div>
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(segFaq, lang)) }} />
      </section>
    </>
  );
}
