import type { Locale } from "@/lib/i18n";
import { Legal } from "@/components/sections/Legal";

export const metadata = { title: "Cookie" };

// TODO: заменить на юридически проверенный текст / iubenda cookie policy.
export default async function Page({ params }: PageProps<"/[lang]/cookies">) {
  const lang = (await params).lang as Locale;
  const it = lang === "it";
  return (
    <Legal title="Cookie policy" updated={it ? "Bozza — da validare" : "Draft — to be validated"}>
      <h2>{it ? "Cookie tecnici (sempre attivi)" : "Technical cookies (always on)"}</h2>
      <ul>
        <li><b>fb_locale</b> — {it ? "lingua scelta, 12 mesi" : "chosen language, 12 months"}</li>
        <li><b>fb_first / fb_last / fb_segment</b> — {it ? "provenienza della visita e tipo di cliente, usati solo per gestire la richiesta inviata, 90 giorni" : "visit source and client type, used only to handle your request, 90 days"}</li>
        <li><b>fb_consent_v1</b> (localStorage) — {it ? "le vostre preferenze sui cookie" : "your cookie preferences"}</li>
      </ul>
      <h2>{it ? "Analisi (con consenso)" : "Analytics (with consent)"}</h2>
      <p>Google Analytics 4 {it ? "tramite Google Tag Manager, con IP anonimizzato." : "via Google Tag Manager, with IP anonymisation."}</p>
      <h2>{it ? "Marketing (con consenso)" : "Marketing (with consent)"}</h2>
      <p>Google Ads, Meta Pixel — {it ? "misurazione delle conversioni e remarketing." : "conversion measurement and remarketing."}</p>
      <h2>{it ? "Gestire il consenso" : "Managing consent"}</h2>
      <p>
        {it ? "Potete modificare le preferenze in qualsiasi momento: " : "You can change your preferences at any time: "}
        <button type="button" data-open-consent className="underline underline-offset-4">{it ? "apri preferenze" : "open preferences"}</button>.
      </p>
    </Legal>
  );
}
