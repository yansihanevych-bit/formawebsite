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
    name: { it: "Express Concept", en: "Express Concept" },
    price: { it: "da € 390", en: "from € 390" },
    note: { it: "fino a 100 m² · 48–72 ore", en: "up to 100 m² · 48–72 hours" },
    features: [
      { it: "Concept planimetrico (2 varianti)", en: "Layout concept (2 options)" },
      { it: "Planimetria arredata quotata", en: "Furnished, dimensioned plan" },
      { it: "1 render della zona principale", en: "1 render of the main space" },
      { it: "1 giro di modifiche", en: "1 round of revisions" },
    ],
    forSegments: ["homeowners", "investors", "realEstate"],
  },
  {
    id: "visual",
    name: { it: "Concept + Render", en: "Concept + Render" },
    price: { it: "da € 890", en: "from € 890" },
    note: { it: "fino a 150 m² · 4–6 giorni", en: "up to 150 m² · 4–6 days" },
    features: [
      { it: "Tutto Express Concept", en: "Everything in Express Concept" },
      { it: "Modello 3D", en: "3D model" },
      { it: "4–6 render fotorealistici", en: "4–6 photorealistic renders" },
      { it: "Confronto prima / dopo", en: "Before / after comparison" },
    ],
    highlight: true,
    forSegments: ["realEstate", "construction", "homeowners"],
  },
  {
    id: "sales",
    name: { it: "Sales Pack", en: "Sales Pack" },
    price: { it: "da € 1.490", en: "from € 1,490" },
    note: { it: "per immobile · 6–8 giorni", en: "per property · 6–8 days" },
    features: [
      { it: "Tutto Concept + Render", en: "Everything in Concept + Render" },
      { it: "Presentazione PDF IT/EN brandizzata", en: "Branded IT/EN PDF presentation" },
      { it: "Formati per portali e social", en: "Portal and social formats" },
      { it: "Reel verticale 15–30 s", en: "15–30 s vertical reel" },
    ],
    forSegments: ["realEstate", "investors", "construction"],
  },
  {
    id: "b2b",
    name: { it: "Developer & B2B", en: "Developer & B2B" },
    price: { it: "su preventivo", en: "on request" },
    note: { it: "complessi, volumi, partnership", en: "developments, volume, partnerships" },
    features: [
      { it: "Planning: ottimizzazione planimetrie", en: "Planning: layout optimisation" },
      { it: "Marketing: render, brochure, video", en: "Marketing: renders, brochure, film" },
      { it: "Tariffe a volume per agenzie e imprese", en: "Volume rates for agencies and builders" },
      { it: "Referente dedicato", en: "Dedicated contact" },
    ],
    forSegments: ["developers", "construction", "realEstate"],
  },
];

/* ───────── FAQ ───────── */
export type Faq = { q: L; a: L; segments?: SegmentId[] };

