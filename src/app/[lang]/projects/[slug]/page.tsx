import Link from "next/link";
import { notFound } from "next/navigation";
import { locales, t, type Locale } from "@/lib/i18n";
import { getDict } from "@/dictionaries";
import { projectBySlug, projects } from "@/content/projects";
import { segmentById } from "@/content/segments";
import { serviceById } from "@/content/services";
import { Pic } from "@/components/ui/Pic";
import { Reveal } from "@/components/ui/Reveal";
import { ReadMore } from "@/components/ui/ReadMore";
import { Arrow } from "@/components/ui/Arrow";
import { Gallery } from "@/components/sections/Gallery";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { CtaBand } from "@/components/sections/CtaBand";
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
        image: p.gallery.map((g) => sized(g.src, 1600)),
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
      {/* Hero gallery: 3 кадра */}
      <section className="bg-ink pt-24 md:pt-28">
        <div className="grid gap-1 md:h-[78svh] md:grid-cols-12">
          <Pic img={p.hero[0]} priority sizes="(min-width: 768px) 66vw, 100vw" className="aspect-[4/3] md:col-span-8 md:aspect-auto md:h-full" />
          <div className="hidden gap-1 md:col-span-4 md:grid md:grid-rows-2">
            {p.hero.slice(1, 3).map((h) => (
              <Pic key={h.src} img={h} sizes="33vw" className="h-full" />
            ))}
          </div>
        </div>
      </section>

      {/* Head + intro */}
      <section className="container-x py-16 md:py-24">
        <Link href={`/${lang}/projects`} className="eyebrow mb-10 inline-flex items-center gap-3 text-[0.65rem] text-stone hover:text-ink">
          <Arrow dir="left" /> {d.common.back}
        </Link>
        <div className="grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <h1 className="font-display text-[clamp(2.4rem,5vw,5rem)] font-light leading-[1.02]">{t(p.title, lang)}</h1>
            <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-3 text-sm">
              <div>
                <dt className="inline font-semibold">{d.common.location}: </dt>
                <dd className="inline">{p.location}</dd>
              </div>
              <div>
                <dt className="inline font-semibold">{d.common.services}: </dt>
                <dd className="inline">{p.services.map((s) => t(serviceById(s).title, lang)).join(", ")}</dd>
              </div>
            </dl>
            <div className="mt-10 max-w-2xl text-lg leading-relaxed text-ink-2/85">
              <ReadMore labels={{ more: d.common.readMore, less: d.common.readLess }} more={<p className="pt-5">{t(p.more, lang)}</p>}>
                <p>{t(p.intro, lang)}</p>
              </ReadMore>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-4 md:col-start-9">
            <dl className="border-t border-line">
              {facts.map(([k, v]) => (
                <div key={k} className="grid grid-cols-[8rem_1fr] gap-4 border-b border-line py-4 text-sm">
                  <dt className="eyebrow pt-0.5 text-[0.6rem] text-stone">{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* Challenge → Solution → Result */}
      <section className="bg-ink py-20 text-paper md:py-28">
        <div className="container-x">
        <div className="grid gap-px bg-white/10 md:grid-cols-3">
          {(
            [
              [d.projects.challenge, p.challenge],
              [d.projects.solution, p.solution],
              [d.projects.result, p.result],
            ] as const
          ).map(([k, v], i) => (
            <Reveal key={k} delay={i * 0.08} className="bg-ink p-8 md:p-10">
              <p className="eyebrow text-[0.62rem] text-ochre">0{i + 1} · {k}</p>
              <p className="mt-6 font-display text-xl font-light leading-snug md:text-2xl">{t(v, lang)}</p>
            </Reveal>
          ))}
        </div>
        </div>
      </section>

      {/* Before / after */}
      <section className="container-x py-20 md:py-28">
        <Reveal>
          <BeforeAfter before={p.before} after={p.after} labels={{ before: d.common.before, after: d.common.after, drag: d.common.drag }} />
        </Reveal>
      </section>

      {/* Gallery with lightbox */}
      <section className="container-x pb-24 md:pb-32">
        <Reveal>
          <h2 className="mb-10 font-display text-3xl font-light md:mb-14 md:text-5xl">{d.projects.intoTitle}</h2>
        </Reveal>
        <Gallery images={p.gallery} labels={{ enlarge: d.common.enlarge, close: d.common.close, prev: d.common.prev, next: d.common.next }} />
      </section>

      {/* Other projects */}
      <section className="border-t border-line py-20 md:py-28">
        <div className="container-x">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <h2 className="font-display text-3xl font-light md:text-5xl">{d.common.otherProjects}</h2>
            <Link href={`/${lang}/projects`} className="btn btn-ghost">
              {d.common.allProjects} <Arrow />
            </Link>
          </div>
          <div className="grid gap-x-8 gap-y-14 md:grid-cols-3">
            {others.map((o) => (
              <ProjectCard key={o.slug} p={o} lang={lang} ratio="aspect-[4/3]" />
            ))}
          </div>
        </div>
      </section>

      <CtaBand lang={lang} d={d} defaultType={seg.id} title={d.projects.wantSame} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
