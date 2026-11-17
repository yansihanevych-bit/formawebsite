# forma-buro.com

Сайт FORMA BURO — Express Architectural Concepts (Лигурия). Next.js 16 · Tailwind 4 · IT/EN.
ТЗ: [`docs/TZ.md`](docs/TZ.md).

## Запуск

```bash
npm install
cp .env.example .env.local   # по желанию
npm run dev                  # http://localhost:3000 → /it
npm run build && npm start   # прод-сборка
```

## Деплой (GitHub + Vercel)

1. `git remote add origin git@github.com:<you>/forma-buro-web.git && git push -u origin main`
2. Vercel → Add New Project → импорт репо (Framework: Next.js, всё по умолчанию).
3. Settings → Environment Variables — из `.env.example`.
4. Storage → Blob → Create store (**public**) → Connect to project — включит загрузку файлов в форме.
5. Settings → Domains → `forma-buro.com` + `www` (редирект на apex). DNS: `A @ 76.76.21.21`, `CNAME www cname.vercel-dns.com`.

Каждый PR получает Preview-URL; preview не индексируется (robots.ts).

## Где что лежит

| Что | Файл |
|---|---|
| Тексты интерфейса IT/EN | `src/dictionaries/index.ts` |
| Кейсы | `src/content/projects.ts` |
| Сегменты / посадочные | `src/content/segments.ts` |
| Услуги | `src/content/services.ts` |
| Цены, FAQ, фильмы, процесс, **контакты** | `src/content/misc.ts` |
| **Картинки-заглушки** | `src/content/images.ts` |
| Доп. вопросы формы по сегментам | `src/dictionaries/index.ts` → `segmentQuestions` |
| Логотип | `public/brand/*.svg` (трассировка PNG), favicon `src/app/icon.svg` |
| Приём заявки | `src/app/api/lead/route.ts` (+ `src/lib/lead.ts` схема и скоринг, `src/lib/email.ts` письма) |
| Загрузка файлов | `src/app/api/upload/route.ts` (Vercel Blob, до 10 файлов × 50 MB) |
| Cookie-баннер + GTM (Consent Mode v2, basic) | `src/components/analytics/Consent.tsx` |
| UTM / gclid / fbclid (first + last touch) | `src/lib/attribution.ts` |

Контент пока в TS-файлах (поля `{ it, en }`) — структура один-в-один переносится в Sanity (этап 2 ТЗ).

## Заявки

`POST /api/lead` → валидация zod → **лог в Vercel всегда** → webhook (если задан) → письмо команде + подтверждение клиенту (если задан Resend).
К заявке прикладываются: сегмент, услуги, файлы, UTM/gclid/fbclid first+last, landing, страница формы, `score` 0–100 и `qualified` (≥ 50).

События dataLayer: `form_start`, `form_step`, `file_upload`, `generate_lead` (на /thank-you), `cta_click`, `segment_select`.
В GTM: конверсия = `generate_lead`, custom dimension `client_type`.

## TODO перед запуском

- [ ] Заменить фото-заглушки (Unsplash) на реальные кейсы — `src/content/images.ts`, затем убрать `images.unsplash.com` из `next.config.ts`
- [ ] Реальные тексты кейсов — `src/content/projects.ts` (сейчас демонстрационные)
- [ ] Контакты, телефон, WhatsApp, Telegram, адрес, **P.IVA** — `site` в `src/content/misc.ts`
- [ ] Утвердить цены и сроки (`plans`, `processSteps`, статистика на главной)
- [ ] Privacy / Cookie policy — юридически проверенный текст (iubenda или юрист)
- [ ] Видео для раздела Films (поле `videoUrl`)
- [ ] Resend + домен, Blob store, GTM-контейнер
- [ ] Посмотреть isto.ae (не открылся при подготовке ТЗ)
