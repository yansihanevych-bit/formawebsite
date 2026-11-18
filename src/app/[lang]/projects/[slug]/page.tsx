import Link from "next/link";
import { notFound } from "next/navigation";
import { locales, t, type Locale } from "@/lib/i18n";
import { getDict } from "@/dictionaries";
import { projectBySlug, projects } from "@/content/projects";
import { segmentById } from "@/content/segments";
import { serviceById } from "@/content/services";
import { MaskImage } from "@/components/ui/MaskImage";
import { SplitText } from "@/components/ui/SplitText";
import { CaseSection } from "@/components/sections/CaseSection";
import { ProjectIcon } from "@/components/ui/ProjectIcon";
import { Reveal } from "@/components/ui/Reveal";
import { ReadMore } from "@/components/ui/ReadMore";
import { Arrow } from "@/components/ui/Arrow";
import { Gallery } from "@/components/sections/Gallery";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { EditorialCard } from "@/components/sections/Editorial";
import { pageMeta, sized } from "@/lib/seo";
import { site } from "@/content/misc";

export function generateStaticParams() {
  return locales.flatMap((lang) => projects.map((p) => ({ lang, slug: p.slug })));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/[lang]/projects/[slug]">) {
  const { lang, slug } = await params;
  const p = projectBySlug(slug);
  if (!p) return {};
  const l = lang as Locale;
  return pageMeta(l, `/projects/${slug}`, `${t(p.title, l)}, ${p.location}`, t(p.intro, l), sized(p.cover.src, 1200));
}

