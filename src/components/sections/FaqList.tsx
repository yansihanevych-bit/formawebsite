import type { Faq } from "@/content/misc";
import { t, type Locale } from "@/lib/i18n";

export function FaqList({ items, lang }: { items: Faq[]; lang: Locale }) {
  return (
    <div className="border-t border-line">
      {items.map((f, k) => (
        <details key={k} className="group border-b border-line">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 font-display text-lg font-light md:text-2xl [&::-webkit-details-marker]:hidden">
            {t(f.q, lang)}
            <span className="relative h-4 w-4 shrink-0" aria-hidden>
              <span className="absolute left-0 top-1/2 h-px w-full bg-current" />
              <span className="absolute left-1/2 top-0 h-full w-px bg-current transition-transform duration-300 group-open:rotate-90" />
            </span>
          </summary>
          <p className="max-w-3xl pb-7 text-ink-2/80">{t(f.a, lang)}</p>
        </details>
      ))}
    </div>
  );
}

export function faqJsonLd(items: Faq[], lang: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({ "@type": "Question", name: t(f.q, lang), acceptedAnswer: { "@type": "Answer", text: t(f.a, lang) } })),
  };
}
