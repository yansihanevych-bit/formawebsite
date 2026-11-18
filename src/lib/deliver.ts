import { Resend } from "resend";

type Mail = { subject: string; html: string };

/**
 * Доставка заявки: лог (всегда) → webhook CRM (если задан) → письма (если задан Resend).
 * Лог в Vercel — страховка, чтобы заявка не потерялась ни при каких сбоях.
 */
export async function deliver(record: Record<string, unknown> & { id: string }, team: Mail, client?: { to: string; mail: Mail }, replyTo?: string) {
  console.log("[lead]", JSON.stringify(record));
  const results: Record<string, string> = {};

  if (process.env.CRM_WEBHOOK_URL) {
    try {
      const r = await fetch(process.env.CRM_WEBHOOK_URL, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(record) });
      results.webhook = r.ok ? "ok" : `http_${r.status}`;
    } catch (e) {
      results.webhook = "error";
      console.error("[lead] webhook failed", record.id, e);
    }
  }

  if (process.env.RESEND_API_KEY && process.env.LEADS_EMAIL_TO) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const from = process.env.LEADS_EMAIL_FROM || "FORMA BURO <onboarding@resend.dev>";
    try {
      const r1 = await resend.emails.send({ from, to: process.env.LEADS_EMAIL_TO.split(",").map((s) => s.trim()), replyTo, subject: team.subject, html: team.html });
      results.team = r1.error ? "error" : "ok";
      if (r1.error) console.error("[lead] team email", record.id, r1.error);
      if (client) {
        const r2 = await resend.emails.send({ from, to: client.to, subject: client.mail.subject, html: client.mail.html });
        results.client = r2.error ? "error" : "ok";
      }
    } catch (e) {
      results.email = "error";
      console.error("[lead] email failed", record.id, e);
    }
  } else {
    console.warn("[lead] RESEND_API_KEY / LEADS_EMAIL_TO не заданы — заявка только в логах", record.id);
  }
  return results;
}

const hits = new Map<string, number[]>();
/** Простейший rate limit в памяти инстанса (best effort) */
export function rateLimited(ip: string, max = 8) {
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter((t) => now - t < 10 * 60_000);
  arr.push(now);
  hits.set(ip, arr);
  return arr.length > max;
}

export const newLeadId = () => `FB-${new Date().toISOString().slice(2, 10).replace(/-/g, "")}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
