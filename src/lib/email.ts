import type { Lead } from "./lead";

const esc = (s: unknown) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const row = (k: string, v: unknown) =>
  v === undefined || v === "" || v === null
    ? ""
    : `<tr><td style="padding:8px 12px;border-bottom:1px solid #e5e1da;color:#85807a;font-size:12px;text-transform:uppercase;letter-spacing:.08em;vertical-align:top;white-space:nowrap">${esc(k)}</td><td style="padding:8px 12px;border-bottom:1px solid #e5e1da;font-size:14px">${v}</td></tr>`;

export function teamEmail(l: Lead, meta: { id: string; score: number; qualified: boolean }) {
  const a = l.attribution?.last || {};
  const f = l.attribution?.first || {};
  const src = (t: typeof a) => [t?.utm_source, t?.utm_medium, t?.utm_campaign].filter(Boolean).join(" / ") || (t?.gclid ? "google (gclid)" : t?.fbclid ? "meta (fbclid)" : t?.referrer || "direct");
  const subject = `${meta.qualified ? "🔥 " : ""}Nuova richiesta ${meta.id} · ${l.clientType} · ${l.area} m² · ${l.city || l.country}`;
  const html = `
  <div style="font-family:Arial,sans-serif;color:#151515;max-width:680px">
    <h2 style="font-weight:300;font-size:24px;margin:0 0 4px">Nuova richiesta ${esc(meta.id)}</h2>
    <p style="margin:0 0 20px;color:#85807a">Score: <b style="color:${meta.qualified ? "#b4683f" : "#151515"}">${meta.score}/100 ${meta.qualified ? "· qualified" : ""}</b></p>
    <table style="border-collapse:collapse;width:100%">
      ${row("Cliente", esc(l.clientType))}
      ${row("Nome", esc(l.name))}
      ${row("Azienda", esc(l.company))}
      ${row("Email", `<a href="mailto:${esc(l.email)}">${esc(l.email)}</a>`)}
      ${row("Telefono", esc(l.phone))}
      ${row("Messenger", esc([l.messenger, l.messengerHandle].filter(Boolean).join(": ")))}
      ${row("Lingua", esc(l.language))}
      ${row("Paese / città", esc([l.country, l.city].filter(Boolean).join(", ")))}
      ${row("Immobile", esc(`${l.propertyType} · ${l.area} m² · ${l.condition}`))}
      ${row("Servizi", esc(l.services.join(", ")))}
      ${row("Piano / track", esc([l.plan, l.track].filter(Boolean).join(" / ")))}
      ${row("Tempi", esc(l.deadline))}
      ${row("Budget", esc(l.budget))}
      ${row("Commento", esc(l.comment).replace(/\n/g, "<br>"))}
      ${l.answers.map((x) => row(x.q, esc(x.a))).join("")}
      ${row("File", l.files.map((x) => `<a href="${esc(x.url)}">${esc(x.name)}</a> (${Math.round(x.size / 1024)} KB)`).join("<br>") || "—")}
      ${row("Fonte (last)", esc(src(a)))}
      ${row("Fonte (first)", esc(src(f)))}
      ${row("Landing", esc(f?.landing))}
      ${row("Pagina form", esc(l.page))}
      ${row("Marketing", l.marketing ? "sì" : "no")}
    </table>
  </div>`;
  return { subject, html };
}

export function clientEmail(l: Lead, id: string) {
  const it = l.language === "it";
  const subject = it ? `Abbiamo ricevuto la vostra richiesta (${id}) — FORMA BURO` : `We've received your request (${id}) — FORMA BURO`;
  const html = `
  <div style="font-family:Arial,sans-serif;color:#151515;max-width:560px;line-height:1.6">
    <p style="letter-spacing:.3em;font-size:11px;text-transform:uppercase;color:#85807a">FORMA BURO · Architecture</p>
    <h2 style="font-weight:300;font-size:26px">${it ? `Grazie, ${esc(l.name.split(" ")[0])}.` : `Thank you, ${esc(l.name.split(" ")[0])}.`}</h2>
    <p>${it ? "Abbiamo ricevuto la vostra richiesta e i file allegati." : "We've received your request and attached files."}</p>
    <p>${it ? "<b>Cosa succede ora:</b> entro 24 ore lavorative vi inviamo un preventivo fisso con tempi di consegna. Se servono altre informazioni vi contatteremo." : "<b>What happens next:</b> within 24 working hours we'll send you a fixed quote with delivery times. If we need more information we'll get in touch."}</p>
    <p style="color:#85807a;font-size:13px">${it ? "Riferimento" : "Reference"}: ${esc(id)}</p>
  </div>`;
  return { subject, html };
}
