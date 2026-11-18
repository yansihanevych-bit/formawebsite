import type { L } from "@/lib/i18n";
import { IMG, type Img } from "./images";

/** Страница «Студия». ЗАГЛУШКИ: имена, цифры и состав команды подтвердить с заказчиком. */
export const studio = {
  hero: IMG.houseTerrace,
  manifesto: {
    it: "Crediamo che ogni immobile abbia una versione migliore di sé. Il nostro lavoro è trovarla, disegnarla con precisione e mostrarla prima che esista.",
    en: "We believe every property has a better version of itself. Our job is to find it, draw it precisely and show it before it exists.",
    ru: "Мы верим, что у каждого объекта есть лучшая версия. Наша работа — найти её, точно начертить и показать до того, как она появится.",
  } as L,
  intro: {
    it: "FORMA BURO è uno studio di architettura e visualizzazione con base in Liguria. Uniamo progettazione architettonica e comunicazione visiva per agenzie, imprese, developer, investitori e privati della Riviera di Ponente e della Costa Azzurra.",
    en: "FORMA BURO is an architecture and visualisation studio based in Liguria. We combine architectural design and visual communication for agencies, builders, developers, investors and homeowners across the western Riviera and the Côte d'Azur.",
    ru: "FORMA BURO — студия архитектуры и визуализации в Лигурии. Мы соединяем архитектурное проектирование и визуальную коммуникацию для агентств, строителей, девелоперов, инвесторов и частных клиентов Западной Ривьеры и Лазурного берега.",
  } as L,
  numbers: [
    { v: "200+", l: { it: "progetti", en: "projects", ru: "проектов" } as L },
    { v: "20", l: { it: "anni di esperienza", en: "years of experience", ru: "лет опыта" } as L },
    { v: "4", l: { it: "lingue di lavoro", en: "working languages", ru: "рабочих языка" } as L },
    { v: "48h", l: { it: "primo concept", en: "first concept", ru: "первая концепция" } as L },
  ],
  principles: [
    {
      t: { it: "Prima la pianta", en: "Plan first", ru: "Сначала план" } as L,
      d: {
        it: "Ogni immagine nasce da una distribuzione verificata: struttura, impianti, luce. Niente scorciatoie generative.",
        en: "Every image starts from a verified layout: structure, services, light. No generative shortcuts.",
        ru: "Каждое изображение начинается с проверенной планировки: конструкции, инженерия, свет. Без генеративных коротких путей.",
      } as L,
    },
    {
      t: { it: "Velocità con metodo", en: "Speed with method", ru: "Скорость с методом" } as L,
      d: {
        it: "Un processo in cinque passaggi, ripetibile, che porta dal rilievo alla presentazione in giorni, non settimane.",
        en: "A repeatable five-step process that takes you from survey to presentation in days, not weeks.",
        ru: "Повторяемый процесс из пяти шагов: от обмера до презентации за дни, а не недели.",
      } as L,
    },
    {
      t: { it: "Pensato per vendere", en: "Designed to sell", ru: "Создано, чтобы продавать" } as L,
      d: {
        it: "Lavoriamo con chi deve convincere un acquirente, una banca o un cliente. Ogni consegna è pronta per quel momento.",
        en: "We work with people who need to convince a buyer, a bank or a client. Every deliverable is ready for that moment.",
        ru: "Мы работаем с теми, кому нужно убедить покупателя, банк или клиента. Каждый результат готов к этому моменту.",
      } as L,
    },
  ],
  team: [
    { role: { it: "Architetto, direzione progetto", en: "Architect, project lead", ru: "Архитектор, руководитель проектов" } as L, name: "—" },
    { role: { it: "Architetto d'interni", en: "Interior architect", ru: "Архитектор интерьеров" } as L, name: "—" },
    { role: { it: "3D artist / visualizer", en: "3D artist / visualiser", ru: "3D-художник / визуализатор" } as L, name: "—" },
    { role: { it: "Motion designer", en: "Motion designer", ru: "Моушн-дизайнер" } as L, name: "—" },
    { role: { it: "Account, clienti B2B", en: "Account manager, B2B", ru: "Менеджер B2B-клиентов" } as L, name: "—" },
  ],
  gallery: [IMG.closeVelvet, IMG.closeEames, IMG.closeWool] as Img[],
};
