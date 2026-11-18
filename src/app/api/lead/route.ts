import { NextResponse } from "next/server";
import { leadSchema, scoreLead } from "@/lib/lead";
import { clientEmail, teamEmail } from "@/lib/email";
import { deliver, newLeadId, rateLimited } from "@/lib/deliver";

/** Полная заявка из квиза /start */
export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });

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

  const id = newLeadId();
  const { score, qualified } = scoreLead(lead);
  const record = { id, kind: "full", createdAt: new Date().toISOString(), score, qualified, ip, ...lead };
  const results = await deliver(record, teamEmail(lead, { id, score, qualified }), { to: lead.email, mail: clientEmail(lead, id) }, lead.email);
  return NextResponse.json({ ok: true, id, score, qualified, results });
}