export const faqs: Faq[] = [
  {
    q: { it: "Cosa serve per iniziare?", en: "What do you need to get started?" },
    a: {
      it: "Una planimetria (anche catastale o uno schizzo quotato) e qualche foto. Se non avete la pianta, bastano misure e foto di ogni ambiente.",
      en: "A floor plan (even a cadastral plan or a dimensioned sketch) and a few photos. No plan? Measurements and photos of each room are enough.",
    },
  },
  {
    q: { it: "In quanto tempo ricevo il concept?", en: "How fast will I get the concept?" },
    a: {
      it: "Il concept planimetrico in 48–72 ore lavorative dalla ricezione dei materiali. Render e presentazione richiedono qualche giorno in più.",
      en: "The layout concept in 48–72 working hours after we receive your material. Renders and presentation take a few more days.",
    },
  },
  {
    q: { it: "Sono immagini generate con l'intelligenza artificiale?", en: "Are these AI-generated images?" },
    a: {
      it: "No. Ogni immagine nasce da un progetto architettonico con misure reali, muri, aperture e impianti. Usiamo strumenti digitali avanzati, ma la soluzione è progettata da architetti.",
      en: "No. Every image comes from an architectural design with real dimensions, walls, openings and services. We use advanced digital tools, but the solution is designed by architects.",
    },
  },
  {
    q: { it: "Serve un sopralluogo?", en: "Do you need a site visit?" },
    a: {
      it: "Di norma no: lavoriamo da remoto su planimetrie e foto. Per immobili in Liguria possiamo organizzare un sopralluogo su richiesta.",
      en: "Usually not: we work remotely from plans and photos. For properties in Liguria we can arrange a visit on request.",
    },
  },
  {
    q: { it: "Il concept sostituisce il progetto per le pratiche edilizie?", en: "Does the concept replace the permit drawings?" },
    a: {
      it: "No, il concept è uno studio di fattibilità e di comunicazione. Può diventare la base del progetto esecutivo e delle pratiche, che possiamo seguire separatamente.",
      en: "No, the concept is a feasibility and communication study. It can become the basis for detailed design and permits, which we can handle separately.",
    },
  },
  {
    q: { it: "Posso usare render e presentazione con il mio marchio?", en: "Can I use renders and presentation under my brand?" },
    a: {
      it: "Sì. Per agenzie e imprese prepariamo i materiali con il vostro logo, pronti per portali, social e preventivi.",
      en: "Yes. For agencies and builders we prepare materials with your logo, ready for portals, social and quotes.",
    },
    segments: ["realEstate", "construction", "developers"],
  },
  {
    q: { it: "Come funzionano pagamento e modifiche?", en: "How do payment and revisions work?" },
    a: {
      it: "Dopo la richiesta inviamo un preventivo fisso. Si paga un acconto all'avvio e il saldo alla consegna. Ogni pacchetto include un giro di modifiche.",
      en: "After your request we send a fixed quote. A deposit at the start, the balance on delivery. Every package includes one round of revisions.",
    },
  },
  {
    q: { it: "Lavorate anche fuori dalla Liguria?", en: "Do you work outside Liguria?" },
    a: {
      it: "Sì, lavorando da remoto possiamo seguire immobili in tutta Italia e in Costa Azzurra. La Riviera di Ponente è il nostro mercato principale.",
      en: "Yes, working remotely we handle properties across Italy and the Côte d'Azur. The western Riviera is our home market.",
    },
  },
];

/* ───────── Films ───────── */
export type Film = { title: L; text: L; duration: string; poster: Img; videoUrl?: string };

export const films: Film[] = [
  {
    title: { it: "Residenza Collina — teaser di lancio", en: "Residenza Collina — launch teaser" },
    text: { it: "Walkthrough esterno e tipologie per la pre-vendita.", en: "Exterior walkthrough and unit types for pre-sales." },
    duration: "0:45",
    poster: IMG.houseCube,
  },
  {
    title: { it: "Villa sul mare — dal rilievo al render", en: "Seaside villa — from survey to render" },
    text: { it: "La trasformazione raccontata in un minuto.", en: "The transformation told in one minute." },
    duration: "1:02",
    poster: IMG.houseDusk,
  },
  {
    title: { it: "Attico Porto Vecchio — reel 9:16", en: "Porto Vecchio penthouse — 9:16 reel" },
    text: { it: "Formato verticale per Instagram e TikTok.", en: "Vertical format for Instagram and TikTok." },
    duration: "0:20",
    poster: IMG.living2,
  },
  {
    title: { it: "Loft ex magazzino — concept film", en: "Warehouse loft — concept film" },
    text: { it: "Doppie altezze e cortile interno.", en: "Double heights and inner courtyard." },
    duration: "0:58",
    poster: IMG.living4,
  },
];

/* ───────── Process ───────── */
export const processSteps: { title: L; text: L; time: L }[] = [
  {
    title: { it: "Inviate i materiali", en: "Send your material" },
    text: { it: "Planimetria, misure o foto tramite il modulo.", en: "Plan, measurements or photos via the form." },
    time: { it: "5 minuti", en: "5 minutes" },
  },
  {
    title: { it: "Preventivo fisso", en: "Fixed quote" },
    text: { it: "Vi rispondiamo con prezzo e tempi certi.", en: "We reply with a firm price and timing." },
    time: { it: "entro 24 ore", en: "within 24 hours" },
  },
  {
    title: { it: "Concept planimetrico", en: "Layout concept" },
    text: { it: "Varianti di distribuzione con misure reali.", en: "Layout options with real dimensions." },
    time: { it: "48–72 ore", en: "48–72 hours" },
  },
  {
    title: { it: "3D e render", en: "3D and renders" },
    text: { it: "Modello e immagini fotorealistiche.", en: "Model and photorealistic images." },
    time: { it: "3–5 giorni", en: "3–5 days" },
  },
  {
    title: { it: "Presentazione", en: "Presentation" },
    text: { it: "Dossier PDF pronto da inviare.", en: "A PDF dossier ready to send." },
    time: { it: "+1–2 giorni", en: "+1–2 days" },
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
