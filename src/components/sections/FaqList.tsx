import type { Faq } from "@/content/misc";
import { t, type Locale } from "@/lib/i18n";
import { FaqAccordion } from "./FaqAccordion";

export function FaqList({ items, lang }: { items: Faq[]; lang: Locale }) {
  return <FaqAccordion items={items.map((f) => ({ q: t(f.q, lang), a: t(f.a, lang) }))} />;
}

export function faqJsonLd(items: Faq[], lang: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({ "@type": "Question", name: t(f.q, lang), acceptedAnswer: { "@type": "Answer", text: t(f.a, lang) } })),
  };
}
