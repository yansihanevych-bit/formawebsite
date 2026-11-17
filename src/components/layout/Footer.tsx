import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { t as tr } from "@/lib/i18n";
import type { Dict } from "@/dictionaries";
import { segments } from "@/content/segments";
import { site } from "@/content/misc";

export function Footer({ lang, d }: { lang: Locale; d: Dict }) {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ink text-paper">
      <div className="container-x pb-10 pt-20 md:pt-28">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/full-white.svg" alt="FORMA BURO Architecture" className="w-56 md:w-72" loading="lazy" />
            <p className="eyebrow mt-8 text-stone">{d.footer.tagline}</p>
            <p className="mt-2 text-sm text-paper/60">{site.towns.join(" · ")}</p>
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
              <li><Link href={`/${lang}/films`} className="link-u">{d.nav.films}</Link></li>
              <li><Link href={`/${lang}/pricing`} className="link-u">{d.nav.pricing}</Link></li>
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
              <li className="text-paper/60">{site.address}</li>
            </ul>
          </div>
        </div>
        <div className="mt-20 flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-6 text-xs text-paper/50">
          <span>© {year} FORMA BURO · {site.vat} · {d.footer.rights}</span>
          <span className="flex gap-6">
            <Link href={`/${lang}/privacy`} className="link-u">{d.footer.privacy}</Link>
            <Link href={`/${lang}/cookies`} className="link-u">{d.footer.cookies}</Link>
            <button type="button" data-open-consent className="link-u">{d.cookie.settings}</button>
          </span>
        </div>
      </div>
    </footer>
  );
}
