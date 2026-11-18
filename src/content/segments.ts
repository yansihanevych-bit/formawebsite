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
    label: { it: "Agenzie immobiliari", en: "Real estate agencies", ru: "Агентства недвижимости" },
    who: { it: "Sono un agente immobiliare", en: "I'm a real estate agent", ru: "Я риелтор" },
    title: {
      it: "Immobili da ristrutturare che si vendono come nuovi",
      en: "Properties to renovate that sell like new", ru: "Объекты под ремонт, которые продаются как новые",
    },
    lead: {
      it: "Concept planimetrico, render e presentazione PDF in pochi giorni: mostrate ai clienti il potenziale dell'immobile, non le sue crepe.",
      en: "Layout concept, renders and a PDF presentation in days: show buyers the property's potential, not its cracks.", ru: "Планировочная концепция, рендеры и PDF-презентация за несколько дней: покажите покупателям потенциал объекта, а не его трещины.",
    },
    pains: [
      { it: "Le foto dello stato attuale scoraggiano gli acquirenti", en: "Photos of the current state put buyers off", ru: "Фото текущего состояния отпугивают покупателей" },
      { it: "I clienti non riescono a immaginare la ristrutturazione", en: "Clients can't picture the renovation", ru: "Клиенты не могут представить ремонт" },
      { it: "Annunci simili, nessuna differenza sul portale", en: "Listings look the same on the portals", ru: "Объявления на порталах выглядят одинаково" },
    ],
    outcomes: [
      {
        title: { it: "Annuncio che si distingue", en: "A listing that stands out", ru: "Объявление, которое выделяется" },
        text: { it: "Render “dopo” accanto alle foto “prima” su Immobiliare.it, Idealista e social.", en: "“After” renders next to “before” photos on portals and social.", ru: "Рендеры «после» рядом с фото «до» на порталах и в соцсетях." },
      },
      {
        title: { it: "Trattativa più rapida", en: "Faster negotiation", ru: "Быстрее сделка" },
        text: { it: "Il cliente vede una soluzione concreta e realizzabile, con misure reali.", en: "Buyers see a concrete, buildable solution with real dimensions.", ru: "Покупатель видит конкретное, выполнимое решение с реальными размерами." },
      },
      {
        title: { it: "Più incarichi", en: "More mandates", ru: "Больше эксклюзивов" },
        text: { it: "Un servizio in più da proporre ai proprietari in fase di acquisizione.", en: "An extra service to offer owners when you pitch for the listing.", ru: "Дополнительная услуга, которую можно предложить собственнику при получении объекта." },
      },
    ],
    services: ["concept", "render", "presentation"],
    projects: ["appartamento-corso-imperatrice", "villa-mare-bordighera", "casa-di-paese-ventimiglia"],
    priceFrom: { it: "da € 390", en: "from € 390", ru: "от € 390" },
    image: IMG.living5,
  },
  {
    id: "construction",
    slug: "construction",
    n: "02",
    label: { it: "Imprese edili", en: "Construction companies", ru: "Строительные компании" },
    who: { it: "Sono un'impresa edile", en: "I'm a builder", ru: "Я строитель" },
    title: {
      it: "Mostrate il lavoro finito prima di firmare il contratto",
      en: "Show the finished job before the contract is signed", ru: "Покажите готовый результат до подписания договора",
    },
    lead: {
      it: "Visualizzazioni della ristrutturazione da allegare al preventivo: il cliente capisce cosa compra e il vostro preventivo vince.",
      en: "Renovation visuals to attach to your quote: the client understands what they're buying and your offer wins.", ru: "Визуализации ремонта к вашему коммерческому предложению: клиент понимает, что покупает, и ваше КП выигрывает.",
    },
    pains: [
      { it: "Preventivi confrontati solo sul prezzo", en: "Quotes compared on price alone", ru: "КП сравнивают только по цене" },
      { it: "Clienti indecisi che rimandano", en: "Undecided clients who keep postponing", ru: "Нерешительные клиенты откладывают решение" },
      { it: "Varianti in corso d'opera per incomprensioni", en: "Mid-project changes caused by misunderstandings", ru: "Переделки по ходу работ из-за недопонимания" },
    ],
    outcomes: [
      {
        title: { it: "Offerta commerciale più forte", en: "A stronger commercial offer", ru: "Сильнее коммерческое предложение" },
        text: { it: "Concept e render inclusi nel preventivo con il vostro marchio.", en: "Concept and renders included in your quote, under your brand.", ru: "Концепция и рендеры в вашем КП, под вашим брендом." },
      },
      {
        title: { it: "Meno varianti", en: "Fewer variations", ru: "Меньше переделок" },
        text: { it: "Finiture e distribuzione condivise prima di iniziare il cantiere.", en: "Finishes and layout agreed before work starts.", ru: "Отделка и планировка согласованы до начала работ." },
      },
      {
        title: { it: "Tempi da impresa", en: "Builder-friendly timing", ru: "Сроки, удобные строителю" },
        text: { it: "Prima proposta in 48–72 ore, per non perdere il cliente.", en: "First proposal in 48–72 hours, so you don't lose the client.", ru: "Первое предложение за 48–72 часа — чтобы не потерять клиента." },
      },
    ],
    services: ["concept", "model3d", "render"],
    projects: ["attico-porto-vecchio", "loft-ex-magazzino", "villa-mare-bordighera"],
    priceFrom: { it: "da € 490", en: "from € 490", ru: "от € 490" },
    image: IMG.kitchen3,
  },
  {
    id: "developers",
    slug: "developers",
    n: "03",
    label: { it: "Developer", en: "Developers", ru: "Девелоперы" },
    who: { it: "Sono un developer", en: "I'm a developer", ru: "Я девелопер" },
    title: {
      it: "Planimetrie ottimizzate e marketing per nuovi complessi",
      en: "Optimised layouts and marketing for new developments", ru: "Оптимизация планировок и маркетинг новых комплексов",
    },
    lead: {
      it: "Due servizi distinti: ottimizziamo il mix di unità e le distribuzioni, poi confezioniamo il progetto per la vendita.",
      en: "Two distinct services: we optimise unit mix and layouts, then package the project for sale.", ru: "Две отдельные услуги: оптимизируем квартирографию и планировки, затем упаковываем проект для продаж.",
    },
    pains: [
      { it: "Metri quadri non valorizzati nelle planimetrie", en: "Square metres wasted in the layouts", ru: "Потерянные квадратные метры в планировках" },
      { it: "Pre-vendita senza materiali convincenti", en: "Pre-sales without convincing materials", ru: "Предпродажи без убедительных материалов" },
      { it: "Tempi lunghi con studi tradizionali", en: "Long lead times with traditional studios", ru: "Долгие сроки у традиционных бюро" },
    ],
    outcomes: [
      {
        title: { it: "Più valore per m²", en: "More value per m²", ru: "Больше ценности с каждого м²" },
        text: { it: "Distribuzioni che aumentano unità vendibili e appeal.", en: "Layouts that increase sellable units and appeal.", ru: "Планировки, которые увеличивают число продаваемых квартир и их привлекательность." },
      },
      {
        title: { it: "Kit di vendita completo", en: "Complete sales kit", ru: "Полный комплект для продаж" },
        text: { it: "Render, planimetrie commerciali, brochure e video per ogni tipologia.", en: "Renders, sales plans, brochure and film for every unit type.", ru: "Рендеры, планы для продаж, буклет и видео по каждому типу квартир." },
      },
      {
        title: { it: "Un unico interlocutore", en: "One partner", ru: "Один партнёр" },
        text: { it: "Dall'analisi planimetrica al materiale per la campagna.", en: "From layout analysis to campaign assets.", ru: "От анализа планировок до материалов для кампании." },
      },
    ],
    tracks: [
      {
        id: "planning",
        title: { it: "Planning", en: "Planning", ru: "Planning" },
        text: { it: "Ottimizzazione delle planimetrie e del mix di unità.", en: "Layout and unit-mix optimisation.", ru: "Оптимизация планировок и квартирографии." },
        points: [
          { it: "Analisi del lotto o dell'edificio esistente", en: "Analysis of the plot or existing building", ru: "Анализ участка или существующего здания" },
          { it: "Studio del mix tipologico", en: "Unit-mix study", ru: "Исследование квартирографии" },
          { it: "Planimetrie per piano e per unità", en: "Floor and unit plans", ru: "Поэтажные планы и планы квартир" },
        ],
      },
      {
        id: "marketing",
        title: { it: "Marketing", en: "Marketing", ru: "Marketing" },
        text: { it: "Packaging commerciale del complesso residenziale.", en: "Commercial packaging of the development.", ru: "Коммерческая упаковка жилого комплекса." },
        points: [
          { it: "Render esterni e interni per tipologia", en: "Exterior and interior renders per type", ru: "Рендеры экстерьеров и интерьеров по типам" },
          { it: "Brochure e planimetrie commerciali", en: "Brochure and sales plans", ru: "Буклет и планы для продаж" },
          { it: "Video e reel per il lancio", en: "Launch film and reels", ru: "Видео и рилсы для запуска" },
        ],
      },
    ],
    services: ["concept", "model3d", "render", "presentation", "film"],
    projects: ["residenza-collina-ospedaletti", "loft-ex-magazzino"],
    priceFrom: { it: "su preventivo", en: "on request", ru: "по запросу" },
    image: IMG.building,
  },
  {
    id: "investors",
    slug: "investors",
    n: "04",
    label: { it: "Investitori", en: "Investors", ru: "Инвесторы" },
    who: { it: "Sono un investitore", en: "I'm an investor", ru: "Я инвестор" },
    title: {
      it: "Scoprite il potenziale di un immobile prima di comprarlo",
      en: "See a property's potential before you buy", ru: "Узнайте потенциал объекта до покупки",
    },
    lead: {
      it: "Un'analisi planimetrica rapida per capire quante unità, quali distribuzioni e quale valore si possono ottenere.",
      en: "A fast layout analysis to understand how many units, which layouts and what value you can unlock.", ru: "Быстрый планировочный анализ: сколько квартир, какие планировки и какую стоимость можно получить.",
    },
    pains: [
      { it: "Decisioni d'acquisto prese “a occhio”", en: "Purchase decisions made by gut feeling", ru: "Решения о покупке «на глаз»" },
      { it: "Rischio di frazionamenti non realizzabili", en: "Risk of unworkable subdivisions", ru: "Риск невыполнимого раздела объекта" },
      { it: "Serve materiale per banche e soci", en: "You need material for banks and partners", ru: "Нужны материалы для банков и партнёров" },
    ],
    outcomes: [
      {
        title: { it: "Scenari a confronto", en: "Scenarios compared", ru: "Сравнение сценариев" },
        text: { it: "Più ipotesi di distribuzione o frazionamento, con superfici.", en: "Several layout or subdivision options, with areas.", ru: "Несколько вариантов планировки или раздела, с площадями." },
      },
      {
        title: { it: "Decisione informata", en: "An informed decision", ru: "Взвешенное решение" },
        text: { it: "Prima dell'offerta, non dopo il rogito.", en: "Before the offer, not after completion.", ru: "До оферты, а не после сделки." },
      },
      {
        title: { it: "Dossier per finanziatori", en: "A dossier for lenders", ru: "Досье для финансирования" },
        text: { it: "Presentazione chiara da mostrare a banche e partner.", en: "A clear presentation for banks and partners.", ru: "Понятная презентация для банков и партнёров." },
      },
    ],
    services: ["concept", "render", "presentation"],
    projects: ["casa-di-paese-ventimiglia", "loft-ex-magazzino", "appartamento-corso-imperatrice"],
    priceFrom: { it: "da € 390", en: "from € 390", ru: "от € 390" },
    image: IMG.site,
  },
  {
    id: "homeowners",
    slug: "homeowners",
    n: "05",
    label: { it: "Privati", en: "Homeowners", ru: "Частные клиенты" },
    who: { it: "Sono un privato", en: "I'm a homeowner", ru: "Я собственник" },
    title: {
      it: "Un concept per la vostra casa, prima del progetto completo",
      en: "A concept for your home, before the full project", ru: "Концепция вашего дома — до полного проекта",
    },
    lead: {
      it: "Avete comprato o state per comprare? In pochi giorni vedete come può diventare la casa e con quale distribuzione.",
      en: "Just bought, or about to? In a few days you'll see what your home can become and how it could be laid out.", ru: "Только купили или собираетесь? За несколько дней вы увидите, каким может стать дом и какой может быть планировка.",
    },
    pains: [
      { it: "Non sapete da dove iniziare", en: "You don't know where to start", ru: "Непонятно, с чего начать" },
      { it: "Un progetto completo costa e richiede settimane", en: "A full project is costly and takes weeks", ru: "Полный проект стоит дорого и занимает недели" },
      { it: "Difficile spiegare le idee all'impresa", en: "Hard to explain your ideas to builders", ru: "Трудно объяснить идеи строителям" },
    ],
    outcomes: [
      {
        title: { it: "Idee chiare", en: "Clear ideas", ru: "Ясные идеи" },
        text: { it: "Distribuzione, stile e finiture visualizzati.", en: "Layout, style and finishes, visualised.", ru: "Планировка, стиль и отделка — наглядно." },
      },
      {
        title: { it: "Budget sotto controllo", en: "Budget under control", ru: "Бюджет под контролем" },
        text: { it: "Una base concreta per chiedere preventivi confrontabili.", en: "A concrete basis for comparable quotes.", ru: "Конкретная основа для сопоставимых смет." },
      },
      {
        title: { it: "Pronti per il progetto", en: "Ready for the full project", ru: "Готово к полному проекту" },
        text: { it: "Il concept diventa il punto di partenza del progetto esecutivo.", en: "The concept becomes the starting point for detailed design.", ru: "Концепция становится отправной точкой рабочего проекта." },
      },
    ],
    services: ["concept", "render"],
    projects: ["villa-mare-bordighera", "attico-porto-vecchio", "appartamento-corso-imperatrice"],
    priceFrom: { it: "da € 390", en: "from € 390", ru: "от € 390" },
    image: IMG.living7,
  },
];

export const segmentById = (id: SegmentId) => segments.find((s) => s.id === id)!;
export const segmentBySlug = (slug: string) => segments.find((s) => s.slug === slug);
