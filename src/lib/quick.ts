import { locales } from "./i18n";
import { z } from "zod";
import { DELIVERABLES, PROPERTY, RENDER_QTY, ROLES } from "./calc";

const touch = z.record(z.string(), z.string().optional()).optional();

/** Короткая заявка: форма в футере или калькулятор */
export const quickSchema = z.object({
  kind: z.enum(["footer", "calculator"]),
  name: z.string().min(2).max(120),
  phone: z.string().min(5).max(40),
  email: z.string().email().max(200).optional().or(z.literal("")).default(""),
  budget: z.string().max(60).optional().default(""),
  message: z.string().max(4000).optional().default(""),
  files: z.array(z.object({ url: z.string().url(), name: z.string().max(200), size: z.number().nonnegative() })).max(5).default([]),
  language: z.enum(locales),
  gdpr: z.literal(true),
  calc: z
    .object({
      role: z.enum(ROLES).or(z.literal("")),
      property: z.enum(PROPERTY).or(z.literal("")),
      area: z.number().min(1).max(100000),
      deliverables: z.array(z.enum(DELIVERABLES)),
      renderQty: z.enum(RENDER_QTY),
      low: z.number(),
      high: z.number(),
      daysMin: z.number(),
      daysMax: z.number(),
      onRequest: z.boolean(),
    })
    .optional(),
  page: z.string().max(300).optional().default(""),
  attribution: z.object({ first: touch, last: touch }).default({}),
  hp: z.string().max(0).optional().default(""),
});
export type Quick = z.infer<typeof quickSchema>;
