import Link from "next/link";
import type { Plan } from "@/content/misc";
import { t, type Locale } from "@/lib/i18n";
import { Reveal } from "@/components/ui/Reveal";

export function PricingCards({ items, lang, cta, popular }: { items: Plan[]; lang: Locale; cta: string; popular: string }) {
  return (
    <div className="grid gap-px bg-line md:grid-cols-2 xl:grid-cols-4">
      {items.map((p, k) => (
        <Reveal key={p.id} delay={k * 0.06} className={`flex flex-col p-7 md:p-9 ${p.highlight ? "bg-ink text-paper" : "bg-paper"}`}>
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display text-xl font-normal">{t(p.name, lang)}</h3>
            {p.highlight && <span className="eyebrow bg-ochre px-2 py-1 text-[0.55rem] text-paper">{popular}</span>}
          </div>
          <p className="mt-8 font-display text-4xl font-light">{t(p.price, lang)}</p>
          <p className={`mt-2 text-sm ${p.highlight ? "text-paper/60" : "text-stone"}`}>{t(p.note, lang)}</p>
          <ul className={`mt-8 flex-1 space-y-3 border-t pt-6 text-sm ${p.highlight ? "border-white/15" : "border-line"}`}>
            {p.features.map((f, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-ochre">+</span>
                {t(f, lang)}
              </li>
            ))}
          </ul>
          <Link href={`/${lang}/start?plan=${p.id}`} className={`btn mt-10 justify-center ${p.highlight ? "btn-light" : "btn-ghost"}`}>
            {cta}
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
