import type { Locale } from "@/lib/i18n";
import { getDict } from "@/dictionaries";
import { plans, faqs } from "@/content/misc";
import { PageIntro } from "@/components/sections/PageIntro";
import { PricingCards } from "@/components/sections/PricingCards";
import { FaqList } from "@/components/sections/FaqList";
import { Process } from "@/components/sections/Process";
import { SectionHead } from "@/components/ui/SectionHead";
import { CtaBand } from "@/components/sections/CtaBand";
import { pageMeta } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]/pricing">) {
  const lang = (await params).lang as Locale;
  const d = getDict(lang);
  return pageMeta(lang, "/pricing", d.pricing.title, d.pricing.lead);
}

export default async function Page({ params }: PageProps<"/[lang]/pricing">) {
  const lang = (await params).lang as Locale;
  const d = getDict(lang);
  return (
    <>
      <PageIntro eyebrow={d.home.pricingEyebrow} title={d.pricing.title} lead={d.pricing.lead} />
      <section className="container-x pb-24 md:pb-32">
        <PricingCards items={plans} lang={lang} cta={d.pricing.choose} popular={d.pricing.popular} />
      </section>
      <section className="container-x pb-24 md:pb-32">
        <SectionHead eyebrow={d.home.processEyebrow} title={d.home.processTitle} />
        <Process lang={lang} />
      </section>
      <section className="container-x pb-24 md:pb-32">
        <FaqList items={faqs.filter((_, k) => [1, 4, 6].includes(k))} lang={lang} />
      </section>
      <CtaBand lang={lang} d={d} />
    </>
  );
}
