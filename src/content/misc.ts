import type { L } from "@/lib/i18n";
import { IMG, type Img } from "./images";
import type { SegmentId } from "./segments";

/* ───────── Pricing (ЗАГЛУШКИ — цены утвердить с заказчиком) ───────── */
export type Plan = {
  id: string;
  name: L;
  price: L;
  note: L;
  features: L[];
  highlight?: boolean;
  forSegments: SegmentId[];
};

export const plans: Plan[] = [
  {
    id: "express",
    name: { it: "Express Concept", en: "Express Concept", ru: "Express Concept" },
    price: { it: "da € 390", en: "from € 390", ru: "от € 390" },
    note: { it: "fino a 100 m² · 48–72 ore", en: "up to 100 m² · 48–72 hours", ru: "до 100 м² · 48–72 часа" },
    features: [
      { it: "Concept planimetrico (2 varianti)", en: "Layout concept (2 options)", ru: "Планировочная концепция (2 варианта)" },
      { it: "Planimetria arredata quotata", en: "Furnished, dimensioned plan", ru: "План с мебелью и размерами" },
      { it: "1 render della zona principale", en: "1 render of the main space", ru: "1 рендер главного помещения" },
      { it: "1 giro di modifiche", en: "1 round of revisions", ru: "1 круг правок" },
    ],
    forSegments: ["homeowners", "investors", "realEstate"],
  },
  {
    id: "visual",
    name: { it: "Concept + Render", en: "Concept + Render", ru: "Concept + Render" },
    price: { it: "da € 890", en: "from € 890", ru: "от € 890" },
    note: { it: "fino a 150 m² · 4–6 giorni", en: "up to 150 m² · 4–6 days", ru: "до 150 м² · 4–6 дней" },
    features: [
      { it: "Tutto Express Concept", en: "Everything in Express Concept", ru: "Всё из Express Concept" },
      { it: "Modello 3D", en: "3D model", ru: "3D-модель" },
      { it: "4–6 render fotorealistici", en: "4–6 photorealistic renders", ru: "4–6 фотореалистичных рендеров" },
      { it: "Confronto prima / dopo", en: "Before / after comparison", ru: "Сравнение до / после" },
    ],
    highlight: true,
    forSegments: ["realEstate", "construction", "homeowners"],
  },
  {
    id: "sales",
    name: { it: "Sales Pack", en: "Sales Pack", ru: "Sales Pack" },
    price: { it: "da € 1.490", en: "from € 1,490", ru: "от € 1 490" },
    note: { it: "per immobile · 6–8 giorni", en: "per property · 6–8 days", ru: "за объект · 6–8 дней" },
    features: [
      { it: "Tutto Concept + Render", en: "Everything in Concept + Render", ru: "Всё из Concept + Render" },
      { it: "Presentazione PDF IT/EN/RU brandizzata", en: "Branded IT/EN/RU PDF presentation", ru: "Брендированная PDF-презентация IT/EN/RU" },
      { it: "Formati per portali e social", en: "Portal and social formats", ru: "Форматы для порталов и соцсетей" },
      { it: "Reel verticale 15–30 s", en: "15–30 s vertical reel", ru: "Вертикальный рилс 15–30 с" },
    ],
    forSegments: ["realEstate", "investors", "construction"],
  },
  {
    id: "b2b",
    name: { it: "Developer & B2B", en: "Developer & B2B", ru: "Developer & B2B" },
    price: { it: "su preventivo", en: "on request", ru: "по запросу" },
    note: { it: "complessi, volumi, partnership", en: "developments, volume, partnerships", ru: "комплексы, объёмы, партнёрство" },
    features: [
      { it: "Planning: ottimizzazione planimetrie", en: "Planning: layout optimisation", ru: "Planning: оптимизация планировок" },
      { it: "Marketing: render, brochure, video", en: "Marketing: renders, brochure, film", ru: "Marketing: рендеры, буклет, видео" },
      { it: "Tariffe a volume per agenzie e imprese", en: "Volume rates for agencies and builders", ru: "Тарифы за объём для агентств и строителей" },
      { it: "Referente dedicato", en: "Dedicated contact", ru: "Персональный менеджер" },
    ],
    forSegments: ["developers", "construction", "realEstate"],
  },
];

/* ───────── FAQ ───────── */
export type Faq = { q: L; a: L; segments?: SegmentId[] };