export default async function ProjectPage({ params }: PageProps<"/[lang]/projects/[slug]">) {
  const { lang: raw, slug } = await params;
  const lang = raw as Locale;
  const p = projectBySlug(slug);
  if (!p) notFound();
  const d = getDict(lang);
  const idx = projects.indexOf(p);
  const others = [1, 2, 3].map((k) => projects[(idx + k) % projects.length]);
  const seg = segmentById(p.segments[0]);

  const facts: [string, string][] = [
    [d.common.location, p.location],
    [d.common.type, t(p.propertyType, lang)],
    [d.common.area, `${p.area.toLocaleString(lang)} m²`],
    [d.common.turnaround, t(p.turnaround, lang)],
    [d.common.segment, p.segments.map((s) => t(segmentById(s).label, lang)).join(", ")],
    [d.common.year, String(p.year)],
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        name: t(p.title, lang),
        about: t(p.intro, lang),
        locationCreated: { "@type": "Place", name: `${p.location}, Liguria` },
        creator: { "@type": "Organization", name: "FORMA BURO" },
        image: p.gallery.map((g) => sized(g.src, 1920)),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "FORMA BURO", item: `${site.url}/${lang}` },
          { "@type": "ListItem", position: 2, name: d.projects.title, item: `${site.url}/${lang}/projects` },
          { "@type": "ListItem", position: 3, name: t(p.title, lang) },
        ],
      },
    ],
  };

  return (
    <>
      {/* Hero: крупное фото с mask reveal + заголовок */}
      <section data-hero-dark className="relative h-[86svh] min-h-[560px] overflow-hidden bg-graphite text-warm">
        <MaskImage img={p.hero[0]} priority sizes="100vw" quality={85} className="absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/40" />
        <div className="container-x relative flex h-full flex-col justify-end pb-10 md:pb-14">
          <Link href={`/${lang}/projects`} className="meta mb-8 inline-flex items-center gap-3 text-warm/70 hover:text-warm">
            <Arrow dir="left" /> {d.common.back}
          </Link>
          <div className="mb-5 flex items-center gap-4">
            <ProjectIcon slug={p.slug} className="h-10 w-10 text-warm" />
            <p className="meta text-warm/70">— {p.location} · {t(p.propertyType, lang)} · {p.status === "completed" ? d.explorer.completed : d.explorer.inProgress}</p>
          </div>
          <SplitText as="h1" lines={[t(p.title, lang)]} onMount delay={0.4} className="h-display max-w-[16ch] normal-case" />
          <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-white/20 pt-6 md:grid-cols-6">
            {facts.map(([k, v]) => (
              <div key={k}>
                <dt className="meta text-warm/55">{k}</dt>
                <dd className="mt-1 text-sm">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 01 — Исходное состояние и задача */}
      <CaseSection n="01" title={d.projects.s1}>
        <div className="grid gap-10 md:grid-cols-12">
          <div className="text-lg leading-relaxed text-ink-2 md:col-span-6">
            <ReadMore labels={{ more: d.common.readMore, less: d.common.readLess }} more={<p className="pt-5 text-muted">{t(p.more, lang)}</p>}>
              <p>{t(p.intro, lang)}</p>
            </ReadMore>
            <div className="mt-10 border-t border-ink pt-5">
              <p className="meta text-accent">{d.projects.challenge}</p>
              <p className="mt-3 font-display text-2xl font-medium leading-snug tracking-tight">{t(p.challenge, lang)}</p>
            </div>
          </div>
          <MaskImage img={p.gallery[2] ?? p.cover} sizes="(min-width: 768px) 45vw, 100vw" className="aspect-[4/3] md:col-span-5 md:col-start-8" />
        </div>
      </CaseSection>

      {/* 02 — Архитектурная концепция */}
      <CaseSection n="02" title={d.projects.s2} dark>
        <div className="grid gap-10 md:grid-cols-12">
          <MaskImage img={p.hero[1] ?? p.after} sizes="(min-width: 768px) 58vw, 100vw" className="aspect-[16/11] md:col-span-7" />
          <div className="md:col-span-4 md:col-start-9 md:self-end">
            <p className="meta text-stone">{d.projects.solution}</p>
            <p className="mt-4 font-display text-2xl font-medium leading-snug tracking-tight md:text-3xl">{t(p.solution, lang)}</p>
          </div>
        </div>
      </CaseSection>

      {/* 03 — Планировка и ключевые решения */}
      <CaseSection n="03" title={d.projects.s3}>
        <div className="grid gap-10 md:grid-cols-12">
          <MaskImage img={p.before} sizes="(min-width: 768px) 50vw, 100vw" className="aspect-[16/10] md:col-span-6" />
          <ol className="border-t border-ink md:col-span-5 md:col-start-8">
            {p.decisions.map((x, k) => (
              <Reveal as="li" key={k} delay={k * 0.08} className="grid grid-cols-[3rem_1fr] gap-4 border-b border-line py-6">
                <span className="meta pt-1.5 text-accent">0{k + 1}</span>
                <span className="font-display text-xl font-medium leading-snug tracking-tight md:text-2xl">{t(x, lang)}</span>
              </Reveal>
            ))}
          </ol>
        </div>
      </CaseSection>

      {/* 04 — 3D-визуализация */}
      <CaseSection n="04" title={d.projects.s4}>
        <Gallery images={p.gallery} labels={{ enlarge: d.common.enlarge, close: d.common.close, prev: d.common.prev, next: d.common.next }} />
      </CaseSection>

      {/* 05 — Before / After */}
      <CaseSection n="05" title={d.projects.s5}>
        <BeforeAfter before={p.before} after={p.after} labels={{ before: d.common.before, after: d.common.after, drag: d.common.drag }} />
      </CaseSection>

      {/* 06 — Результат и состав работ */}
      <CaseSection n="06" title={d.projects.s6}>
        <div className="grid gap-10 md:grid-cols-12">
          <p className="font-display text-[clamp(1.8rem,3.2vw,3rem)] font-medium leading-[1.05] tracking-tight md:col-span-7">{t(p.result, lang)}</p>
          <div className="md:col-span-4 md:col-start-9">
            <p className="meta mb-3 text-muted">— {d.projects.scope}</p>
            <ul className="border-t border-ink">
              {p.services.map((sv) => (
                <li key={sv} className="flex items-baseline justify-between gap-4 border-b border-line py-3">
                  <span>{t(serviceById(sv).title, lang)}</span>
                  <span className="meta text-muted">{t(serviceById(sv).timing, lang)}</span>
                </li>
              ))}
            </ul>
            <Link href={`/${lang}/start?type=${seg.id}`} className="btn btn-solid mt-8">
              {d.common.startProject} <Arrow />
            </Link>
          </div>
        </div>
      </CaseSection>

      {/* Other projects */}
      <section className="border-t border-line py-20 md:py-28">
        <div className="container-x">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <h2 className="h-section">{d.common.otherProjects}</h2>
            <Link href={`/${lang}/projects`} className="btn btn-ghost">
              {d.common.allProjects} <Arrow />
            </Link>
          </div>
          <div className="grid gap-x-8 gap-y-14 md:grid-cols-3">
            {others.map((o) => (
              <EditorialCard key={o.slug} p={o} lang={lang} size="half" />
            ))}
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
