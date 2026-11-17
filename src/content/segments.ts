import type { L } from "@/lib/i18n";
import { IMG, type Img } from "./images";
import type { ServiceId } from "./services";

export type SegmentId = "realEstate" | "construction" | "developers" | "investors" | "homeowners";

export type Segment = {
  id: SegmentId;
  slug: string;
  n: string;
  label: L; // короткое имя в меню
  who: L; // «Sono un…»
  title: L; // H1 посадочной
  lead: L;
  pains: L[];
  outcomes: { title: L; text: L }[];
  services: ServiceId[];
  projects: string[]; // slugs
  priceFrom: L;
  image: Img;
  /** только для девелоперов: два оффера */
  tracks?: { id: string; title: L; text: L; points: L[] }[];
};

export const segments: Segment[] = [
  {
    id: "realEstate",
    slug: "real-estate",
    n: "01",
    label: { it: "Agenzie immobiliari", en: "Real estate agencies" },
    who: { it: "Sono un agente immobiliare", en: "I'm a real estate agent" },
    title: {
      it: "Immobili da ristrutturare che si vendono come nuovi",
      en: "Properties to renovate that sell like new",
    },
    lead: {
      it: "Concept planimetrico, render e presentazione PDF in pochi giorni: mostrate ai clienti il potenziale dell'immobile, non le sue crepe.",
      en: "Layout concept, renders and a PDF presentation in days: show buyers the property's potential, not its cracks.",
    },
    pains: [
      { it: "Le foto dello stato attuale scoraggiano gli acquirenti", en: "Photos of the current state put buyers off" },
      { it: "I clienti non riescono a immaginare la ristrutturazione", en: "Clients can't picture the renovation" },
      { it: "Annunci simili, nessuna differenza sul portale", en: "Listings look the same on the portals" },
    ],
    outcomes: [
      {
        title: { it: "Annuncio che si distingue", en: "A listing that stands out" },
        text: { it: "Render “dopo” accanto alle foto “prima” su Immobiliare.it, Idealista e social.", en: "“After” renders next to “before” photos on portals and social." },
      },
      {
        title: { it: "Trattativa più rapida", en: "Faster negotiation" },
        text: { it: "Il cliente vede una soluzione concreta e realizzabile, con misure reali.", en: "Buyers see a concrete, buildable solution with real dimensions." },
      },
      {
        title: { it: "Più incarichi", en: "More mandates" },
        text: { it: "Un servizio in più da proporre ai proprietari in fase di acquisizione.", en: "An extra service to offer owners when you pitch for the listing." },
      },
    ],
    services: ["concept", "render", "presentation"],
    projects: ["appartamento-corso-imperatrice", "villa-mare-bordighera", "casa-di-paese-ventimiglia"],
    priceFrom: { it: "da € 390", en: "from € 390" },
    image: IMG.living5,
  },
  {
    id: "construction",
    slug: "construction",
    n: "02",
    label: { it: "Imprese edili", en: "Construction companies" },
    who: { it: "Sono un'impresa edile", en: "I'm a builder" },
    title: {
      it: "Mostrate il lavoro finito prima di firmare il contratto",
      en: "Show the finished job before the contract is signed",
    },
    lead: {
      it: "Visualizzazioni della ristrutturazione da allegare al preventivo: il cliente capisce cosa compra e il vostro preventivo vince.",
      en: "Renovation visuals to attach to your quote: the client understands what they're buying and your offer wins.",
    },
    pains: [
      { it: "Preventivi confrontati solo sul prezzo", en: "Quotes compared on price alone" },
      { it: "Clienti indecisi che rimandano", en: "Undecided clients who keep postponing" },
      { it: "Varianti in corso d'opera per incomprensioni", en: "Mid-project changes caused by misunderstandings" },
    ],
    outcomes: [
      {
        title: { it: "Offerta commerciale più forte", en: "A stronger commercial offer" },
        text: { it: "Concept e render inclusi nel preventivo con il vostro marchio.", en: "Concept and renders included in your quote, under your brand." },
      },
      {
        title: { it: "Meno varianti", en: "Fewer variations" },
        text: { it: "Finiture e distribuzione condivise prima di iniziare il cantiere.", en: "Finishes and layout agreed before work starts." },
      },
      {
        title: { it: "Tempi da impresa", en: "Builder-friendly timing" },
        text: { it: "Prima proposta in 48–72 ore, per non perdere il cliente.", en: "First proposal in 48–72 hours, so you don't lose the client." },
      },
    ],
    services: ["concept", "model3d", "render"],
    projects: ["attico-porto-vecchio", "loft-ex-magazzino", "villa-mare-bordighera"],
    priceFrom: { it: "da € 490", en: "from € 490" },
    image: IMG.kitchen3,
  },
  {
    id: "developers",
    slug: "developers",
    n: "03",
    label: { it: "Developer", en: "Developers" },
    who: { it: "Sono un developer", en: "I'm a developer" },
    title: {
      it: "Planimetrie ottimizzate e marketing per nuovi complessi",
      en: "Optimised layouts and marketing for new developments",
    },
    lead: {
      it: "Due servizi distinti: ottimizziamo il mix di unità e le distribuzioni, poi confezioniamo il progetto per la vendita.",
      en: "Two distinct services: we optimise unit mix and layouts, then package the project for sale.",
    },
    pains: [
      { it: "Metri quadri non valorizzati nelle planimetrie", en: "Square metres wasted in the layouts" },
      { it: "Pre-vendita senza materiali convincenti", en: "Pre-sales without convincing materials" },
      { it: "Tempi lunghi con studi tradizionali", en: "Long lead times with traditional studios" },
    ],
    outcomes: [
      {
        title: { it: "Più valore per m²", en: "More value per m²" },
        text: { it: "Distribuzioni che aumentano unità vendibili e appeal.", en: "Layouts that increase sellable units and appeal." },
      },
      {
        title: { it: "Kit di vendita completo", en: "Complete sales kit" },
        text: { it: "Render, planimetrie commerciali, brochure e video per ogni tipologia.", en: "Renders, sales plans, brochure and film for every unit type." },
      },
      {
        title: { it: "Un unico interlocutore", en: "One partner" },
        text: { it: "Dall'analisi planimetrica al materiale per la campagna.", en: "From layout analysis to campaign assets." },
      },
    ],
    tracks: [
      {
        id: "planning",
        title: { it: "Planning", en: "Planning" },
        text: { it: "Ottimizzazione delle planimetrie e del mix di unità.", en: "Layout and unit-mix optimisation." },
        points: [
          { it: "Analisi del lotto o dell'edificio esistente", en: "Analysis of the plot or existing building" },
          { it: "Studio del mix tipologico", en: "Unit-mix study" },
          { it: "Planimetrie per piano e per unità", en: "Floor and unit plans" },
        ],
      },
      {
        id: "marketing",
        title: { it: "Marketing", en: "Marketing" },
        text: { it: "Packaging commerciale del complesso residenziale.", en: "Commercial packaging of the development." },
        points: [
          { it: "Render esterni e interni per tipologia", en: "Exterior and interior renders per type" },
          { it: "Brochure e planimetrie commerciali", en: "Brochure and sales plans" },
          { it: "Video e reel per il lancio", en: "Launch film and reels" },
        ],
      },
    ],
    services: ["concept", "model3d", "render", "presentation", "film"],
    projects: ["residenza-collina-ospedaletti", "loft-ex-magazzino"],
    priceFrom: { it: "su preventivo", en: "on request" },
    image: IMG.building,
  },
  {
    id: "investors",
    slug: "investors",
    n: "04",
    label: { it: "Investitori", en: "Investors" },
    who: { it: "Sono un investitore", en: "I'm an investor" },
    title: {
      it: "Scoprite il potenziale di un immobile prima di comprarlo",
      en: "See a property's potential before you buy",
    },
    lead: {
      it: "Un'analisi planimetrica rapida per capire quante unità, quali distribuzioni e quale valore si possono ottenere.",
      en: "A fast layout analysis to understand how many units, which layouts and what value you can unlock.",
    },
    pains: [
      { it: "Decisioni d'acquisto prese “a occhio”", en: "Purchase decisions made by gut feeling" },
      { it: "Rischio di frazionamenti non realizzabili", en: "Risk of unworkable subdivisions" },
      { it: "Serve materiale per banche e soci", en: "You need material for banks and partners" },
    ],
    outcomes: [
      {
        title: { it: "Scenari a confronto", en: "Scenarios compared" },
        text: { it: "Più ipotesi di distribuzione o frazionamento, con superfici.", en: "Several layout or subdivision options, with areas." },
      },
      {
        title: { it: "Decisione informata", en: "An informed decision" },
        text: { it: "Prima dell'offerta, non dopo il rogito.", en: "Before the offer, not after completion." },
      },
      {
        title: { it: "Dossier per finanziatori", en: "A dossier for lenders" },
        text: { it: "Presentazione chiara da mostrare a banche e partner.", en: "A clear presentation for banks and partners." },
      },
    ],
    services: ["concept", "render", "presentation"],
    projects: ["casa-di-paese-ventimiglia", "loft-ex-magazzino", "appartamento-corso-imperatrice"],
    priceFrom: { it: "da € 390", en: "from € 390" },
    image: IMG.site,
  },
  {
    id: "homeowners",
    slug: "homeowners",
    n: "05",
    label: { it: "Privati", en: "Homeowners" },
    who: { it: "Sono un privato", en: "I'm a homeowner" },
    title: {
      it: "Un concept per la vostra casa, prima del progetto completo",
      en: "A concept for your home, before the full project",
    },
    lead: {
      it: "Avete comprato o state per comprare? In pochi giorni vedete come può diventare la casa e con quale distribuzione.",
      en: "Just bought, or about to? In a few days you'll see what your home can become and how it could be laid out.",
    },
    pains: [
      { it: "Non sapete da dove iniziare", en: "You don't know where to start" },
      { it: "Un progetto completo costa e richiede settimane", en: "A full project is costly and takes weeks" },
      { it: "Difficile spiegare le idee all'impresa", en: "Hard to explain your ideas to builders" },
    ],
    outcomes: [
      {
        title: { it: "Idee chiare", en: "Clear ideas" },
        text: { it: "Distribuzione, stile e finiture visualizzati.", en: "Layout, style and finishes, visualised." },
      },
      {
        title: { it: "Budget sotto controllo", en: "Budget under control" },
        text: { it: "Una base concreta per chiedere preventivi confrontabili.", en: "A concrete basis for comparable quotes." },
      },
      {
        title: { it: "Pronti per il progetto", en: "Ready for the full project" },
        text: { it: "Il concept diventa il punto di partenza del progetto esecutivo.", en: "The concept becomes the starting point for detailed design." },
      },
    ],
    services: ["concept", "render"],
    projects: ["villa-mare-bordighera", "attico-porto-vecchio", "appartamento-corso-imperatrice"],
    priceFrom: { it: "da € 390", en: "from € 390" },
    image: IMG.living7,
  },
];

export const segmentById = (id: SegmentId) => segments.find((s) => s.id === id)!;
export const segmentBySlug = (slug: string) => segments.find((s) => s.slug === slug);
