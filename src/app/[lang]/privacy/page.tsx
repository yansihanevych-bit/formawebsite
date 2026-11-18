import { pick, type Locale } from "@/lib/i18n";
import { Legal } from "@/components/sections/Legal";
import { site } from "@/content/misc";

export const metadata = { title: "Privacy" };

// TODO: заменить на юридически проверенный текст (iubenda или юрист). Ниже — структура-заглушка по GDPR.
export default async function Page({ params }: PageProps<"/[lang]/privacy">) {
  const lang = (await params).lang as Locale;
  const x = (it: string, en: string, ru: string) => pick(lang as Locale, it, en, ru);
  return (
    <Legal title={x("Informativa privacy", "Privacy notice", "Политика конфиденциальности")} updated={x("Bozza — da validare", "Draft — to be validated", "Черновик — требует проверки")}>
      <h2>{x("Titolare del trattamento", "Data controller", "Оператор данных")}</h2>
      <p>FORMA BURO · {site.vat} · {site.address} · {site.email}</p>
      <h2>{x("Dati raccolti", "Data we collect", "Какие данные мы собираем")}</h2>
      <ul>
        <li>{x("Dati di contatto inviati tramite il modulo (nome, email, telefono, messenger).", "Contact data submitted via the form (name, email, phone, messenger).", "Контактные данные из формы (имя, email, телефон, мессенджер).")}</li>
        <li>{x("Informazioni sull'immobile e file caricati (planimetrie, foto).", "Property information and uploaded files (plans, photos).", "Информация об объекте и загруженные файлы (планы, фото).")}</li>
        <li>{x("Dati di provenienza della visita (parametri UTM, referrer) per attribuire la richiesta.", "Visit source data (UTM parameters, referrer) to attribute the request.", "Источник визита (UTM-метки, referrer) — чтобы понимать, откуда пришла заявка.")}</li>
        <li>{x("Dati di navigazione tramite cookie, solo con consenso.", "Browsing data via cookies, only with consent.", "Данные о посещении через cookie — только с согласия.")}</li>
      </ul>
      <h2>{x("Finalità e base giuridica", "Purposes and legal basis", "Цели и правовое основание")}</h2>
      <p>{x("Rispondere alla richiesta e preparare un preventivo (misure precontrattuali, art. 6.1.b GDPR); marketing solo con consenso (art. 6.1.a).", "Responding to your request and preparing a quote (pre-contractual measures, Art. 6(1)(b) GDPR); marketing only with consent (Art. 6(1)(a)).", "Ответ на заявку и подготовка предложения (преддоговорные меры, ст. 6.1.b GDPR); маркетинг — только с согласия (ст. 6.1.a).")}</p>
      <h2>{x("Conservazione e destinatari", "Retention and recipients", "Хранение и получатели")}</h2>
      <p>{x("I dati sono conservati per il tempo necessario alla gestione della richiesta e trattati da fornitori tecnici (hosting Vercel, email Resend, archiviazione file) nominati responsabili del trattamento.", "Data is kept for as long as needed to handle the request and processed by technical providers (Vercel hosting, Resend email, file storage) acting as processors.", "Данные хранятся, пока это нужно для обработки заявки, и обрабатываются техническими подрядчиками (хостинг Vercel, почта Resend, хранилище файлов) как обработчиками данных.")}</p>
      <h2>{x("Diritti", "Your rights", "Ваши права")}</h2>
      <p>{x(`Accesso, rettifica, cancellazione, limitazione, portabilità, opposizione e reclamo al Garante. Scrivete a ${site.email}.`, `Access, rectification, erasure, restriction, portability, objection and complaint to the supervisory authority. Write to ${site.email}.`, `Доступ, исправление, удаление, ограничение, переносимость, возражение и жалоба в надзорный орган (Garante). Пишите на ${site.email}.`)}</p>
    </Legal>
  );
}
