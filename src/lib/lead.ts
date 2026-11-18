import { z } from "zod";

const touch = z
  .object({
    utm_source: z.string().optional(),
    utm_medium: z.string().optional(),
    utm_campaign: z.string().optional(),
    utm_term: z.string().optional(),
    utm_content: z.string().optional(),
    gclid: z.string().optional(),
    fbclid: z.string().optional(),
    referrer: z.string().optional(),
    landing: z.string().optional(),
    ts: z.string().optional(),
  })
  .partial()
  .optional();

export const CLIENT_TYPES = ["realEstate", "construction", "developers", "investors", "homeowners", "other"] as const;
export const SERVICES = ["concept", "model3d", "render", "presentation", "film"] as const;

export const leadSchema = z.object({
  clientType: z.enum(CLIENT_TYPES),
  country: z.string().min(2).max(60),
  city: z.string().max(80).optional().default(""),
  propertyType: z.string().min(1).max(60),
  area: z.coerce.number().positive().max(100000),
  condition: z.string().max(60).optional().default(""),
  services: z.array(z.enum(SERVICES)).min(1),
  deadline: z.string().max(60).optional().default(""),
  budget: z.string().max(60).optional().default(""),
  files: z
    .array(z.object({ url: z.string().url(), name: z.string().max(200), size: z.number().nonnegative() }))
    .max(10)
    .default([]),
  comment: z.string().max(4000).optional().default(""),
  answers: z.array(z.object({ q: z.string().max(300), a: z.string().max(1000) })).max(5).default([]),
  name: z.string().min(2).max(120),
  company: z.string().max(120).optional().default(""),
  email: z.string().email().max(200),
  phone: z.string().max(40).optional().default(""),
  messenger: z.string().max(30).optional().default(""),
  messengerHandle: z.string().max(80).optional().default(""),
  language: z.enum(["it", "en", "ru"]),
  gdpr: z.literal(true),
  marketing: z.boolean().default(false),
  plan: z.string().max(40).optional().default(""),
  track: z.string().max(40).optional().default(""),
  page: z.string().max(300).optional().default(""),
  attribution: z.object({ first: touch, last: touch }).default({}),
  hp: z.string().max(0).optional().default(""), // honeypot: должен быть пустым
});

export type Lead = z.infer<typeof leadSchema>;

/** Простой скоринг для квалификации (настроить по факту продаж) */
export function scoreLead(l: Lead) {
  let s = 0;
  if (["developers", "realEstate", "construction"].includes(l.clientType)) s += 30;
  else if (l.clientType === "investors") s += 20;
  else s += 10;
  if (l.files.length) s += 25;
  if (l.area >= 150) s += 10;
  if (["€ 1.000–3.000", "€ 1,000–3,000", "€ 1 000–3 000", "> € 3.000", "> € 3,000", "> € 3 000"].includes(l.budget)) s += 20;
  else if (l.budget.startsWith("€ 500")) s += 10;
  if (l.phone || l.messengerHandle) s += 10;
  if (l.comment.length > 40) s += 5;
  s = Math.min(100, s);
  return { score: s, qualified: s >= 50 };
}