export const faqs: Faq[] = [
  {
    q: { it: "Cosa serve per iniziare?", en: "What do you need to get started?", ru: "Что нужно, чтобы начать?" },
    a: {
      it: "Una planimetria (anche catastale o uno schizzo quotato) e qualche foto. Se non avete la pianta, bastano misure e foto di ogni ambiente.",
      en: "A floor plan (even a cadastral plan or a dimensioned sketch) and a few photos. No plan? Measurements and photos of each room are enough.", ru: "План (даже кадастровый или эскиз с размерами) и несколько фото. Нет плана? Достаточно замеров и фото каждого помещения.",
    },
  },
  {
    q: { it: "In quanto tempo ricevo il concept?", en: "How fast will I get the concept?", ru: "Как быстро я получу концепцию?" },
    a: {
      it: "Il concept planimetrico in 48–72 ore lavorative dalla ricezione dei materiali. Render e presentazione richiedono qualche giorno in più.",
      en: "The layout concept in 48–72 working hours after we receive your material. Renders and presentation take a few more days.", ru: "Планировочная концепция — за 48–72 рабочих часа после получения материалов. Рендеры и презентация — ещё несколько дней.",
    },
  },
  {
    q: { it: "Sono immagini generate con l'intelligenza artificiale?", en: "Are these AI-generated images?", ru: "Это изображения, сгенерированные ИИ?" },
    a: {
      it: "No. Ogni immagine nasce da un progetto architettonico con misure reali, muri, aperture e impianti. Usiamo strumenti digitali avanzati, ma la soluzione è progettata da architetti.",
      en: "No. Every image comes from an architectural design with real dimensions, walls, openings and services. We use advanced digital tools, but the solution is designed by architects.", ru: "Нет. Каждое изображение основано на архитектурном проекте с реальными размерами, стенами, проёмами и инженерией. Мы используем современные цифровые инструменты, но решение проектируют архитекторы.",
    },
  },
  {
    q: { it: "Serve un sopralluogo?", en: "Do you need a site visit?", ru: "Нужен ли выезд на объект?" },
    a: {
      it: "Di norma no: lavoriamo da remoto su planimetrie e foto. Per immobili in Liguria possiamo organizzare un sopralluogo su richiesta.",
      en: "Usually not: we work remotely from plans and photos. For properties in Liguria we can arrange a visit on request.", ru: "Обычно нет: работаем удалённо по планам и фото. Для объектов в Лигурии выезд возможен по запросу.",
    },
  },
  {
    q: { it: "Il concept sostituisce il progetto per le pratiche edilizie?", en: "Does the concept replace the permit drawings?", ru: "Заменяет ли концепция проект для разрешений?" },
    a: {
      it: "No, il concept è uno studio di fattibilità e di comunicazione. Può diventare la base del progetto esecutivo e delle pratiche, che possiamo seguire separatamente.",
      en: "No, the concept is a feasibility and communication study. It can become the basis for detailed design and permits, which we can handle separately.", ru: "Нет, концепция — это исследование выполнимости и инструмент коммуникации. Она может стать основой рабочего проекта и документов, которые мы можем подготовить отдельно.",
    },
  },
  {
    q: { it: "Posso usare render e presentazione con il mio marchio?", en: "Can I use renders and presentation under my brand?", ru: "Можно использовать рендеры и презентацию под моим брендом?" },
    a: {
      it: "Sì. Per agenzie e imprese prepariamo i materiali con il vostro logo, pronti per portali, social e preventivi.",
      en: "Yes. For agencies and builders we prepare materials with your logo, ready for portals, social and quotes.", ru: "Да. Для агентств и строителей готовим материалы с вашим логотипом — для порталов, соцсетей и смет.",
    },
    segments: ["realEstate", "construction", "developers"],
  },
  {
    q: { it: "Come funzionano pagamento e modifiche?", en: "How do payment and revisions work?", ru: "Как устроены оплата и правки?" },
    a: {
      it: "Dopo la richiesta inviamo un preventivo fisso. Si paga un acconto all'avvio e il saldo alla consegna. Ogni pacchetto include un giro di modifiche.",
      en: "After your request we send a fixed quote. A deposit at the start, the balance on delivery. Every package includes one round of revisions.", ru: "После заявки присылаем фиксированное предложение. Предоплата на старте, остаток — при сдаче. В каждый пакет входит один круг правок.",
    },
  },
  {
    q: { it: "Lavorate anche fuori dalla Liguria?", en: "Do you work outside Liguria?", ru: "Работаете ли вы за пределами Лигурии?" },
    a: {
      it: "Sì, lavorando da remoto possiamo seguire immobili in tutta Italia e in Costa Azzurra. La Riviera di Ponente è il nostro mercato principale.",
      en: "Yes, working remotely we handle properties across Italy and the Côte d'Azur. The western Riviera is our home market.", ru: "Да, удалённо работаем с объектами по всей Италии и на Лазурном берегу. Западная Ривьера — наш основной рынок.",
    },
  },
];

/* ───────── Films ───────── */
export type Film = { title: L; text: L; duration: string; poster: Img; videoUrl?: string };

