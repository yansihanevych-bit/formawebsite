import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import { getDict } from "@/dictionaries";
import { films } from "@/content/misc";
import { Pic } from "@/components/ui/Pic";
import { Reveal } from "@/components/ui/Reveal";
import { PageIntro } from "@/components/sections/PageIntro";
import { CtaBand } from "@/components/sections/CtaBand";
import { pageMeta } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]/films">) {
  const lang = (await params).lang as Locale;
  const d = getDict(lang);
  return pageMeta(lang, "/films", d.films.title, d.films.lead);
}

export default async function Page({ params }: PageProps<"/[lang]/films">) {
  const lang = (await params).lang as Locale;
  const d = getDict(lang);
  return (
    <>
      <PageIntro eyebrow="Films" title={d.films.title} lead={d.films.lead} />
      <section className="container-x grid gap-x-8 gap-y-16 pb-28 md:grid-cols-2 md:pb-40">
        {films.map((f, k) => (
          <Reveal key={k} delay={(k % 2) * 0.1} className={k % 2 ? "md:mt-24" : ""}>
            {/* TODO: заменить постер на <video> / Mux, когда будут ролики (поле videoUrl) */}
            <div className="group relative aspect-video overflow-hidden bg-ink">
              <Pic img={f.poster} sizes="(min-width: 768px) 50vw, 100vw" className="absolute inset-0" imgClassName="opacity-85 transition-transform duration-[1.4s] group-hover:scale-105" />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-20 w-20 items-center justify-center rounded-full border border-paper/70 text-paper backdrop-blur-sm transition group-hover:bg-paper group-hover:text-ink">
                  <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6" fill="currentColor" aria-hidden><path d="M7 4l13 8-13 8z" /></svg>
                </span>
              </span>
              <span className="eyebrow absolute bottom-4 right-4 bg-ink/80 px-2 py-1 text-[0.58rem] text-paper">{f.duration}</span>
              {!f.videoUrl && <span className="eyebrow absolute left-4 top-4 bg-paper/90 px-2 py-1 text-[0.55rem]">{d.films.soon}</span>}
            </div>
            <h2 className="mt-5 font-display text-2xl font-light">{t(f.title, lang)}</h2>
            <p className="mt-1 text-sm text-stone">{t(f.text, lang)}</p>
          </Reveal>
        ))}
      </section>
      <CtaBand lang={lang} d={d} defaultType="developers" />
    </>
  );
}
