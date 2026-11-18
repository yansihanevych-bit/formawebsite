import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { t as tr } from "@/lib/i18n";
import type { Dict } from "@/dictionaries";
import { segments } from "@/content/segments";
import { site } from "@/content/misc";
import { SplitText } from "@/components/ui/SplitText";
import { FooterForm } from "@/components/form/FooterForm";
import { Magnetic } from "@/components/ui/Magnetic";
import { BigWordmark } from "./BigWordmark";

export function Footer({ lang, d }: { lang: Locale; d: Dict }) {
  const year = new Date().getFullYear();
  return (
    <>
      {/* Финальный экран: большая выразительная секция контакта на терракоте */}
      <section id="contact" data-tone="rosso" className="relative scroll-mt-24 overflow-hidden bg-rosso text-warm">
        <div className="container-x pb-20 pt-28 md:pb-28 md:pt-40">
          <p className="meta mb-10 flex items-center gap-3 text-warm/70">
            <span className="whitespace-nowrap">[ + ]</span>
            {d.home.eyebrow}
          </p>
          <SplitText lines={[d.home.finalA]} className="h-display !text-[clamp(2.3rem,8vw,9rem)] !leading-[0.9]" />
          <SplitText lines={[d.home.finalB]} delay={0.2} className="h-display text-outline !text-[clamp(2.3rem,8vw,9rem)] !leading-[0.9] [--outline:var(--color-warm)] md:pl-[10vw]" />

          <div className="mt-16 grid gap-14 md:mt-24 lg:grid-cols-12">
            <div className="flex flex-col gap-10 lg:col-span-5">
              <p className="max-w-md text-lg text-warm/85">{d.home.ctaText}</p>
              <div className="flex flex-wrap items-center gap-8">
                <Magnetic>
                  <Link
                    href={`/${lang}/start`}
                    data-cursor="Explore"
                    className="group flex h-36 w-36 flex-col items-center justify-center gap-2 rounded-full bg-warm text-center text-graphite transition-transform duration-500 hover:scale-105 md:h-44 md:w-44"
                  >
                    <span className="text-xl transition-transform duration-500 group-hover:rotate-45" aria-hidden>↗</span>
                    <span className="meta max-w-[9ch] leading-tight">{d.common.startProject}</span>
                  </Link>
                </Magnetic>
                <div className="space-y-2">
                  <a href={`mailto:${site.email}`} className="link-u block font-display text-[clamp(1.1rem,2vw,1.6rem)]">
                    {site.email}
                  </a>
                  <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener" className="meta link-u inline-block text-warm/80">
                    WhatsApp
                  </a>
                  <span className="meta text-warm/50"> · </span>
                  <a href={`https://t.me/${site.telegram}`} target="_blank" rel="noopener" className="meta link-u inline-block text-warm/80">
                    Telegram
                  </a>
                </div>
              </div>
            </div>
            <div className="border border-warm/25 p-6 md:p-10 lg:col-span-6 lg:col-start-7">
              <p className="meta mb-6 text-warm/70">— {d.ff.title}</p>
              <FooterForm lang={lang} t={d.ff} filesT={d.form} email={site.email} />
            </div>
          </div>
        </div>
      </section>

      {/* Футер: контрастный и минималистичный */}
      <footer data-tone="walnut" className="relative overflow-hidden bg-[#1c140e] text-warm">
      <div className="container-x pb-10 pt-16 md:pt-20">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/full-white.svg" alt="FORMA BURO Architecture" className="w-44 md:w-56" loading="lazy" />
            <p className="eyebrow mt-8 text-stone">{d.footer.tagline}</p>
            <p className="mt-2 text-sm text-warm/60">{site.towns.join(" · ")}</p>
          </div>
          <div className="md:col-span-2">
            <p className="eyebrow mb-5 text-stone">{d.nav.forWhom}</p>
            <ul className="space-y-2 text-sm">
              {segments.map((s) => (
                <li key={s.id}>
                  <Link href={`/${lang}/${s.slug}`} className="link-u">{tr(s.label, lang)}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-2">
            <p className="eyebrow mb-5 text-stone">{d.nav.studio}</p>
            <ul className="space-y-2 text-sm">
              <li><Link href={`/${lang}/projects`} className="link-u">{d.nav.projects}</Link></li>
              <li><Link href={`/${lang}/studio`} className="link-u">{d.nav.studioPage}</Link></li>
              <li><Link href={`/${lang}/journal`} className="link-u">{d.nav.journal}</Link></li>
              <li><Link href={`/${lang}/contact`} className="link-u">{d.nav.contact}</Link></li>
              <li><Link href={`/${lang}/films`} className="link-u">{d.nav.films}</Link></li>
              <li><Link href={`/${lang}/pricing`} className="link-u">{d.nav.pricing}</Link></li>
              <li><Link href={`/${lang}/calculator`} className="link-u">{d.nav.calculator}</Link></li>
              <li><Link href={`/${lang}/faq`} className="link-u">{d.nav.faq}</Link></li>
              <li><Link href={`/${lang}/start`} className="link-u">{d.nav.start}</Link></li>
            </ul>
          </div>
          <div className="md:col-span-3">
            <p className="eyebrow mb-5 text-stone">{d.footer.contacts}</p>
            <ul className="space-y-2 text-sm">
              <li><a href={`mailto:${site.email}`} className="link-u">{site.email}</a></li>
              <li><a href={`tel:${site.phone.replace(/\s/g, "")}`} className="link-u">{site.phone}</a></li>
              <li><a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener" className="link-u">WhatsApp</a> · <a href={`https://t.me/${site.telegram}`} target="_blank" rel="noopener" className="link-u">Telegram</a> · <a href={site.instagram} target="_blank" rel="noopener" className="link-u">Instagram</a></li>
              <li className="text-warm/60">{site.address}</li>
            </ul>
          </div>
        </div>
        <div className="mt-20 flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-6 text-xs text-warm/50">
          <span>© {year} FORMA BURO · {site.vat} · {d.footer.rights}</span>
          <span className="flex gap-6">
            <Link href={`/${lang}/privacy`} className="link-u">{d.footer.privacy}</Link>
            <Link href={`/${lang}/cookies`} className="link-u">{d.footer.cookies}</Link>
            <button type="button" data-open-consent className="link-u">{d.cookie.settings}</button>
          </span>
        </div>
      </div>
      <BigWordmark />
      </footer>
    </>
  );
}
