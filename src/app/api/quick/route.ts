import { NextResponse } from "next/server";
import { quickSchema, type Quick } from "@/lib/quick";
import { deliver, newLeadId, rateLimited } from "@/lib/deliver";

const esc = (s: unknown) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
const row = (k: string, v: string) => (v ? `<tr><td style="padding:8px 12px;border-bottom:1px solid #e5e1da;color:#7c806f;font-size:12px;text-transform:uppercase;letter-spacing:.08em;white-space:nowrap;vertical-align:top">${esc(k)}</td><td style="padding:8px 12px;border-bottom:1px solid #e5e1da;font-size:14px">${v}</td></tr>` : "");

function team(q: Quick, id: string) {
  const a = q.attribution?.last || {};
  const src = [a.utm_source, a.utm_medium, a.utm_campaign].filter(Boolean).join(" / ") || (a.gclid ? "google (gclid)" : a.fbclid ? "meta (fbclid)" : a.referrer || "direct");
  const c = q.calc;
  const subject = `${q.kind === "calculator" ? "🧮 Calcolatore" : "✉️ Footer"} ${id} · ${q.name}${c ? ` · € ${c.low}–${c.high}` : ""}`;
  const html = `<div style="font-family:Arial,sans-serif;color:#171918;max-width:680px"><h2 style="font-weight:400">${esc(subject)}</h2><table style="border-collapse:collapse;width:100%">
    ${row("Nome", esc(q.name))}${row("Telefono", esc(q.phone))}${row("Email", esc(q.email))}${row("Lingua", esc(q.language))}${row("Budget", esc(q.budget))}
    ${row("Messaggio", esc(q.message).replace(/\n/g, "<br>"))}
    ${c ? row("Calcolo", esc(`${c.role} · ${c.property} · ${c.area} m² · ${c.deliverables.join(", ")} (render: ${c.renderQty}) → € ${c.low}–${c.high}, ${c.daysMin}–${c.daysMax} gg${c.onRequest ? " · su preventivo" : ""}`)) : ""}
    ${row("File", q.files.map((f) => `<a href="${esc(f.url)}">${esc(f.name)}</a> (${Math.round(f.size / 1024)} KB)`).join("<br>"))}
    ${row("Fonte", esc(src))}${row("Pagina", esc(q.page))}
  </table></div>`;
  return { subject, html };
}

function client(q: Quick, id: string) {
  const x = (it: string, en: string, ru: string) => ({ it, en, ru })[q.language];
  const c = q.calc;
  const subject = x(`Richiesta ricevuta (${id}) — FORMA BURO`, `Request received (${id}) — FORMA BURO`, `Заявка получена (${id}) — FORMA BURO`);
  const html = `<div style="font-family:Arial,sans-serif;color:#171918;max-width:560px;line-height:1.6">
    <p style="letter-spacing:.3em;font-size:11px;text-transform:uppercase;color:#9c5235">FORMA BURO · Architecture</p>
    <h2 style="font-weight:400">${x("Grazie", "Thank you", "Спасибо")}, ${esc(q.name.split(" ")[0])}.</h2>
    ${c ? `<p>${x("Stima indicativa", "Indicative estimate", "Ориентировочная стоимость")}: <b>€ ${c.low} – € ${c.high}</b>, ${c.daysMin}–${c.daysMax} ${x("giorni", "days", "дней")}.</p>` : ""}
    <p>${x("Entro 24 ore lavorative vi inviamo un preventivo dettagliato.", "Within 24 working hours we'll send you a detailed quote.", "В течение 24 рабочих часов пришлём подробное предложение.")}</p>
    <p style="color:#7c806f;font-size:13px">${x("Riferimento", "Reference", "Номер заявки")}: ${esc(id)}</p></div>`;
  return { subject, html };
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 });
  }
  const parsed = quickSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ ok: false, error: "validation", issues: parsed.error.issues.map((i) => i.path.join(".")) }, { status: 422 });
  const q = parsed.data;
  if (q.hp) return NextResponse.json({ ok: true, id: "FB-0" });
  const id = newLeadId();
  const record = { id, createdAt: new Date().toISOString(), ip, ...q };
  const results = await deliver(record, team(q, id), q.email ? { to: q.email, mail: client(q, id) } : undefined, q.email || undefined);
  return NextResponse.json({ ok: true, id, results });
}
