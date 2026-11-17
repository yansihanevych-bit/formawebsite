import type { Locale } from "@/lib/i18n";
import { Legal } from "@/components/sections/Legal";
import { site } from "@/content/misc";

export const metadata = { title: "Privacy" };

// TODO: заменить на юридически проверенный текст (iubenda или юрист). Ниже — структура-заглушка по GDPR.
export default async function Page({ params }: PageProps<"/[lang]/privacy">) {
  const lang = (await params).lang as Locale;
  const it = lang === "it";
  return (
    <Legal title={it ? "Informativa privacy" : "Privacy notice"} updated={it ? "Bozza — da validare" : "Draft — to be validated"}>
      <h2>{it ? "Titolare del trattamento" : "Data controller"}</h2>
      <p>FORMA BURO · {site.vat} · {site.address} · {site.email}</p>
      <h2>{it ? "Dati raccolti" : "Data we collect"}</h2>
      <ul>
        <li>{it ? "Dati di contatto inviati tramite il modulo (nome, email, telefono, messenger)." : "Contact data submitted via the form (name, email, phone, messenger)."}</li>
        <li>{it ? "Informazioni sull'immobile e file caricati (planimetrie, foto)." : "Property information and uploaded files (plans, photos)."}</li>
        <li>{it ? "Dati di provenienza della visita (parametri UTM, referrer) per attribuire la richiesta." : "Visit source data (UTM parameters, referrer) to attribute the request."}</li>
        <li>{it ? "Dati di navigazione tramite cookie, solo con consenso." : "Browsing data via cookies, only with consent."}</li>
      </ul>
      <h2>{it ? "Finalità e base giuridica" : "Purposes and legal basis"}</h2>
      <p>{it ? "Rispondere alla richiesta e preparare un preventivo (misure precontrattuali, art. 6.1.b GDPR); marketing solo con consenso (art. 6.1.a)." : "Responding to your request and preparing a quote (pre-contractual measures, Art. 6(1)(b) GDPR); marketing only with consent (Art. 6(1)(a))."}</p>
      <h2>{it ? "Conservazione e destinatari" : "Retention and recipients"}</h2>
      <p>{it ? "I dati sono conservati per il tempo necessario alla gestione della richiesta e trattati da fornitori tecnici (hosting Vercel, email Resend, archiviazione file) nominati responsabili del trattamento." : "Data is kept for as long as needed to handle the request and processed by technical providers (Vercel hosting, Resend email, file storage) acting as processors."}</p>
      <h2>{it ? "Diritti" : "Your rights"}</h2>
      <p>{it ? `Accesso, rettifica, cancellazione, limitazione, portabilità, opposizione e reclamo al Garante. Scrivete a ${site.email}.` : `Access, rectification, erasure, restriction, portability, objection and complaint to the supervisory authority. Write to ${site.email}.`}</p>
    </Legal>
  );
}
