import { NextResponse } from "next/server";
import { Resend } from "resend";
import { leadSchema, scoreLead } from "@/lib/lead";
import { clientEmail, teamEmail } from "@/lib/email";

// Простейший rate limit в памяти инстанса (best effort). Для серьёзной защиты — Turnstile / Upstash.
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter((t) => now - t < 10 * 60_000);
  arr.push(now);
  hits.set(ip, arr);
  return arr.length > 8;
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (limited(ip)) return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 });
  }
  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "validation", issues: parsed.error.issues.map((i) => i.path.join(".")) }, { status: 422 });
  }
  const lead = parsed.data;
  if (lead.hp) return NextResponse.json({ ok: true, id: "FB-0" }); // бот

  const d = new Date();
  const id = `FB-${d.toISOString().slice(2, 10).replace(/-/g, "")}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
  const { score, qualified } = scoreLead(lead);
  const record = { id, createdAt: d.toISOString(), score, qualified, ip, ...lead };

  // 1) Лог — всегда (Vercel → Logs). Страховка, чтобы заявка не потерялась ни при каких сбоях.
  console.log("[lead]", JSON.stringify(record));

  const results: Record<string, string> = {};

  // 2) CRM / таблица / Make / Zapier
  if (process.env.CRM_WEBHOOK_URL) {
    try {
      const r = await fetch(process.env.CRM_WEBHOOK_URL, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(record),
      });
      results.webhook = r.ok ? "ok" : `http_${r.status}`;
    } catch (e) {
      results.webhook = "error";
      console.error("[lead] webhook failed", id, e);
    }
  }

  // 3) Email команде + подтверждение клиенту
  if (process.env.RESEND_API_KEY && process.env.LEADS_EMAIL_TO) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const from = process.env.LEADS_EMAIL_FROM || "FORMA BURO <onboarding@resend.dev>";
    try {
      const te = teamEmail(lead, { id, score, qualified });
      const r1 = await resend.emails.send({ from, to: process.env.LEADS_EMAIL_TO.split(",").map((s) => s.trim()), replyTo: lead.email, subject: te.subject, html: te.html });
      results.team = r1.error ? "error" : "ok";
      if (r1.error) console.error("[lead] team email", id, r1.error);
      const ce = clientEmail(lead, id);
      const r2 = await resend.emails.send({ from, to: lead.email, subject: ce.subject, html: ce.html });
      results.client = r2.error ? "error" : "ok";
      if (r2.error) console.error("[lead] client email", id, r2.error);
    } catch (e) {
      results.email = "error";
      console.error("[lead] email failed", id, e);
    }
  } else {
    console.warn("[lead] RESEND_API_KEY / LEADS_EMAIL_TO не заданы — заявка только в логах", id);
  }

  return NextResponse.json({ ok: true, id, score, qualified, results });
}