export const films: Film[] = [
  {
    title: { it: "Residenza Collina — teaser di lancio", en: "Residenza Collina — launch teaser", ru: "Residenza Collina — тизер запуска" },
    text: { it: "Walkthrough esterno e tipologie per la pre-vendita.", en: "Exterior walkthrough and unit types for pre-sales.", ru: "Облёт экстерьера и типы квартир для предпродаж." },
    duration: "0:45",
    poster: IMG.houseCube,
  },
  {
    title: { it: "Villa sul mare — dal rilievo al render", en: "Seaside villa — from survey to render", ru: "Вилла у моря — от обмера до рендера" },
    text: { it: "La trasformazione raccontata in un minuto.", en: "The transformation told in one minute.", ru: "Преображение за одну минуту." },
    duration: "1:02",
    poster: IMG.houseDusk,
  },
  {
    title: { it: "Attico Porto Vecchio — reel 9:16", en: "Porto Vecchio penthouse — 9:16 reel", ru: "Пентхаус Порто Веккьо — рилс 9:16" },
    text: { it: "Formato verticale per Instagram e TikTok.", en: "Vertical format for Instagram and TikTok.", ru: "Вертикальный формат для Instagram и TikTok." },
    duration: "0:20",
    poster: IMG.living2,
  },
  {
    title: { it: "Loft ex magazzino — concept film", en: "Warehouse loft — concept film", ru: "Лофт в бывшем складе — концепт-фильм" },
    text: { it: "Doppie altezze e cortile interno.", en: "Double heights and inner courtyard.", ru: "Двойная высота и внутренний двор." },
    duration: "0:58",
    poster: IMG.living4,
  },
];

/* ───────── Process ───────── */
export const processSteps: { title: L; text: L; time: L; image: Img }[] = [
  {
    title: { it: "Materiali", en: "Material", ru: "Материалы" },
    text: { it: "Inviate planimetria, misure o foto tramite il modulo. Bastano pochi minuti.", en: "Send your plan, measurements or photos via the form. It takes a few minutes.", ru: "Отправьте план, замеры или фото через форму. Это займёт несколько минут." },
    time: { it: "5 minuti", en: "5 minutes", ru: "5 минут" },
    image: IMG.plans,
  },
  {
    title: { it: "Preventivo", en: "Proposal", ru: "Предложение" },
    text: { it: "Analizziamo il materiale e rispondiamo con prezzo fisso e tempi certi.", en: "We review the material and reply with a fixed price and firm timing.", ru: "Изучаем материалы и отвечаем фиксированной ценой и точными сроками." },
    time: { it: "entro 24 ore", en: "within 24 hours", ru: "в течение 24 часов" },
    image: IMG.office,
  },
  {
    title: { it: "Concept", en: "Concept", ru: "Концепция" },
    text: { it: "Varianti di distribuzione con misure reali, verificate su struttura e impianti.", en: "Layout options with real dimensions, checked against structure and services.", ru: "Варианты планировки с реальными размерами, проверенные по конструкциям и инженерии." },
    time: { it: "48–72 ore", en: "48–72 hours", ru: "48–72 часа" },
    image: IMG.sketch,
  },
  {
    title: { it: "Visualizzazione", en: "Visualisation", ru: "Визуализация" },
    text: { it: "Modello 3D e render fotorealistici costruiti sul concept approvato.", en: "3D model and photorealistic renders built on the approved concept.", ru: "3D-модель и фотореалистичные рендеры по утверждённой концепции." },
    time: { it: "3–5 giorni", en: "3–5 days", ru: "3–5 дней" },
    image: IMG.living2,
  },
  {
    title: { it: "Consegna", en: "Delivery", ru: "Сдача" },
    text: { it: "Dossier PDF, immagini per portali e social, pronti da inviare.", en: "PDF dossier, portal and social images, ready to send.", ru: "PDF-досье, изображения для порталов и соцсетей — готово к отправке." },
    time: { it: "+1–2 giorni", en: "+1–2 days", ru: "+1–2 дня" },
    image: IMG.living7,
  },
];

export const site = {
  name: "FORMA BURO",
  domain: "forma-buro.com",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://forma-buro.com",
  email: "hello@forma-buro.com", // TODO: подтвердить
  phone: "+39 000 000 0000", // TODO: итальянский номер
  whatsapp: "390000000000", // TODO: номер WhatsApp без +
  telegram: "formaburo", // TODO
  instagram: "https://instagram.com/formaburo", // TODO
  address: "Sanremo (IM), Liguria", // TODO
  vat: "P.IVA 00000000000", // TODO: обязательна для сайтов в Италии
  towns: ["Sanremo", "Bordighera", "Ospedaletti", "Ventimiglia"],
};
