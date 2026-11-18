/**
 * Калькулятор ориентировочной стоимости.
 * ЗАГЛУШКА ЦЕН — откалибровано под пакеты из content/misc.ts (Express ≈ 390, Concept+Render ≈ 890, Sales Pack ≈ 1 490 при 100 м²).
 * Утвердить коэффициенты с заказчиком.
 */
export const ROLES = ["realEstate", "construction", "developers", "investors", "homeowners"] as const;
export const PROPERTY = ["apartment", "villa", "development", "commercial"] as const;
export const DELIVERABLES = ["concept", "model3d", "renders", "presentation", "film"] as const;
export const RENDER_QTY = ["1", "4-6", "10+"] as const;

export type Role = (typeof ROLES)[number];
export type Property = (typeof PROPERTY)[number];
export type Deliverable = (typeof DELIVERABLES)[number];
export type RenderQty = (typeof RENDER_QTY)[number];

export type CalcInput = { role: Role | ""; property: Property | ""; area: number; deliverables: Deliverable[]; renderQty: RenderQty };
export type CalcResult = { low: number; high: number; daysMin: number; daysMax: number; onRequest: boolean; lines: { id: Deliverable; price: number }[] };

export const AREA_MIN = 30;
export const AREA_MAX = 2500;

const TYPE_K: Record<Property, number> = { apartment: 1, villa: 1.15, development: 1.35, commercial: 1.1 };
const RENDERS: Record<RenderQty, number> = { "1": 120, "4-6": 420, "10+": 850 };
const RENDER_DAYS: Record<RenderQty, number> = { "1": 1, "4-6": 3, "10+": 5 };

const round10 = (v: number) => Math.round(v / 10) * 10;

export function estimate(i: CalcInput): CalcResult {
  const f = Math.max(0.75, Math.sqrt(i.area / 100));
  const k = i.property ? TYPE_K[i.property] : 1;
  const lines: CalcResult["lines"] = [];
  let dMin = 0;
  let dMax = 0;
  for (const d of i.deliverables) {
    let p = 0;
    if (d === "concept") {
      p = 290 * f * k;
      dMin += 2;
      dMax += 3;
    } else if (d === "model3d") {
      p = 200 * f * k;
      dMin += 1;
      dMax += 2;
    } else if (d === "renders") {
      p = RENDERS[i.renderQty] * (1 + 0.25 * (f - 1));
      dMin += RENDER_DAYS[i.renderQty];
      dMax += RENDER_DAYS[i.renderQty] + 1;
    } else if (d === "presentation") {
      p = 290 * (i.property === "development" ? 1.3 : 1);
      dMin += 1;
      dMax += 2;
    } else if (d === "film") {
      p = 350 * k;
      dMin += 3;
      dMax += 5;
    }
    lines.push({ id: d, price: round10(p) });
  }
  if (i.area > 300) {
    dMin += 1;
    dMax += 2;
  }
  if (i.area > 1000) {
    dMin += 3;
    dMax += 5;
  }
  const low = round10(lines.reduce((s, l) => s + l.price, 0));
  return { low, high: round10(low * 1.25), daysMin: dMin, daysMax: dMax, onRequest: i.area >= AREA_MAX || (i.property === "development" && i.area > 1500), lines };
}
