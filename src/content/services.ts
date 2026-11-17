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
    title: { it: "Concept planimetrico", en: "Layout concept" },
    short: { it: "La soluzione architettonica, prima di tutto.", en: "The architectural solution comes first." },
    body: {
      it: "Analizziamo planimetria e vincoli e proponiamo una o più distribuzioni realistiche: muri, aperture, impianti, misure reali. È la base di tutto il resto.",
      en: "We study the plan and its constraints and propose one or more realistic layouts: walls, openings, services, real dimensions. Everything else is built on it.",
    },
    includes: [
      { it: "Rilievo da planimetria, misure o foto", en: "Survey from plan, measurements or photos" },
      { it: "1–3 varianti di distribuzione", en: "1–3 layout options" },
      { it: "Planimetria arredata quotata", en: "Furnished, dimensioned plan" },
    ],
    timing: { it: "48–72 ore", en: "48–72 hours" },
    image: IMG.plans,
  },
  {
    id: "model3d",
    n: "02",
    title: { it: "Modello 3D", en: "3D model" },
    short: { it: "Volumi e spazi leggibili da chiunque.", en: "Spaces anyone can read." },
    body: {
      it: "Trasformiamo il concept in un modello tridimensionale fedele, utile per valutare proporzioni, luce e percorsi, e per comunicare il progetto a clienti e imprese.",
      en: "We turn the concept into an accurate 3D model to assess proportions, light and flow — and to explain the project to clients and contractors.",
    },
    includes: [
      { it: "Modello in scala dell'immobile", en: "To-scale model of the property" },
      { it: "Viste assonometriche e spaccati", en: "Axonometric and cut-away views" },
      { it: "Varianti di finiture", en: "Finish variations" },
    ],
    timing: { it: "3–5 giorni", en: "3–5 days" },
    image: IMG.architecture,
  },
  {
    id: "render",
    n: "03",
    title: { it: "Render fotorealistici", en: "Photorealistic renders" },
    short: { it: "Come sarà, prima che esista.", en: "What it will be, before it exists." },
    body: {
      it: "Immagini fotorealistiche costruite sul progetto, non generate a caso: ogni render corrisponde a una pianta reale e realizzabile.",
      en: "Photorealistic images built on the design, not generated at random: every render matches a real, buildable plan.",
    },
    includes: [
      { it: "Render interni ed esterni", en: "Interior and exterior renders" },
      { it: "Formati per portali e social", en: "Formats for portals and social" },
      { it: "Confronto prima / dopo", en: "Before / after comparison" },
    ],
    timing: { it: "3–7 giorni", en: "3–7 days" },
    image: IMG.living2,
  },
  {
    id: "presentation",
    n: "04",
    title: { it: "Presentazione PDF", en: "PDF presentation" },
    short: { it: "Un dossier pronto per vendere.", en: "A dossier ready to sell." },
    body: {
      it: "Impaginiamo stato attuale, concept, render e dati chiave in una presentazione elegante, pronta da inviare a clienti, investitori o banche.",
      en: "We lay out current state, concept, renders and key figures in an elegant presentation, ready for clients, investors or banks.",
    },
    includes: [
      { it: "Layout brandizzabile (anche con il vostro logo)", en: "Brandable layout (with your logo too)" },
      { it: "Versione IT / EN", en: "IT / EN version" },
      { it: "Ottimizzata per email e stampa", en: "Optimised for email and print" },
    ],
    timing: { it: "+1–2 giorni", en: "+1–2 days" },
    image: IMG.office,
  },
  {
    id: "film",
    n: "05",
    title: { it: "Video architettonici", en: "Architectural films" },
    short: { it: "Il progetto in movimento.", en: "The project in motion." },
    body: {
      it: "Brevi film e reel che raccontano lo spazio: ideali per lanci di nuovi complessi, campagne social e presentazioni.",
      en: "Short films and reels that tell the story of a space — ideal for development launches, social campaigns and presentations.",
    },
    includes: [
      { it: "Walkthrough 3D animato", en: "Animated 3D walkthrough" },
      { it: "Reel verticali 9:16", en: "Vertical 9:16 reels" },
      { it: "Musica e titoli", en: "Music and titles" },
    ],
    timing: { it: "1–2 settimane", en: "1–2 weeks" },
    image: IMG.houseDusk,
  },
];

export const serviceById = (id: ServiceId) => services.find((s) => s.id === id)!;
