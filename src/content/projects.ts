import type { L } from "@/lib/i18n";
import { frames, sketchOf, type Img } from "./images";
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
  /** реализован / в работе (по сайтам BIG, Zaha Hadid — этап проекта) */
  status: "completed" | "inProgress";
  /** тип для фильтра */
  kind: "apartment" | "villa" | "development" | "house";
  /** [долгота, широта] — для карты */
  coords: [number, number];
  intro: L;
  more: L;
  challenge: L;
  solution: L;
  result: L;
  /** Планировка и ключевые решения (раздел 03 кейса) */
  decisions: L[];
  cover: Img;
  hero: Img[];
  before: Img; // исходное состояние / план
  after: Img; // концепция / визуал
  gallery: Img[];
};

export const projects: Project[] = [
  {
    slug: "villa-mare-bordighera",
    status: "completed",
    kind: "villa",
    coords: [7.664, 43.779],
    title: { it: "Villa sul mare", en: "Seaside villa", ru: "Вилла у моря" },
    location: "Bordighera",
    propertyType: { it: "Villa", en: "Villa", ru: "Вилла" },
    area: 180,
    year: 2026,
    turnaround: { it: "5 giorni", en: "5 days", ru: "5 дней" },
    segments: ["homeowners", "realEstate"],
    services: ["concept", "model3d", "render", "presentation"],
    featured: true,
    intro: {
      it: "Una villa degli anni '70 affacciata sul mare, con ambienti frammentati e poca luce. L'obiettivo: aprire la zona giorno verso la terrazza.",
      en: "A 1970s villa overlooking the sea, with fragmented rooms and little light. The goal: open the living area onto the terrace.", ru: "Вилла 1970-х с видом на море: раздробленные помещения и мало света. Задача — открыть гостиную на террасу.",
    },
    more: {
      it: "Abbiamo lavorato da planimetria catastale e foto inviate dal proprietario, senza sopralluogo. In 48 ore il concept, in 5 giorni il dossier completo con render e presentazione.",
      en: "We worked from the cadastral plan and photos sent by the owner, with no site visit. Concept in 48 hours, full dossier with renders and presentation in 5 days.", ru: "Работали по кадастровому плану и фото собственника, без выезда на объект. Концепция за 48 часов, полное досье с рендерами и презентацией — за 5 дней.",
    },
    challenge: {
      it: "Zona giorno divisa in tre stanze, cucina chiusa e vista mare sfruttata solo da una finestra.",
      en: "Living area split into three rooms, a closed kitchen and the sea view used by a single window.", ru: "Гостиная разделена на три комнаты, кухня закрыта, вид на море — только из одного окна.",
    },
    solution: {
      it: "Demolizione di due tramezzi non portanti, cucina a isola sull'asse della terrazza, nuove aperture a tutta altezza.",
      en: "Two non-structural partitions removed, island kitchen aligned with the terrace, new full-height openings.", ru: "Убраны две ненесущие перегородки, кухня-остров по оси террасы, новые проёмы в пол.",
    },
    result: {
      it: "Un unico ambiente di 62 m² con vista mare da ogni punto; il proprietario ha usato il dossier per chiedere i preventivi.",
      en: "A single 62 m² space with sea views throughout; the owner used the dossier to request quotes.", ru: "Единое пространство 62 м² с видом на море из любой точки; собственник использовал досье для запроса смет.",
    },
    decisions: [
      { it: "Demolizione di due tramezzi non portanti", en: "Two non-structural partitions removed", ru: "Убраны две ненесущие перегородки" },
      { it: "Cucina a isola sull'asse della terrazza", en: "Island kitchen aligned with the terrace", ru: "Кухня-остров по оси террасы" },
      { it: "Aperture a tutta altezza verso il mare", en: "Full-height openings towards the sea", ru: "Проёмы в пол с видом на море" },
    ],
    cover: frames("villa-mare-bordighera")[0],
    hero: frames("villa-mare-bordighera").slice(0, 3),
    before: sketchOf("villa-mare-bordighera"),
    after: frames("villa-mare-bordighera")[0],
    gallery: frames("villa-mare-bordighera"),
  },
  {
    slug: "appartamento-corso-imperatrice",
    status: "completed",
    kind: "apartment",
    coords: [7.765, 43.815],
    title: { it: "Appartamento Corso Imperatrice", en: "Corso Imperatrice apartment", ru: "Квартира на Корсо Императриче" },
    location: "Sanremo",
    propertyType: { it: "Appartamento", en: "Apartment", ru: "Квартира" },
    area: 95,
    year: 2026,
    turnaround: { it: "72 ore", en: "72 hours", ru: "72 часа" },
    segments: ["realEstate", "investors"],
    services: ["concept", "render", "presentation"],
    featured: true,
    intro: {
      it: "Un trilocale d'epoca da ristrutturare, in vendita da mesi. L'agenzia ci ha chiesto di mostrarne il potenziale.",
      en: "A period three-room flat in need of renovation, on the market for months. The agency asked us to show its potential.", ru: "Трёхкомнатная квартира в историческом доме под ремонт, месяцами в продаже. Агентство попросило показать её потенциал.",
    },
    more: {
      it: "Concept con due varianti (bilocale + studio, trilocale aperto), quattro render e una presentazione con il logo dell'agenzia, pronta per il portale.",
      en: "Concept with two options (one-bed + studio, open three-room), four renders and a presentation with the agency's branding, ready for the portals.", ru: "Концепция в двух вариантах (спальня + студия, открытая трёхкомнатная), четыре рендера и презентация в стиле агентства, готовая для порталов.",
    },
    challenge: {
      it: "Corridoio lungo e buio, bagno cieco, stato attuale poco fotogenico.",
      en: "Long dark corridor, windowless bathroom, an unphotogenic current state.", ru: "Длинный тёмный коридор, санузел без окна, нефотогеничное текущее состояние.",
    },
    solution: {
      it: "Corridoio eliminato, zona giorno passante sui due affacci, secondo bagno ricavato dal ripostiglio.",
      en: "Corridor removed, dual-aspect living room, second bathroom carved out of the storage room.", ru: "Коридор убран, гостиная на две стороны, второй санузел из кладовой.",
    },
    result: {
      it: "Annuncio aggiornato con render “dopo”: più richieste di visita nelle prime settimane.",
      en: "Listing updated with “after” renders: more viewing requests in the first weeks.", ru: "Объявление обновлено рендерами «после»: больше запросов на просмотр в первые недели.",
    },
    decisions: [
      { it: "Corridoio eliminato, zona giorno passante", en: "Corridor removed, dual-aspect living room", ru: "Коридор убран, гостиная на две стороны" },
      { it: "Secondo bagno ricavato dal ripostiglio", en: "Second bathroom carved out of storage", ru: "Второй санузел из кладовой" },
      { it: "Due varianti: bilocale + studio / trilocale", en: "Two options: one-bed + studio / three-room", ru: "Два варианта: спальня + студия / трёхкомнатная" },
    ],
    cover: frames("appartamento-corso-imperatrice")[0],
    hero: frames("appartamento-corso-imperatrice").slice(0, 3),
    before: sketchOf("appartamento-corso-imperatrice"),
    after: frames("appartamento-corso-imperatrice")[0],
    gallery: frames("appartamento-corso-imperatrice"),
  },
  {
    slug: "residenza-collina-ospedaletti",
    status: "inProgress",
    kind: "development",
    coords: [7.715, 43.806],
    title: { it: "Residenza Collina", en: "Residenza Collina", ru: "Residenza Collina" },
    location: "Ospedaletti",
    propertyType: { it: "Complesso residenziale · 24 unità", en: "Residential development · 24 units", ru: "Жилой комплекс · 24 квартиры" },
    area: 2150,
    year: 2026,
    turnaround: { it: "3 settimane", en: "3 weeks", ru: "3 недели" },
    segments: ["developers"],
    services: ["concept", "model3d", "render", "presentation", "film"],
    featured: true,
    intro: {
      it: "Un nuovo complesso di 24 unità sulla collina. Il developer cercava un mix tipologico più vendibile e materiali per la pre-vendita.",
      en: "A new 24-unit development on the hillside. The developer wanted a more sellable unit mix and pre-sales material.", ru: "Новый комплекс на 24 квартиры на холме. Девелоперу нужна была более ликвидная квартирография и материалы для предпродаж.",
    },
    more: {
      it: "Planning: revisione di tutte le piante tipo. Marketing: render esterni, interni per tipologia, brochure e un video di lancio.",
      en: "Planning: revision of every typical plan. Marketing: exterior renders, interiors per type, brochure and a launch film.", ru: "Planning: пересмотр всех типовых планировок. Marketing: рендеры экстерьеров, интерьеры по типам, буклет и видео для запуска.",
    },
    challenge: {
      it: "Tagli troppo grandi per il mercato locale e piante con superfici di distribuzione elevate.",
      en: "Units too large for the local market and plans with excessive circulation space.", ru: "Квартиры слишком большие для местного рынка, много площади на коридоры.",
    },
    solution: {
      it: "Nuovo mix con più bilocali e trilocali compatti, distribuzioni più efficienti e terrazze più profonde.",
      en: "New mix with more compact one- and two-bed units, more efficient layouts and deeper terraces.", ru: "Новая квартирография с компактными одно- и двухспальными квартирами, эффективные планировки, глубокие террасы.",
    },
    result: {
      it: "Da 20 a 24 unità vendibili sulla stessa superficie e un kit completo per la campagna.",
      en: "From 20 to 24 sellable units on the same footprint and a complete campaign kit.", ru: "С 20 до 24 продаваемых квартир на той же площади и полный комплект для кампании.",
    },
    decisions: [
      { it: "Mix tipologico rivisto: più bilocali", en: "Revised unit mix: more one-beds", ru: "Новая квартирография: больше однокомнатных" },
      { it: "Distribuzioni compatte, meno superfici di passaggio", en: "Compact layouts, less circulation", ru: "Компактные планировки, меньше коридоров" },
      { it: "Terrazze più profonde verso valle", en: "Deeper terraces facing the valley", ru: "Глубокие террасы с видом на долину" },
    ],
    cover: frames("residenza-collina-ospedaletti")[0],
    hero: frames("residenza-collina-ospedaletti").slice(0, 3),
    before: sketchOf("residenza-collina-ospedaletti"),
    after: frames("residenza-collina-ospedaletti")[0],
    gallery: frames("residenza-collina-ospedaletti"),
  },
  {
    slug: "casa-di-paese-ventimiglia",
    status: "completed",
    kind: "house",
    coords: [7.602, 43.792],
    title: { it: "Casa di paese", en: "Village house", ru: "Дом в старом городе" },
    location: "Ventimiglia Alta",
    propertyType: { it: "Casa su tre livelli", en: "Three-storey house", ru: "Трёхэтажный дом" },
    area: 140,
    year: 2025,
    turnaround: { it: "4 giorni", en: "4 days", ru: "4 дня" },
    segments: ["investors", "realEstate"],
    services: ["concept", "render", "presentation"],
    intro: {
      it: "Una casa in pietra nel centro storico. L'investitore voleva sapere se fosse possibile ricavare due unità indipendenti.",
      en: "A stone house in the old town. The investor wanted to know whether two independent units were possible.", ru: "Каменный дом в историческом центре. Инвестор хотел понять, можно ли выделить две независимые квартиры.",
    },
    more: {
      it: "Tre scenari a confronto: unità unica, due unità sovrapposte, unità + affittacamere. Con superfici, render e una nota sui vincoli.",
      en: "Three scenarios compared: single unit, two stacked units, unit + guest rooms. With areas, renders and a note on constraints.", ru: "Три сценария: одна квартира, две квартиры друг над другом, квартира + гостевые комнаты. С площадями, рендерами и заметкой об ограничениях.",
    },
    challenge: {
      it: "Scala interna stretta, muri portanti spessi, vincoli del centro storico.",
      en: "Narrow internal stair, thick load-bearing walls, old-town restrictions.", ru: "Узкая внутренняя лестница, толстые несущие стены, ограничения исторического центра.",
    },
    solution: {
      it: "Ingresso indipendente dal vicolo per il piano terra, scala esistente mantenuta per i piani superiori.",
      en: "Independent entrance from the alley for the ground floor, existing stair kept for the upper floors.", ru: "Отдельный вход из переулка для первого этажа, существующая лестница сохранена для верхних.",
    },
    result: {
      it: "Scenario a due unità confermato prima dell'offerta d'acquisto.",
      en: "Two-unit scenario confirmed before the purchase offer.", ru: "Сценарий с двумя квартирами подтверждён до оферты на покупку.",
    },
    decisions: [
      { it: "Ingresso indipendente dal vicolo", en: "Independent entrance from the alley", ru: "Отдельный вход из переулка" },
      { it: "Scala esistente mantenuta per i piani alti", en: "Existing stair kept for upper floors", ru: "Лестница сохранена для верхних этажей" },
      { it: "Tre scenari confrontati con superfici", en: "Three scenarios compared with areas", ru: "Три сценария с площадями" },
    ],
    cover: frames("casa-di-paese-ventimiglia")[0],
    hero: frames("casa-di-paese-ventimiglia").slice(0, 3),
    before: sketchOf("casa-di-paese-ventimiglia"),
    after: frames("casa-di-paese-ventimiglia")[0],
    gallery: frames("casa-di-paese-ventimiglia"),
  },
  {
    slug: "attico-porto-vecchio",
    status: "inProgress",
    kind: "apartment",
    coords: [7.782, 43.817],
    title: { it: "Attico Porto Vecchio", en: "Porto Vecchio penthouse", ru: "Пентхаус Порто Веккьо" },
    location: "Sanremo",
    propertyType: { it: "Attico", en: "Penthouse", ru: "Пентхаус" },
    area: 120,
    year: 2025,
    turnaround: { it: "72 ore", en: "72 hours", ru: "72 часа" },
    segments: ["construction", "homeowners"],
    services: ["concept", "model3d", "render"],
    featured: true,
    intro: {
      it: "Un'impresa edile doveva presentare il preventivo per la ristrutturazione completa di un attico con terrazza sul porto.",
      en: "A builder needed to present a quote for the full renovation of a penthouse with a terrace over the harbour.", ru: "Строительной компании нужно было представить смету на полный ремонт пентхауса с террасой над портом.",
    },
    more: {
      it: "Concept e render allegati al preventivo con il marchio dell'impresa. Il cliente ha scelto le finiture direttamente sulle immagini.",
      en: "Concept and renders attached to the quote under the builder's brand. The client chose finishes directly on the images.", ru: "Концепция и рендеры приложены к смете под брендом строителя. Клиент выбирал отделку прямо по изображениям.",
    },
    challenge: {
      it: "Cliente indeciso tra tre imprese con preventivi simili.",
      en: "A client undecided between three builders with similar quotes.", ru: "Клиент не мог выбрать из трёх строителей с похожими сметами.",
    },
    solution: {
      it: "Proposta visiva completa in 72 ore: distribuzione, cucina, bagno padronale e terrazza.",
      en: "A complete visual proposal in 72 hours: layout, kitchen, master bathroom and terrace.", ru: "Полное визуальное предложение за 72 часа: планировка, кухня, главная ванная и терраса.",
    },
    result: {
      it: "Contratto firmato con l'impresa che ha presentato la proposta visiva.",
      en: "Contract signed with the builder who presented the visual proposal.", ru: "Договор подписан со строителем, который показал визуальное предложение.",
    },
    decisions: [
      { it: "Zona giorno aperta sulla terrazza", en: "Living area opened onto the terrace", ru: "Гостиная открыта на террасу" },
      { it: "Bagno padronale ridisegnato", en: "Master bathroom redesigned", ru: "Главная ванная перепроектирована" },
      { it: "Finiture scelte direttamente sui render", en: "Finishes chosen directly on the renders", ru: "Отделка выбрана прямо по рендерам" },
    ],
    cover: frames("attico-porto-vecchio")[0],
    hero: frames("attico-porto-vecchio").slice(0, 3),
    before: sketchOf("attico-porto-vecchio"),
    after: frames("attico-porto-vecchio")[0],
    gallery: frames("attico-porto-vecchio"),
  },
  {
    slug: "loft-ex-magazzino",
    status: "inProgress",
    kind: "development",
    coords: [7.622, 43.786],
    title: { it: "Loft ex magazzino", en: "Warehouse loft", ru: "Лофт в бывшем складе" },
    location: "Ventimiglia",
    propertyType: { it: "Ex magazzino → 3 loft", en: "Former warehouse → 3 lofts", ru: "Бывший склад → 3 лофта" },
    area: 210,
    year: 2025,
    turnaround: { it: "1 settimana", en: "1 week", ru: "1 неделя" },
    segments: ["investors", "construction", "developers"],
    services: ["concept", "model3d", "render", "presentation"],
    intro: {
      it: "Un magazzino dismesso a pochi passi dal mare, da trasformare in residenze. Analisi di fattibilità planimetrica e materiali per la vendita.",
      en: "A disused warehouse near the sea, to be converted into homes. Layout feasibility study and sales material.", ru: "Заброшенный склад у моря под переделку в жильё. Планировочное ТЭО и материалы для продаж.",
    },
    more: {
      it: "Studio di tre loft con soppalco, render interni e una presentazione per i potenziali acquirenti su carta.",
      en: "Study of three lofts with mezzanines, interior renders and a presentation for off-plan buyers.", ru: "Три лофта с антресолями, рендеры интерьеров и презентация для покупателей на этапе проекта.",
    },
    challenge: {
      it: "Pianta profonda con luce solo sul fronte strada.",
      en: "Deep plan with light only from the street front.", ru: "Глубокий план со светом только с улицы.",
    },
    solution: {
      it: "Cortile interno ricavato al centro, tre loft passanti con doppia altezza.",
      en: "An internal courtyard carved out in the middle, three dual-aspect double-height lofts.", ru: "Внутренний двор в центре, три сквозных лофта с двойной высотой.",
    },
    result: {
      it: "Progetto presentato a banca e acquirenti; due loft prenotati su carta.",
      en: "Project presented to the bank and buyers; two lofts reserved off-plan.", ru: "Проект представлен банку и покупателям; два лофта забронированы на этапе проекта.",
    },
    decisions: [
      { it: "Cortile interno ricavato al centro", en: "Internal courtyard carved out in the middle", ru: "Внутренний двор в центре" },
      { it: "Tre loft passanti con doppia altezza", en: "Three dual-aspect double-height lofts", ru: "Три сквозных лофта с двойной высотой" },
      { it: "Soppalchi per le zone notte", en: "Mezzanines for sleeping areas", ru: "Антресоли под спальные зоны" },
    ],
    cover: frames("loft-ex-magazzino")[0],
    hero: frames("loft-ex-magazzino").slice(0, 3),
    before: sketchOf("loft-ex-magazzino"),
    after: frames("loft-ex-magazzino")[0],
    gallery: frames("loft-ex-magazzino"),
  },
  {
    slug: "appartamento-corso-inglesi",
    status: "completed",
    kind: "apartment",
    coords: [7.769, 43.819],
    title: { it: "Appartamento Corso degli Inglesi", en: "Corso degli Inglesi apartment", ru: "Квартира на Корсо дельи Инглези" },
    location: "Sanremo",
    propertyType: { it: "Appartamento", en: "Apartment", ru: "Квартира" },
    area: 135,
    year: 2026,
    turnaround: { it: "6 giorni", en: "6 days", ru: "6 дней" },
    segments: ["realEstate", "homeowners"],
    services: ["concept", "model3d", "render", "presentation"],
    intro: {
      it: "Un piano alto con portefinestre verso il mare, diviso in stanze piccole e scure. Obiettivo: un'unica zona giorno luminosa con cucina a vista.",
      en: "An upper-floor flat with French windows towards the sea, split into small, dark rooms. Goal: one bright living area with an open kitchen.",
      ru: "Квартира на верхнем этаже с французскими окнами к морю, разделённая на маленькие тёмные комнаты. Задача — единая светлая гостиная с открытой кухней.",
    },
    more: {
      it: "Pavimento in travertino continuo, boiserie in rovere e un'isola che separa senza chiudere. Render e presentazione per la vendita con l'agenzia.",
      en: "Continuous travertine flooring, oak panelling and an island that divides without closing. Renders and a sales presentation with the agency.",
      ru: "Сплошной пол из травертина, дубовые панели и остров, который разделяет пространство, не закрывая его. Рендеры и презентация для продажи вместе с агентством.",
    },
    challenge: {
      it: "Tre stanze passanti, cucina cieca, luce solo sulle facciate corte.",
      en: "Three walk-through rooms, a windowless kitchen, light only on the short façades.",
      ru: "Три проходные комнаты, кухня без окна, свет только с коротких фасадов.",
    },
    solution: {
      it: "Zona giorno unica lungo le portefinestre, cucina con isola in posizione centrale, contenitori integrati nelle pareti.",
      en: "A single living area along the French windows, a central island kitchen, storage built into the walls.",
      ru: "Единая гостиная вдоль французских окон, кухня с островом в центре, системы хранения встроены в стены.",
    },
    result: {
      it: "Una zona giorno di 58 m² con tre affacci; l'agenzia ha usato i render come immagini principali dell'annuncio.",
      en: "A 58 m² living area with three aspects; the agency used the renders as the listing's main images.",
      ru: "Гостиная 58 м² с окнами на три стороны; агентство поставило рендеры главными фото объявления.",
    },
    decisions: [
      { it: "Zona giorno lungo le portefinestre", en: "Living area along the French windows", ru: "Гостиная вдоль французских окон" },
      { it: "Isola centrale al posto del muro", en: "Central island instead of a wall", ru: "Центральный остров вместо стены" },
      { it: "Travertino continuo in tutta la casa", en: "Continuous travertine throughout", ru: "Сплошной травертин во всей квартире" },
    ],
    cover: frames("appartamento-corso-inglesi")[0],
    hero: frames("appartamento-corso-inglesi").slice(0, 3),
    before: sketchOf("appartamento-corso-inglesi"),
    after: frames("appartamento-corso-inglesi")[0],
    gallery: frames("appartamento-corso-inglesi"),
  },
  {
    slug: "appartamento-lungomare-bordighera",
    status: "inProgress",
    kind: "apartment",
    coords: [7.674, 43.776],
    title: { it: "Appartamento sul Lungomare", en: "Seafront apartment", ru: "Квартира на набережной" },
    location: "Bordighera",
    propertyType: { it: "Appartamento fronte mare", en: "Seafront apartment", ru: "Квартира у моря" },
    area: 160,
    year: 2026,
    turnaround: { it: "1 settimana", en: "1 week", ru: "1 неделя" },
    segments: ["investors", "construction"],
    services: ["concept", "model3d", "render", "film"],
    featured: true,
    intro: {
      it: "Un appartamento fronte mare con vetrate a tutta altezza, da trasformare per l'affitto di pregio. L'investitore voleva vedere il risultato prima di avviare i lavori.",
      en: "A seafront flat with full-height glazing, to be transformed for premium rentals. The investor wanted to see the result before starting work.",
      ru: "Квартира у моря с панорамным остеклением под премиальную аренду. Инвестор хотел увидеть результат до начала работ.",
    },
    more: {
      it: "Concept con zona giorno unica rivolta al mare, cucina con penisola in pietra, render e un breve video per il lancio sulle piattaforme di affitto.",
      en: "A concept with one sea-facing living area, a stone peninsula kitchen, renders and a short film for the rental-platform launch.",
      ru: "Концепция с единой гостиной к морю, кухня с каменным полуостровом, рендеры и короткое видео для запуска на платформах аренды.",
    },
    challenge: {
      it: "Vista mare sprecata da tramezzi e corridoio centrale, cucina chiusa sul retro.",
      en: "Sea view wasted by partitions and a central corridor, a closed kitchen at the back.",
      ru: "Вид на море перекрыт перегородками и центральным коридором, закрытая кухня в глубине.",
    },
    solution: {
      it: "Tramezzi eliminati, zona giorno di 70 m² sul fronte mare, cucina a penisola come elemento di passaggio verso la zona notte.",
      en: "Partitions removed, a 70 m² living area on the seafront, a peninsula kitchen as the link to the sleeping area.",
      ru: "Перегородки убраны, гостиная 70 м² по фасаду к морю, кухня-полуостров как переход к спальной зоне.",
    },
    result: {
      it: "Lavori avviati sulla base del concept; render e video pronti per la pubblicazione.",
      en: "Works started on the basis of the concept; renders and film ready for publishing.",
      ru: "Работы начаты на основе концепции; рендеры и видео готовы к публикации.",
    },
    decisions: [
      { it: "Zona giorno unica sul fronte mare", en: "One living area on the seafront", ru: "Единая гостиная по фасаду к морю" },
      { it: "Penisola in pietra come filtro", en: "Stone peninsula as a filter", ru: "Каменный полуостров как фильтр" },
      { it: "Libreria in rovere a tutta altezza", en: "Full-height oak bookcase", ru: "Дубовый стеллаж во всю высоту" },
    ],
    cover: frames("appartamento-lungomare-bordighera")[0],
    hero: frames("appartamento-lungomare-bordighera").slice(0, 3),
    before: sketchOf("appartamento-lungomare-bordighera"),
    after: frames("appartamento-lungomare-bordighera")[0],
    gallery: frames("appartamento-lungomare-bordighera"),
  },
];

export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug);
