import type { Locale } from "@/lib/i18n";
import { getDict } from "@/dictionaries";
import { site } from "@/content/misc";
import { PageIntro } from "@/components/sections/PageIntro";
import { Calculator } from "@/components/form/Calculator";
import { pageMeta } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]/calculator">) {
  const lang = (await params).lang as Locale;
  const d = getDict(lang);
  return pageMeta(lang, "/calculator", d.calc.title, d.calc.lead);
}

export default async function Page({ params }: PageProps<"/[lang]/calculator">) {
  const lang = (await params).lang as Locale;
  const d = getDict(lang);
  return (
    <>
      <PageIntro eyebrow={d.nav.calculator} title={d.calc.title} lead={d.calc.lead} />
      <section className="container-x pb-28 md:pb-40 md:pl-[calc(clamp(1.25rem,4vw,4rem)+1.5rem)]">
        <Calculator lang={lang} t={d.calc} ff={d.ff} formT={d.form} email={site.email} />
      </section>
    </>
  );
}
