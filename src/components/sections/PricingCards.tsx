import Link from "next/link";
import type { Plan } from "@/content/misc";
import { t, type Locale } from "@/lib/i18n";
import { Reveal } from "@/components/ui/Reveal";
import { Arrow } from "@/components/ui/Arrow";
import { DrawLine } from "@/components/ui/DrawLine";
import { Corners } from "@/components/ui/Corners";

/** Pricing без тяжёлых карточек: тонкие разделители, цена — главный элемент */
export function PricingCards({ items, lang, cta, popular }: { items: Plan[]; lang: Locale; cta: string; popular: string }) {
  const cols = items.length >= 4 ? "xl:grid-cols-4" : items.length === 3 ? "xl:grid-cols-3" : "xl:grid-cols-2";
  return (
    <>
    <DrawLine strong />
    <div className={`grid md:grid-cols-2 ${cols}`}>
      {items.map((p, k) => (
        <Reveal
          key={p.id}
          delay={k * 0.06}
          className={`group relative flex flex-col border-b border-line px-0 py-10 transition-colors duration-500 md:px-8 md:[&:not(:first-child)]:border-l ${
            p.highlight ? "bg-concrete/45" : "hover:bg-concrete/25"
          }`}
        >
          <Corners className="hidden md:block" />
          <div className="flex min-h-10 items-start justify-between gap-3">
            <h3 className="meta">{t(p.name, lang)}</h3>
            {p.highlight && <span className="meta text-accent">— {popular}</span>}
          </div>
          <p className="mt-10 font-display text-[clamp(2.6rem,4vw,4rem)] font-medium leading-none tracking-tight">{t(p.price, lang)}</p>
          <p className="mt-3 text-sm text-muted">{t(p.note, lang)}</p>
          <ul className="mt-10 flex-1 text-sm">
            {p.features.map((f, i) => (
              <li key={i} className="border-t border-line py-3">
                {t(f, lang)}
              </li>
            ))}
          </ul>
          <Link href={`/${lang}/start?plan=${p.id}`} className="meta mt-8 inline-flex items-center justify-between gap-3 border-t border-ink pt-4">
            {cta}
            <Arrow className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </Reveal>
      ))}
    </div>
    </>
  );
}
