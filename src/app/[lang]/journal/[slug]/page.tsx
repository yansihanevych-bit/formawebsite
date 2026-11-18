import Link from "next/link";
import { notFound } from "next/navigation";
import { locales, t, type Locale } from "@/lib/i18n";
import { getDict } from "@/dictionaries";
import { articleBySlug, articles } from "@/content/journal";
import { site } from "@/content/misc";
import { MaskImage } from "@/components/ui/MaskImage";
import { SplitText } from "@/components/ui/SplitText";
import { Arrow } from "@/components/ui/Arrow";
import { pageMeta, sized } from "@/lib/seo";
import { fmtDate } from "@/lib/date";

export function generateStaticParams() {
  return locales.flatMap((lang) => articles.map((a) => ({ lang, slug: a.slug })));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/[lang]/journal/[slug]">) {
  const { lang, slug } = await params;
  const a = articleBySlug(slug);
  if (!a) return {};
  const l = lang as Locale;
  return pageMeta(l, `/journal/${slug}`, t(a.title, l), t(a.excerpt, l), sized(a.cover.src, 1200));
}

export default async function Page({ params }: PageProps<"/[lang]/journal/[slug]">) {
  const { lang: raw, slug } = await params;
  const lang = raw as Locale;
  const a = articleBySlug(slug);
  if (!a) notFound();
  const d = getDict(lang);
  const more = articles.filter((x) => x.slug !== slug).slice(0, 2);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: t(a.title, lang),
    description: t(a.excerpt, lang),
    datePublished: a.date,
    image: sized(a.cover.src, 1920),
    inLanguage: lang,
    author: { "@type": "Organization", name: "FORMA BURO" },
    publisher: { "@type": "Organization", name: "FORMA BURO", logo: { "@type": "ImageObject", url: `${site.url}/brand/full-ink.svg` } },
  };
  return (
    <article className="pb-24 pt-40 md:pt-52">
      <div className="container-x">
        <Link href={`/${lang}/journal`} className="meta mb-10 inline-flex items-center gap-3 text-muted hover:text-ink">
          <Arrow dir="left" /> {d.journal.back}
        </Link>
        <p className="meta text-accent">{t(a.tag, lang)} · {fmtDate(a.date, lang)} · {a.minutes} {d.journal.min}</p>
        <SplitText as="h1" lines={[t(a.title, lang)]} onMount delay={0.1} className="mt-6 max-w-[20ch] font-display text-[clamp(2.4rem,5vw,5rem)] font-medium leading-[0.98] tracking-[-0.04em]" />
        <p className="mt-8 max-w-2xl text-xl text-muted">{t(a.excerpt, lang)}</p>
      </div>
      <div className="container-x mt-14">
        <MaskImage img={a.cover} priority sizes="(min-width: 768px) 92vw, 100vw" className="aspect-[16/9] md:aspect-[21/9]" />
      </div>
      <div className="container-x mt-16 grid md:grid-cols-12">
        <div className="space-y-6 text-lg leading-relaxed md:col-span-7 md:col-start-4">
          {a.body.map((p, k) => (
            <p key={k} className={k === 0 ? "first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-6xl first-letter:font-medium first-letter:leading-none" : ""}>
              {t(p, lang)}
            </p>
          ))}
          <div className="!mt-14 border-t border-ink pt-8">
            <Link href={`/${lang}/start`} className="btn btn-solid">{d.common.startProject} <Arrow /></Link>
          </div>
        </div>
      </div>
      <div className="container-x mt-24 border-t border-line pt-10">
        <p className="meta mb-8 text-muted">— {d.journal.more}</p>
        <div className="grid gap-8 md:grid-cols-2">
          {more.map((m) => (
            <Link key={m.slug} href={`/${lang}/journal/${m.slug}`} className="group flex items-baseline justify-between gap-6 border-b border-line pb-6">
              <span className="font-display text-2xl font-medium tracking-tight transition-transform duration-500 group-hover:translate-x-2">{t(m.title, lang)}</span>
              <Arrow className="shrink-0" />
            </Link>
          ))}
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </article>
  );
}
