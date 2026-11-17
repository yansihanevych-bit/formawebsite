import type { L } from "@/lib/i18n";
import { IMG, type Img } from "./images";
import type { SegmentId } from "./segments";
import type { ServiceId } from "./services";

/**
 * Кейсы. Сейчас — демонстрационные тексты и тематические заглушки.
 * Заменить на реальные проекты (или перенести в Sanity, схема полей та же).
 */
export type Project = {
  slug: string;
  title: L;
  location: string;
  propertyType: L;
  area: number; // m²
  year: number;
  turnaround: L;
  segments: SegmentId[];
  services: ServiceId[];
  featured?: boolean;
  intro: L;
  more: L;
  challenge: L;
  solution: L;
  result: L;
  cover: Img;
  hero: Img[];
  before: Img; // исходное состояние / план
  after: Img; // концепция / визуал
  gallery: Img[];
};

export const projects: Project[] = [
  {
    slug: "villa-mare-bordighera",
    title: { it: "Villa sul mare", en: "Seaside villa" },
    location: "Bordighera",
    propertyType: { it: "Villa", en: "Villa" },
    area: 180,
    year: 2026,
    turnaround: { it: "5 giorni", en: "5 days" },
    segments: ["homeowners", "realEstate"],
    services: ["concept", "model3d", "render", "presentation"],
    featured: true,
    intro: {
      it: "Una villa degli anni '70 affacciata sul mare, con ambienti frammentati e poca luce. L'obiettivo: aprire la zona giorno verso la terrazza.",
      en: "A 1970s villa overlooking the sea, with fragmented rooms and little light. The goal: open the living area onto the terrace.",
    },
    more: {
      it: "Abbiamo lavorato da planimetria catastale e foto inviate dal proprietario, senza sopralluogo. In 48 ore il concept, in 5 giorni il dossier completo con render e presentazione.",
      en: "We worked from the cadastral plan and photos sent by the owner, with no site visit. Concept in 48 hours, full dossier with renders and presentation in 5 days.",
    },
    challenge: {
      it: "Zona giorno divisa in tre stanze, cucina chiusa e vista mare sfruttata solo da una finestra.",
      en: "Living area split into three rooms, a closed kitchen and the sea view used by a single window.",
    },
    solution: {
      it: "Demolizione di due tramezzi non portanti, cucina a isola sull'asse della terrazza, nuove aperture a tutta altezza.",
      en: "Two non-structural partitions removed, island kitchen aligned with the terrace, new full-height openings.",
    },
    result: {
      it: "Un unico ambiente di 62 m² con vista mare da ogni punto; il proprietario ha usato il dossier per chiedere i preventivi.",
      en: "A single 62 m² space with sea views throughout; the owner used the dossier to request quotes.",
    },
    cover: IMG.villaPool,
    hero: [IMG.villaPool, IMG.living7, IMG.kitchen3],
    before: IMG.plans,
    after: IMG.living7,
    gallery: [IMG.living7, IMG.kitchen3, IMG.living1, IMG.bedroom1, IMG.bath, IMG.houseTerrace, IMG.detail, IMG.villaPool],
  },
  {
    slug: "appartamento-corso-imperatrice",
    title: { it: "Appartamento Corso Imperatrice", en: "Corso Imperatrice apartment" },
    location: "Sanremo",
    propertyType: { it: "Appartamento", en: "Apartment" },
    area: 95,
    year: 2026,
    turnaround: { it: "72 ore", en: "72 hours" },
    segments: ["realEstate", "investors"],
    services: ["concept", "render", "presentation"],
    featured: true,
    intro: {
      it: "Un trilocale d'epoca da ristrutturare, in vendita da mesi. L'agenzia ci ha chiesto di mostrarne il potenziale.",
      en: "A period three-room flat in need of renovation, on the market for months. The agency asked us to show its potential.",
    },
    more: {
      it: "Concept con due varianti (bilocale + studio, trilocale aperto), quattro render e una presentazione con il logo dell'agenzia, pronta per il portale.",
      en: "Concept with two options (one-bed + studio, open three-room), four renders and a presentation with the agency's branding, ready for the portals.",
    },
    challenge: {
      it: "Corridoio lungo e buio, bagno cieco, stato attuale poco fotogenico.",
      en: "Long dark corridor, windowless bathroom, an unphotogenic current state.",
    },
    solution: {
      it: "Corridoio eliminato, zona giorno passante sui due affacci, secondo bagno ricavato dal ripostiglio.",
      en: "Corridor removed, dual-aspect living room, second bathroom carved out of the storage room.",
    },
    result: {
      it: "Annuncio aggiornato con render “dopo”: più richieste di visita nelle prime settimane.",
      en: "Listing updated with “after” renders: more viewing requests in the first weeks.",
    },
    cover: IMG.living5,
    hero: [IMG.living5, IMG.kitchen1, IMG.bedroom2],
    before: IMG.plans,
    after: IMG.living5,
    gallery: [IMG.living5, IMG.kitchen1, IMG.bedroom2, IMG.living6, IMG.interior11, IMG.chair],
  },
  {
    slug: "residenza-collina-ospedaletti",
    title: { it: "Residenza Collina", en: "Residenza Collina" },
    location: "Ospedaletti",
    propertyType: { it: "Complesso residenziale · 24 unità", en: "Residential development · 24 units" },
    area: 2150,
    year: 2026,
    turnaround: { it: "3 settimane", en: "3 weeks" },
    segments: ["developers"],
    services: ["concept", "model3d", "render", "presentation", "film"],
    featured: true,
    intro: {
      it: "Un nuovo complesso di 24 unità sulla collina. Il developer cercava un mix tipologico più vendibile e materiali per la pre-vendita.",
      en: "A new 24-unit development on the hillside. The developer wanted a more sellable unit mix and pre-sales material.",
    },
    more: {
      it: "Planning: revisione di tutte le piante tipo. Marketing: render esterni, interni per tipologia, brochure e un video di lancio.",
      en: "Planning: revision of every typical plan. Marketing: exterior renders, interiors per type, brochure and a launch film.",
    },
    challenge: {
      it: "Tagli troppo grandi per il mercato locale e piante con superfici di distribuzione elevate.",
      en: "Units too large for the local market and plans with excessive circulation space.",
    },
    solution: {
      it: "Nuovo mix con più bilocali e trilocali compatti, distribuzioni più efficienti e terrazze più profonde.",
      en: "New mix with more compact one- and two-bed units, more efficient layouts and deeper terraces.",
    },
    result: {
      it: "Da 20 a 24 unità vendibili sulla stessa superficie e un kit completo per la campagna.",
      en: "From 20 to 24 sellable units on the same footprint and a complete campaign kit.",
    },
    cover: IMG.building,
    hero: [IMG.building, IMG.houseCube, IMG.living3],
    before: IMG.sketch,
    after: IMG.houseCube,
    gallery: [IMG.houseCube, IMG.building, IMG.living3, IMG.kitchen4, IMG.living9, IMG.houseFacade, IMG.facade2],
  },
  {
    slug: "casa-di-paese-ventimiglia",
    title: { it: "Casa di paese", en: "Village house" },
    location: "Ventimiglia Alta",
    propertyType: { it: "Casa su tre livelli", en: "Three-storey house" },
    area: 140,
    year: 2025,
    turnaround: { it: "4 giorni", en: "4 days" },
    segments: ["investors", "realEstate"],
    services: ["concept", "render", "presentation"],
    intro: {
      it: "Una casa in pietra nel centro storico. L'investitore voleva sapere se fosse possibile ricavare due unità indipendenti.",
      en: "A stone house in the old town. The investor wanted to know whether two independent units were possible.",
    },
    more: {
      it: "Tre scenari a confronto: unità unica, due unità sovrapposte, unità + affittacamere. Con superfici, render e una nota sui vincoli.",
      en: "Three scenarios compared: single unit, two stacked units, unit + guest rooms. With areas, renders and a note on constraints.",
    },
    challenge: {
      it: "Scala interna stretta, muri portanti spessi, vincoli del centro storico.",
      en: "Narrow internal stair, thick load-bearing walls, old-town restrictions.",
    },
    solution: {
      it: "Ingresso indipendente dal vicolo per il piano terra, scala esistente mantenuta per i piani superiori.",
      en: "Independent entrance from the alley for the ground floor, existing stair kept for the upper floors.",
    },
    result: {
      it: "Scenario a due unità confermato prima dell'offerta d'acquisto.",
      en: "Two-unit scenario confirmed before the purchase offer.",
    },
    cover: IMG.street,
    hero: [IMG.street, IMG.living10, IMG.bedroom1],
    before: IMG.site,
    after: IMG.living10,
    gallery: [IMG.living10, IMG.bedroom1, IMG.kitchen2, IMG.detail, IMG.street],
  },
  {
    slug: "attico-porto-vecchio",
    title: { it: "Attico Porto Vecchio", en: "Porto Vecchio penthouse" },
    location: "Sanremo",
    propertyType: { it: "Attico", en: "Penthouse" },
    area: 120,
    year: 2025,
    turnaround: { it: "72 ore", en: "72 hours" },
    segments: ["construction", "homeowners"],
    services: ["concept", "model3d", "render"],
    featured: true,
    intro: {
      it: "Un'impresa edile doveva presentare il preventivo per la ristrutturazione completa di un attico con terrazza sul porto.",
      en: "A builder needed to present a quote for the full renovation of a penthouse with a terrace over the harbour.",
    },
    more: {
      it: "Concept e render allegati al preventivo con il marchio dell'impresa. Il cliente ha scelto le finiture direttamente sulle immagini.",
      en: "Concept and renders attached to the quote under the builder's brand. The client chose finishes directly on the images.",
    },
    challenge: {
      it: "Cliente indeciso tra tre imprese con preventivi simili.",
      en: "A client undecided between three builders with similar quotes.",
    },
    solution: {
      it: "Proposta visiva completa in 72 ore: distribuzione, cucina, bagno padronale e terrazza.",
      en: "A complete visual proposal in 72 hours: layout, kitchen, master bathroom and terrace.",
    },
    result: {
      it: "Contratto firmato con l'impresa che ha presentato la proposta visiva.",
      en: "Contract signed with the builder who presented the visual proposal.",
    },
    cover: IMG.living2,
    hero: [IMG.living2, IMG.kitchen1, IMG.bath],
    before: IMG.plans,
    after: IMG.living2,
    gallery: [IMG.living2, IMG.kitchen1, IMG.bath, IMG.living8, IMG.vertical, IMG.houseTerrace],
  },
  {
    slug: "loft-ex-magazzino",
    title: { it: "Loft ex magazzino", en: "Warehouse loft" },
    location: "Ventimiglia",
    propertyType: { it: "Ex magazzino → 3 loft", en: "Former warehouse → 3 lofts" },
    area: 210,
    year: 2025,
    turnaround: { it: "1 settimana", en: "1 week" },
    segments: ["investors", "construction", "developers"],
    services: ["concept", "model3d", "render", "presentation"],
    intro: {
      it: "Un magazzino dismesso a pochi passi dal mare, da trasformare in residenze. Analisi di fattibilità planimetrica e materiali per la vendita.",
      en: "A disused warehouse near the sea, to be converted into homes. Layout feasibility study and sales material.",
    },
    more: {
      it: "Studio di tre loft con soppalco, render interni e una presentazione per i potenziali acquirenti su carta.",
      en: "Study of three lofts with mezzanines, interior renders and a presentation for off-plan buyers.",
    },
    challenge: {
      it: "Pianta profonda con luce solo sul fronte strada.",
      en: "Deep plan with light only from the street front.",
    },
    solution: {
      it: "Cortile interno ricavato al centro, tre loft passanti con doppia altezza.",
      en: "An internal courtyard carved out in the middle, three dual-aspect double-height lofts.",
    },
    result: {
      it: "Progetto presentato a banca e acquirenti; due loft prenotati su carta.",
      en: "Project presented to the bank and buyers; two lofts reserved off-plan.",
    },
    cover: IMG.living4,
    hero: [IMG.living4, IMG.living9, IMG.office],
    before: IMG.site,
    after: IMG.living4,
    gallery: [IMG.living4, IMG.living9, IMG.kitchen2, IMG.living3, IMG.chair, IMG.architecture],
  },
];

export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug);
