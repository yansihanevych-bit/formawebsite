import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import { hasLocale, locales, ogLocale, t as tr, type Locale } from "@/lib/i18n";
import { getDict } from "@/dictionaries";
import { Header, type NavItem } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ToneController } from "@/components/ui/ToneController";
import { Preloader } from "@/components/layout/Preloader";
import { ConsentDefaults, ConsentManager } from "@/components/analytics/Consent";
import { preloaderInitScript, themeInitScript } from "@/lib/theme";
import { segments } from "@/content/segments";
import { site } from "@/content/misc";
import { alternates, sized } from "@/lib/seo";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const d = getDict(lang);
  return {
    metadataBase: new URL(site.url),
    title: { default: d.meta.title, template: "%s — FORMA BURO" },
    description: d.meta.description,
    alternates: alternates(lang),
    openGraph: { siteName: "FORMA BURO", type: "website", locale: ogLocale[lang] },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f2f0ea" },
    { media: "(prefers-color-scheme: dark)", color: "#111312" },
  ],
};

export default async function LangLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang: raw } = await params;
  if (!hasLocale(raw)) notFound();
  const lang = raw as Locale;
  const d = getDict(lang);

  const forWhom: NavItem[] = segments.map((s) => ({
    n: s.n,
    label: tr(s.label, lang),
    href: `/${lang}/${s.slug}`,
    img: sized(s.image.src, 1200),
  }));
  const studio: NavItem[] = [
    { n: "06", label: d.nav.projects, href: `/${lang}/projects` },
    { n: "07", label: d.nav.studioPage, href: `/${lang}/studio` },
    { n: "08", label: d.nav.films, href: `/${lang}/films` },
    { n: "09", label: d.nav.pricing, href: `/${lang}/pricing` },
    { n: "10", label: d.nav.calculator, href: `/${lang}/calculator` },
    { n: "11", label: d.nav.journal, href: `/${lang}/journal` },
    { n: "12", label: d.nav.faq, href: `/${lang}/faq` },
    { n: "13", label: d.nav.contact, href: `/${lang}/contact` },
    { n: "14", label: d.nav.start, href: `/${lang}/start` },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "FORMA BURO",
    url: site.url,
    logo: `${site.url}/brand/full-ink.svg`,
    email: site.email,
    telephone: site.phone,
    description: d.meta.description,
    areaServed: site.towns.map((n) => ({ "@type": "City", name: n })),
    address: { "@type": "PostalAddress", addressRegion: "Liguria", addressCountry: "IT" },
  };

  return (
    <html lang={lang} className="h-full" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript + preloaderInitScript }} />
        <ConsentDefaults />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="flex min-h-full flex-col">
        <SmoothScroll />
        <CustomCursor />
        <ToneController />
        <Preloader />
        <Header
          lang={lang}
          t={d.nav}
          forWhom={forWhom}
          studio={studio}
          announce={d.home.announce}
          main={[
            { n: "01", label: d.nav.projects, href: `/${lang}/projects` },
            { n: "02", label: d.nav.studioPage, href: `/${lang}/studio` },
            { n: "03", label: d.nav.pricing, href: `/${lang}/pricing` },
            { n: "04", label: d.nav.calculator, href: `/${lang}/calculator` },
          ]}
          contact={{ email: site.email, phone: site.phone, whatsapp: site.whatsapp, area: d.footer.area }}
        />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer lang={lang} d={d} />
        <ConsentManager t={d.cookie} lang={lang} gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
      </body>
    </html>
  );
}
