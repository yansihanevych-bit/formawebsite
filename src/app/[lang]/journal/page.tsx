import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import { getDict } from "@/dictionaries";
import { articles } from "@/content/journal";
import { PageIntro } from "@/components/sections/PageIntro";
import { MaskImage } from "@/components/ui/MaskImage";
import { pageMeta } from "@/lib/seo";
import { fmtDate } from "@/lib/date";

export async function generateMetadata({ params }: PageProps<"/[lang]/journal">) {
  const lang = (await params).lang as Locale;
  const d = getDict(lang);
  return pageMeta(lang, "/journal", d.journal.title, d.journal.lead);
}

export default async function Page({ params }: PageProps<"/[lang]/journal">) {
  const lang = (await params).lang as Locale;
  const d = getDict(lang);
  const [first, ...rest] = articles;
  return (
    <>
      <PageIntro eyebrow={d.nav.journal} title={d.journal.title} lead={d.journal.lead} />
      <section className="container-x pb-28 md:pb-40">
        <Link href={`/${lang}/journal/${first.slug}`} className="group grid gap-8 border-t border-ink pt-8 md:grid-cols-12">
          <MaskImage img={first.cover} sizes="(min-width: 768px) 58vw, 100vw" className="aspect-[16/10] md:col-span-7" imgClassName="transition-transform duration-[1.2s] group-hover:scale-[1.03]" />
          <div className="md:col-span-5 md:self-end">
            <p className="meta text-accent">{t(first.tag, lang)} · {fmtDate(first.date, lang)} · {first.minutes} {d.journal.min}</p>
            <h2 className="mt-4 font-display text-[clamp(2rem,3.4vw,3.25rem)] font-medium leading-[1.02] tracking-tight">{t(first.title, lang)}</h2>
            <p className="mt-4 text-lg text-muted">{t(first.excerpt, lang)}</p>
            <span className="meta mt-6 inline-block border-b border-ink pb-1">{d.journal.read} →</span>
          </div>
        </Link>
        <div className="mt-16 grid gap-x-8 gap-y-14 md:grid-cols-2">
          {rest.map((a) => (
            <Link key={a.slug} href={`/${lang}/journal/${a.slug}`} className="group block border-t border-line pt-6">
              <MaskImage img={a.cover} sizes="(min-width: 768px) 45vw, 100vw" className="aspect-[16/10]" imgClassName="transition-transform duration-[1.2s] group-hover:scale-[1.03]" />
              <p className="meta mt-5 text-accent">{t(a.tag, lang)} · {fmtDate(a.date, lang)}</p>
              <h3 className="mt-3 font-display text-2xl font-medium tracking-tight md:text-3xl">{t(a.title, lang)}</h3>
              <p className="mt-3 text-muted">{t(a.excerpt, lang)}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
