import type { Locale } from "@/lib/i18n";
import { getDict } from "@/dictionaries";
import { faqs } from "@/content/misc";
import { PageIntro } from "@/components/sections/PageIntro";
import { FaqList, faqJsonLd } from "@/components/sections/FaqList";
import { pageMeta } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]/faq">) {
  const lang = (await params).lang as Locale;
  const d = getDict(lang);
  return pageMeta(lang, "/faq", d.faq.title, d.faq.lead);
}

export default async function Page({ params }: PageProps<"/[lang]/faq">) {
  const lang = (await params).lang as Locale;
  const d = getDict(lang);
  return (
    <>
      <PageIntro eyebrow="FAQ" title={d.faq.title} lead={d.faq.lead} />
      <section className="container-x pb-28 md:pb-40">
        <div className="md:ml-[33%]">
          <FaqList items={faqs} lang={lang} />
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs, lang)) }} />
      </section>
    </>
  );
}
