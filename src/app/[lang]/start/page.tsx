import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import { getDict, segmentQuestions } from "@/dictionaries";
import { segments } from "@/content/segments";
import { services } from "@/content/services";
import { site } from "@/content/misc";
import { IMG } from "@/content/images";
import { LeadForm } from "@/components/form/LeadForm";
import { Pic } from "@/components/ui/Pic";
import { pageMeta } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]/start">) {
  const lang = (await params).lang as Locale;
  const d = getDict(lang);
  return pageMeta(lang, "/start", d.form.title, d.form.lead);
}

export default async function Page({ params }: PageProps<"/[lang]/start">) {
  const lang = (await params).lang as Locale;
  const d = getDict(lang);
  return (
    <section className="grid min-h-svh lg:grid-cols-12">
      <aside className="relative hidden bg-ink text-paper lg:col-span-4 lg:block">
        <div className="sticky top-0 h-svh">
          <Pic img={IMG.plans} className="absolute inset-0 opacity-40" sizes="33vw" />
          <div className="relative flex h-full flex-col justify-end p-12">
            <p className="eyebrow mb-6 text-paper/60">FORMA BURO</p>
            <ol className="space-y-3 font-display text-lg font-light text-paper/85">
              {d.form.steps.map((s, k) => (
                <li key={s} className="flex gap-4">
                  <span className="w-6 text-sm text-ochre">0{k + 1}</span>
                  {s}
                </li>
              ))}
            </ol>
            <p className="mt-10 text-sm text-paper/60">{d.home.ctaText}</p>
          </div>
        </div>
      </aside>
      <div className="container-x pb-24 pt-36 md:pt-44 lg:col-span-8 lg:max-w-none lg:px-16 xl:px-24">
        <p className="eyebrow mb-6 text-stone">{d.nav.start}</p>
        <h1 className="font-display text-[clamp(2.4rem,5vw,4.75rem)] font-light leading-[1.02]">{d.form.title}</h1>
        <p className="mb-14 mt-6 max-w-xl text-ink-2/80">{d.form.lead}</p>
        <LeadForm
          lang={lang}
          t={d.form}
          clientTypes={segments.map((s) => ({ id: s.id, label: t(s.label, lang) }))}
          services={services.map((s) => ({ id: s.id, label: t(s.title, lang) }))}
          questions={segmentQuestions}
          contactEmail={site.email}
        />
      </div>
    </section>
  );
}
