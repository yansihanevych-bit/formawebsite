import type { Locale } from "@/lib/i18n";
import { Legal } from "@/components/sections/Legal";

export const metadata = { title: "Cookie" };

// TODO: заменить на юридически проверенный текст / iubenda cookie policy.
export default async function Page({ params }: PageProps<"/[lang]/cookies">) {
  const lang = (await params).lang as Locale;
  const x = (it: string, en: string, ru: string) => ({ it, en, ru })[lang];
  return (
    <Legal title={x("Cookie policy", "Cookie policy", "Политика cookie")} updated={x("Bozza — da validare", "Draft — to be validated", "Черновик — требует проверки")}>
      <h2>{x("Cookie tecnici (sempre attivi)", "Technical cookies (always on)", "Технические cookie (всегда включены)")}</h2>
      <ul>
        <li><b>fb_locale</b> — {x("lingua scelta, 12 mesi", "chosen language, 12 months", "выбранный язык, 12 месяцев")}</li>
        <li><b>fb_first / fb_last / fb_segment</b> — {x("provenienza della visita e tipo di cliente, usati solo per gestire la richiesta inviata, 90 giorni", "visit source and client type, used only to handle your request, 90 days", "источник визита и тип клиента — только для обработки заявки, 90 дней")}</li>
        <li><b>fb_consent_v1, fb_theme</b> (localStorage) — {x("preferenze su cookie e tema", "cookie and theme preferences", "настройки cookie и темы")}</li>
      </ul>
      <h2>{x("Analisi (con consenso)", "Analytics (with consent)", "Аналитика (с согласия)")}</h2>
      <p>Google Analytics 4 {x("tramite Google Tag Manager, con IP anonimizzato.", "via Google Tag Manager, with IP anonymisation.", "через Google Tag Manager, с анонимизацией IP.")}</p>
      <h2>{x("Marketing (con consenso)", "Marketing (with consent)", "Маркетинг (с согласия)")}</h2>
      <p>Google Ads, Meta Pixel — {x("misurazione delle conversioni e remarketing.", "conversion measurement and remarketing.", "измерение конверсий и ремаркетинг.")}</p>
      <h2>{x("Gestire il consenso", "Managing consent", "Управление согласием")}</h2>
      <p>
        {x("Potete modificare le preferenze in qualsiasi momento: ", "You can change your preferences at any time: ", "Изменить настройки можно в любой момент: ")}
        <button type="button" data-open-consent className="underline underline-offset-4">{x("apri preferenze", "open preferences", "открыть настройки")}</button>.
      </p>
    </Legal>
  );
}
