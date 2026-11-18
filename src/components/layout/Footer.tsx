import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { t as tr } from "@/lib/i18n";
import type { Dict } from "@/dictionaries";
import { segments } from "@/content/segments";
import { site } from "@/content/misc";
import { SplitText } from "@/components/ui/SplitText";
import { Arrow } from "@/components/ui/Arrow";
import { FooterForm } from "@/components/form/FooterForm";
import { Magnetic } from "@/components/ui/Magnetic";
import { BigWordmark } from "./BigWordmark";

export function Footer({ lang, d }: { lang: Locale; d: Dict }) {
  const year = new Date().getFullYear();
  return (
    <footer data-tone="walnut" className="relative overflow-hidden bg-graphite text-warm">
      {/* Финальный экран: крупный контактный блок + форма заявки */}
      <section id="contact" className="container-x scroll-mt-24 border-b border-white/15 pb-20 pt-28 md:pb-28 md:pt-40">
        <p className="meta mb-10 flex items-center gap-3 text-stone">
          <span className="whitespace-nowrap text-accent">[ + ]</span>
          Liguria, Italy · Architecture & visualisation
        </p>
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SplitText lines={[d.home.finalA]} className="h-display !text-[clamp(1.9rem,4.6vw,4.75rem)]" />
            <SplitText lines={[d.home.finalB]} delay={0.2} className="h-display !text-[clamp(1.9rem,4.6vw,4.75rem)] text-stone" />
            <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-6">
              <Magnetic>
                <Link href={`/${lang}/start`} className="btn btn-light">
                  {d.common.startProject} <Arrow />
                </Link>
              </Magnetic>
              <a href={`mailto:${site.email}`} className="link-u font-display text-xl font-medium">
                {site.email}
              </a>
            </div>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <p className="meta mb-6 text-warm/60">— {d.ff.title}</p>
            <FooterForm lang={lang} t={d.ff} filesT={d.form} email={site.email} />
          </div>
        </div>
      </section>

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
  );
}
