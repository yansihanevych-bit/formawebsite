import type { L } from "@/lib/i18n";
import { IMG, type Img } from "./images";

/** Журнал (SEO-статьи). ЗАГЛУШКИ — тексты-примеры, заменить/дополнить реальными материалами. */
export type Article = { slug: string; date: string; tag: L; title: L; excerpt: L; body: L[]; cover: Img; minutes: number };

export const articles: Article[] = [
  {
    slug: "ristrutturare-casa-in-liguria",
    date: "2026-10-28",
    minutes: 4,
    tag: { it: "Guida", en: "Guide", ru: "Гид" },
    title: {
      it: "Ristrutturare casa in Liguria: da dove iniziare",
      en: "Renovating a home in Liguria: where to start",
      ru: "Ремонт дома в Лигурии: с чего начать",
    },
    excerpt: {
      it: "Vincoli dei centri storici, pratiche, impianti: i primi passi prima di chiedere preventivi alle imprese.",
      en: "Old-town restrictions, permits, services: the first steps before asking builders for quotes.",
      ru: "Ограничения исторических центров, документы, инженерия: первые шаги до того, как просить сметы у строителей.",
    },
    body: [
      {
        it: "Molti immobili della Riviera di Ponente si trovano in centri storici o in zone con vincoli paesaggistici. Prima di immaginare demolizioni e aperture conviene capire cosa si può fare davvero.",
        en: "Many properties on the western Riviera sit in historic centres or areas with landscape restrictions. Before imagining demolitions and new openings, it pays to know what is actually possible.",
        ru: "Многие объекты Западной Ривьеры находятся в исторических центрах или в зонах с ландшафтными ограничениями. Прежде чем планировать демонтаж и новые проёмы, стоит понять, что реально можно сделать.",
      },
      {
        it: "Il secondo passo è una planimetria affidabile. Anche quella catastale va bene come base, purché integrata con misure e foto di ogni ambiente.",
        en: "The second step is a reliable floor plan. Even the cadastral plan works as a base, as long as it is complemented by measurements and photos of every room.",
        ru: "Второй шаг — надёжный план. Даже кадастровый подойдёт как основа, если дополнить его замерами и фото каждого помещения.",
      },
      {
        it: "Con un concept planimetrico e qualche render potete chiedere preventivi confrontabili: le imprese quotano lo stesso progetto, non la loro interpretazione.",
        en: "With a layout concept and a few renders you can request comparable quotes: builders price the same project, not their own interpretation.",
        ru: "С планировочной концепцией и несколькими рендерами можно запросить сопоставимые сметы: строители оценивают один и тот же проект, а не свою интерпретацию.",
      },
    ],
    cover: IMG.site,
  },
  {
    slug: "render-per-vendere-casa",
    date: "2026-10-12",
    minutes: 3,
    tag: { it: "Agenzie", en: "Agencies", ru: "Агентствам" },
    title: {
      it: "Perché i render “dopo” vendono gli immobili da ristrutturare",
      en: "Why “after” renders sell properties that need renovation",
      ru: "Почему рендеры «после» продают объекты под ремонт",
    },
    excerpt: {
      it: "Gli acquirenti non comprano metri quadri, comprano una visione. Come mostrarla senza promettere l'impossibile.",
      en: "Buyers don't buy square metres, they buy a vision. How to show it without promising the impossible.",
      ru: "Покупатели покупают не квадратные метры, а образ. Как показать его, не обещая невозможного.",
    },
    body: [
      {
        it: "Un annuncio con le sole foto dello stato attuale mette in evidenza i difetti. Un render costruito su una pianta realizzabile sposta l'attenzione sul potenziale.",
        en: "A listing with only current-state photos highlights the flaws. A render built on a buildable plan shifts attention to the potential.",
        ru: "Объявление только с фото текущего состояния подчёркивает недостатки. Рендер, построенный на выполнимой планировке, переключает внимание на потенциал.",
      },
      {
        it: "La chiave è la credibilità: misure reali, muri portanti rispettati, finiture coerenti con il budget di zona.",
        en: "The key is credibility: real dimensions, load-bearing walls respected, finishes consistent with local budgets.",
        ru: "Ключ — достоверность: реальные размеры, сохранённые несущие стены, отделка в рамках местных бюджетов.",
      },
      {
        it: "Affiancare prima e dopo, con la pianta del concept, trasforma l'annuncio in una proposta concreta.",
        en: "Showing before and after side by side, with the concept plan, turns the listing into a concrete proposal.",
        ru: "До и после рядом, вместе с планом концепции, превращают объявление в конкретное предложение.",
      },
    ],
    cover: IMG.living5,
  },
  {
    slug: "mix-tipologico-nuovi-complessi",
    date: "2026-09-30",
    minutes: 5,
    tag: { it: "Developer", en: "Developers", ru: "Девелоперам" },
    title: {
      it: "Mix tipologico: come aumentare le unità vendibili",
      en: "Unit mix: how to increase sellable units",
      ru: "Квартирография: как увеличить число продаваемых квартир",
    },
    excerpt: {
      it: "Tagli più compatti, meno distribuzione, terrazze profonde: le leve che contano sul mercato della Riviera.",
      en: "More compact units, less circulation, deeper terraces: the levers that matter on the Riviera market.",
      ru: "Компактные квартиры, меньше коридоров, глубокие террасы: рычаги, которые работают на рынке Ривьеры.",
    },
    body: [
      {
        it: "Sul mercato locale la domanda si concentra su bilocali e trilocali compatti con spazio esterno. Tagli troppo grandi restano invenduti più a lungo.",
        en: "Local demand concentrates on compact one- and two-bed units with outdoor space. Oversized units stay on the market longer.",
        ru: "Местный спрос сосредоточен на компактных одно- и двухспальных квартирах с открытым пространством. Слишком большие квартиры продаются дольше.",
      },
      {
        it: "Ridurre le superfici di distribuzione libera metri per le zone giorno senza aumentare la superficie costruita.",
        en: "Reducing circulation space frees up square metres for living areas without increasing the built footprint.",
        ru: "Сокращение коридоров освобождает метры для жилых зон без увеличения площади застройки.",
      },
      {
        it: "Uno studio di mix fatto prima della commercializzazione costa poco rispetto al valore che sblocca.",
        en: "A unit-mix study done before sales starts costs little compared with the value it unlocks.",
        ru: "Исследование квартирографии до старта продаж стоит немного по сравнению с ценностью, которую оно открывает.",
      },
    ],
    cover: IMG.building,
  },
];

export const articleBySlug = (slug: string) => articles.find((a) => a.slug === slug);
