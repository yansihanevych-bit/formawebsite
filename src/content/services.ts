import type { L } from "@/lib/i18n";
import { IMG, type Img } from "./images";

export type ServiceId = "concept" | "model3d" | "render" | "presentation" | "film";

export type Service = {
  id: ServiceId;
  n: string;
  title: L;
  short: L;
  body: L;
  includes: L[];
  timing: L;
  image: Img;
};

export const services: Service[] = [
  {
    id: "concept",
    n: "01",
    title: { it: "Concept planimetrico", en: "Layout concept", ru: "Планировочная концепция" },
    short: { it: "La soluzione architettonica, prima di tutto.", en: "The architectural solution comes first.", ru: "Сначала — архитектурное решение." },
    body: {
      it: "Analizziamo planimetria e vincoli e proponiamo una o più distribuzioni realistiche: muri, aperture, impianti, misure reali. È la base di tutto il resto.",
      en: "We study the plan and its constraints and propose one or more realistic layouts: walls, openings, services, real dimensions. Everything else is built on it.", ru: "Изучаем план и ограничения и предлагаем одну или несколько реалистичных планировок: стены, проёмы, инженерия, реальные размеры. На этом строится всё остальное.",
    },
    includes: [
      { it: "Rilievo da planimetria, misure o foto", en: "Survey from plan, measurements or photos", ru: "Обмер по плану, замерам или фото" },
      { it: "1–3 varianti di distribuzione", en: "1–3 layout options", ru: "1–3 варианта планировки" },
      { it: "Planimetria arredata quotata", en: "Furnished, dimensioned plan", ru: "План с мебелью и размерами" },
    ],
    timing: { it: "48–72 ore", en: "48–72 hours", ru: "48–72 часа" },
    image: IMG.plans,
  },
  {
    id: "model3d",
    n: "02",
    title: { it: "Modello 3D", en: "3D model", ru: "3D-модель" },
    short: { it: "Volumi e spazi leggibili da chiunque.", en: "Spaces anyone can read.", ru: "Пространство, понятное каждому." },
    body: {
      it: "Trasformiamo il concept in un modello tridimensionale fedele, utile per valutare proporzioni, luce e percorsi, e per comunicare il progetto a clienti e imprese.",
      en: "We turn the concept into an accurate 3D model to assess proportions, light and flow — and to explain the project to clients and contractors.", ru: "Превращаем концепцию в точную 3D-модель: чтобы оценить пропорции, свет и перемещения — и объяснить проект клиентам и подрядчикам.",
    },
    includes: [
      { it: "Modello in scala dell'immobile", en: "To-scale model of the property", ru: "Модель объекта в масштабе" },
      { it: "Viste assonometriche e spaccati", en: "Axonometric and cut-away views", ru: "Аксонометрия и разрезы" },
      { it: "Varianti di finiture", en: "Finish variations", ru: "Варианты отделки" },
    ],
    timing: { it: "3–5 giorni", en: "3–5 days", ru: "3–5 дней" },
    image: IMG.architecture,
  },
  {
    id: "render",
    n: "03",
    title: { it: "Render fotorealistici", en: "Photorealistic renders", ru: "Фотореалистичные рендеры" },
    short: { it: "Come sarà, prima che esista.", en: "What it will be, before it exists.", ru: "Каким он будет — ещё до того, как появится." },
    body: {
      it: "Immagini fotorealistiche costruite sul progetto, non generate a caso: ogni render corrisponde a una pianta reale e realizzabile.",
      en: "Photorealistic images built on the design, not generated at random: every render matches a real, buildable plan.", ru: "Фотореалистичные изображения, построенные на проекте, а не сгенерированные наугад: каждый рендер соответствует реальной, выполнимой планировке.",
    },
    includes: [
      { it: "Render interni ed esterni", en: "Interior and exterior renders", ru: "Рендеры интерьеров и экстерьеров" },
      { it: "Formati per portali e social", en: "Formats for portals and social", ru: "Форматы для порталов и соцсетей" },
      { it: "Confronto prima / dopo", en: "Before / after comparison", ru: "Сравнение до / после" },
    ],
    timing: { it: "3–7 giorni", en: "3–7 days", ru: "3–7 дней" },
    image: IMG.living2,
  },
  {
    id: "presentation",
    n: "04",
    title: { it: "Presentazione PDF", en: "PDF presentation", ru: "PDF-презентация" },
    short: { it: "Un dossier pronto per vendere.", en: "A dossier ready to sell.", ru: "Досье, готовое для продажи." },
    body: {
      it: "Impaginiamo stato attuale, concept, render e dati chiave in una presentazione elegante, pronta da inviare a clienti, investitori o banche.",
      en: "We lay out current state, concept, renders and key figures in an elegant presentation, ready for clients, investors or banks.", ru: "Собираем текущее состояние, концепцию, рендеры и ключевые цифры в элегантную презентацию для клиентов, инвесторов или банков.",
    },
    includes: [
      { it: "Layout brandizzabile (anche con il vostro logo)", en: "Brandable layout (with your logo too)", ru: "Макет под ваш бренд (и с вашим логотипом)" },
      { it: "Versione IT / EN / RU", en: "IT / EN / RU version", ru: "Версии IT / EN / RU" },
      { it: "Ottimizzata per email e stampa", en: "Optimised for email and print", ru: "Оптимизировано для email и печати" },
    ],
    timing: { it: "+1–2 giorni", en: "+1–2 days", ru: "+1–2 дня" },
    image: IMG.office,
  },
  {
    id: "film",
    n: "05",
    title: { it: "Video architettonici", en: "Architectural films", ru: "Архитектурные видео" },
    short: { it: "Il progetto in movimento.", en: "The project in motion.", ru: "Проект в движении." },
    body: {
      it: "Brevi film e reel che raccontano lo spazio: ideali per lanci di nuovi complessi, campagne social e presentazioni.",
      en: "Short films and reels that tell the story of a space — ideal for development launches, social campaigns and presentations.", ru: "Короткие фильмы и рилсы о пространстве — для запуска жилых комплексов, кампаний в соцсетях и презентаций.",
    },
    includes: [
      { it: "Walkthrough 3D animato", en: "Animated 3D walkthrough", ru: "Анимированный 3D-проход" },
      { it: "Reel verticali 9:16", en: "Vertical 9:16 reels", ru: "Вертикальные рилсы 9:16" },
      { it: "Musica e titoli", en: "Music and titles", ru: "Музыка и титры" },
    ],
    timing: { it: "1–2 settimane", en: "1–2 weeks", ru: "1–2 недели" },
    image: IMG.houseDusk,
  },
];

export const serviceById = (id: ServiceId) => services.find((s) => s.id === id)!;
