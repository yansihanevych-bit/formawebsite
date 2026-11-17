import type { Service } from "@/content/services";
import { t, type Locale } from "@/lib/i18n";
import { Pic } from "@/components/ui/Pic";
import { Reveal } from "@/components/ui/Reveal";

export function ServicesAlt({ items, lang }: { items: Service[]; lang: Locale }) {
  return (
    <div className="space-y-20 md:space-y-32">
      {items.map((s, k) => (
        <div key={s.id} className="grid items-center gap-8 md:grid-cols-12 md:gap-12">
          <Reveal className={`md:col-span-7 ${k % 2 ? "md:order-2" : ""}`}>
            <Pic img={s.image} sizes="(min-width: 768px) 58vw, 100vw" className="aspect-[4/3]" />
          </Reveal>
          <Reveal delay={0.1} className={`md:col-span-5 ${k % 2 ? "md:order-1 md:pr-8" : "md:pl-8"}`}>
            <p className="eyebrow mb-6 text-accent">{s.n} — {t(s.timing, lang)}</p>
            <h3 className="font-display text-[clamp(1.8rem,3vw,3rem)] font-normal leading-tight">{t(s.title, lang)}</h3>
            <p className="mt-3 font-display text-lg font-normal text-muted">{t(s.short, lang)}</p>
            <p className="mt-6 text-ink-2/85">{t(s.body, lang)}</p>
            <ul className="mt-8 border-t border-line">
              {s.includes.map((x, i) => (
                <li key={i} className="flex gap-4 border-b border-line py-3 text-sm">
                  <span className="text-muted">—</span>
                  {t(x, lang)}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      ))}
    </div>
  );
}
