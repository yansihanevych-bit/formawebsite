/**
 * Уведомление о заявке в Telegram (Bot API, без библиотек).
 * Нужны TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID (можно несколько id через запятую: личка, группа, канал).
 */
type Rec = Record<string, unknown> & { id: string };
type FileRef = { url: string; name: string; size: number };

const esc = (v: unknown) => String(v ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const line = (label: string, v: unknown) => (v === undefined || v === null || v === "" || (Array.isArray(v) && !v.length) ? "" : `<b>${label}:</b> ${esc(Array.isArray(v) ? v.join(", ") : v)}\n`);

const KIND: Record<string, string> = { full: "🧭 Анкета «Начать проект»", footer: "✉️ Быстрая заявка (футер)", calculator: "🧮 Заявка из калькулятора" };

export function formatTelegram(r: Rec) {
  const kind = KIND[String(r.kind)] || "Заявка";
  const files = (r.files as FileRef[] | undefined) ?? [];
  const answers = (r.answers as { q: string; a: string }[] | undefined) ?? [];
  const calc = r.calc as
    | { role: string; property: string; area: number; deliverables: string[]; renderQty: string; low: number; high: number; daysMin: number; daysMax: number; onRequest: boolean }
    | undefined;
  const last = (r.attribution as { last?: Record<string, string> } | undefined)?.last;
  const phone = String(r.phone ?? "");
  const tel = phone.replace(/[^\d+]/g, "");

  let t = `<b>${kind}</b>\n<code>${esc(r.id)}</code>${typeof r.score === "number" ? ` · скоринг ${r.score}${r.qualified ? " ✅" : ""}` : ""}\n\n`;
  t += line("Имя", r.name);
  t += line("Компания", r.company);
  // tel: Telegram в ссылках не принимает — номер распознаётся сам
  t += phone ? `<b>Телефон:</b> ${esc(phone)}${tel ? ` · <a href="https://wa.me/${esc(tel.replace("+", ""))}">WhatsApp</a>` : ""}\n` : "";
  t += line("Email", r.email);
  t += r.messengerHandle ? line(String(r.messenger || "Мессенджер"), r.messengerHandle) : "";
  t += line("Язык сайта", String(r.language ?? "").toUpperCase());
  t += "\n";
  t += line("Клиент", r.clientType);
  t += line("Тариф", r.plan);
  t += line("Направление", r.track);
  t += line("Объект", [r.propertyType, r.condition].filter(Boolean).join(" · "));
  t += line("Где", [r.city, r.country].filter(Boolean).join(", "));
  t += r.area ? line("Площадь", `${r.area} м²`) : "";
  t += line("Услуги", r.services);
  t += line("Срок", r.deadline);
  t += line("Бюджет", r.budget);
  if (calc) {
    t += line("Калькулятор", `${calc.role} · ${calc.property} · ${calc.area} м² · ${calc.deliverables.join(", ")} (рендеры: ${calc.renderQty})`);
    t += line("Оценка", calc.onRequest ? "по запросу" : `€ ${calc.low}–${calc.high}, ${calc.daysMin}–${calc.daysMax} дн.`);
  }
  const msg = r.comment || r.message;
  if (msg) t += `\n<b>Сообщение:</b>\n${esc(msg)}\n`;
  if (answers.length) t += `\n${answers.map((a) => `<b>${esc(a.q)}</b>\n${esc(a.a)}`).join("\n")}\n`;
  if (files.length) t += `\n<b>Файлы:</b>\n${files.map((f) => `• <a href="${esc(f.url)}">${esc(f.name)}</a> (${Math.max(1, Math.round(f.size / 1024))} КБ)`).join("\n")}\n`;
  const src = [last?.source, last?.medium, last?.campaign].filter(Boolean).join(" / ");
  t += `\n${line("Источник", src)}${line("Страница", r.page)}`;
  return t.length > 4000 ? t.slice(0, 3990) + "…" : t;
}

export async function sendTelegram(r: Rec) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chats = (process.env.TELEGRAM_CHAT_ID || "").split(",").map((s) => s.trim()).filter(Boolean);
  if (!token || !chats.length) return "off";
  const text = formatTelegram(r);
  const res = await Promise.all(
    chats.map(async (chat_id) => {
      try {
        const x = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ chat_id, text, parse_mode: "HTML", disable_web_page_preview: true }),
          signal: AbortSignal.timeout(8000),
        });
        if (!x.ok) console.error("[lead] telegram", r.id, chat_id, x.status, await x.text());
        return x.ok;
      } catch (e) {
        console.error("[lead] telegram failed", r.id, e);
        return false;
      }
    }),
  );
  return res.every(Boolean) ? "ok" : "error";
}
