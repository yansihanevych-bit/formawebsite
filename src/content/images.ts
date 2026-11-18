/**
 * Изображения сайта. Рендеры FORMA BURO лежат в /public/work/<проект>/.
 * sketch.jpg — эскиз, сгенерированный из первого кадра (тот же ракурс) — для слайдеров «до / после».
 * Чтобы заменить кадр: положите файл с тем же именем или поменяйте путь здесь.
 */
export type Img = { src: string; alt: string; w: number; h: number };

const i = (src: string, alt: string, w: number, h: number): Img => ({ src, alt, w, h });

/** Рендеры по проектам: [кадры…, эскиз последним] */
export const WORK = {
  "appartamento-corso-imperatrice": [
    i("/work/appartamento-corso-imperatrice/01.jpg", "Render — soggiorno e cucina, appartamento d'epoca", 2000, 1125),
    i("/work/appartamento-corso-imperatrice/02.jpg", "Render — soggiorno e cucina, appartamento d'epoca", 1600, 2000),
    i("/work/appartamento-corso-imperatrice/03.jpg", "Render — soggiorno e cucina, appartamento d'epoca", 1600, 2000),
    i("/work/appartamento-corso-imperatrice/04.jpg", "Render — soggiorno e cucina, appartamento d'epoca", 1600, 2000),
    i("/work/appartamento-corso-imperatrice/05.jpg", "Render — soggiorno e cucina, appartamento d'epoca", 1600, 2000),
    i("/work/appartamento-corso-imperatrice/06.jpg", "Render — soggiorno e cucina, appartamento d'epoca", 1600, 2000),
    i("/work/appartamento-corso-imperatrice/07.jpg", "Render — camera da letto, appartamento d'epoca", 1600, 2000),
    i("/work/appartamento-corso-imperatrice/08.jpg", "Render — camera da letto, appartamento d'epoca", 1600, 2000),
    i("/work/appartamento-corso-imperatrice/09.jpg", "Render — camera da letto, appartamento d'epoca", 1600, 2000),
    i("/work/appartamento-corso-imperatrice/10.jpg", "Render — camera da letto, appartamento d'epoca", 1600, 2000),
    i("/work/appartamento-corso-imperatrice/11.jpg", "Render — camera da letto, appartamento d'epoca", 1600, 2000),
    i("/work/appartamento-corso-imperatrice/12.jpg", "Render — bagno in travertino", 1600, 2000),
    i("/work/appartamento-corso-imperatrice/13.jpg", "Render — bagno in travertino", 1600, 2000),
    i("/work/appartamento-corso-imperatrice/14.jpg", "Render — bagno in travertino", 1600, 2000),
    i("/work/appartamento-corso-imperatrice/sketch.jpg", "Schizzo di progetto — stesso punto di vista del render", 2000, 1125),
  ],
  "attico-porto-vecchio": [
    i("/work/attico-porto-vecchio/01.jpg", "Render — zona giorno con vista mare al tramonto", 2000, 1116),
    i("/work/attico-porto-vecchio/02.jpg", "Render — zona giorno con vista mare al tramonto", 1611, 2000),
    i("/work/attico-porto-vecchio/03.jpg", "Render — zona giorno con vista mare al tramonto", 1611, 2000),
    i("/work/attico-porto-vecchio/04.jpg", "Render — zona giorno con vista mare al tramonto", 1611, 2000),
    i("/work/attico-porto-vecchio/05.jpg", "Render — zona giorno con vista mare al tramonto", 1611, 2000),
    i("/work/attico-porto-vecchio/06.jpg", "Render — dettaglio arredo", 1611, 2000),
    i("/work/attico-porto-vecchio/sketch.jpg", "Schizzo di progetto — stesso punto di vista del render", 2000, 1116),
  ],
  "appartamento-corso-inglesi": [
    i("/work/appartamento-corso-inglesi/01.jpg", "Render — zona giorno con portefinestre sul mare", 2000, 1116),
    i("/work/appartamento-corso-inglesi/02.jpg", "Render — zona giorno con portefinestre sul mare", 2000, 1116),
    i("/work/appartamento-corso-inglesi/03.jpg", "Render — zona giorno con portefinestre sul mare", 1611, 2000),
    i("/work/appartamento-corso-inglesi/04.jpg", "Render — zona giorno con portefinestre sul mare", 1611, 2000),
    i("/work/appartamento-corso-inglesi/05.jpg", "Render — dettaglio arredo", 1611, 2000),
    i("/work/appartamento-corso-inglesi/sketch.jpg", "Schizzo di progetto — stesso punto di vista del render", 2000, 1116),
  ],
  "casa-di-paese-ventimiglia": [
    i("/work/casa-di-paese-ventimiglia/01.jpg", "Render — zona giorno con terrazza fiorita", 2000, 1116),
    i("/work/casa-di-paese-ventimiglia/02.jpg", "Render — zona giorno con terrazza fiorita", 1611, 2000),
    i("/work/casa-di-paese-ventimiglia/03.jpg", "Render — zona giorno con terrazza fiorita", 1611, 2000),
    i("/work/casa-di-paese-ventimiglia/04.jpg", "Render — zona giorno con terrazza fiorita", 1611, 2000),
    i("/work/casa-di-paese-ventimiglia/05.jpg", "Render — dettaglio arredo", 1611, 2000),
    i("/work/casa-di-paese-ventimiglia/sketch.jpg", "Schizzo di progetto — stesso punto di vista del render", 2000, 1116),
  ],
  "appartamento-lungomare-bordighera": [
    i("/work/appartamento-lungomare-bordighera/01.jpg", "Render — zona giorno fronte mare", 2000, 1116),
    i("/work/appartamento-lungomare-bordighera/02.jpg", "Render — zona giorno fronte mare", 2000, 1116),
    i("/work/appartamento-lungomare-bordighera/03.jpg", "Render — zona giorno fronte mare", 1611, 2000),
    i("/work/appartamento-lungomare-bordighera/04.jpg", "Render — zona giorno fronte mare", 1611, 2000),
    i("/work/appartamento-lungomare-bordighera/05.jpg", "Render — zona giorno fronte mare", 1611, 2000),
    i("/work/appartamento-lungomare-bordighera/06.jpg", "Render — dettaglio arredo", 1611, 2000),
    i("/work/appartamento-lungomare-bordighera/sketch.jpg", "Schizzo di progetto — stesso punto di vista del render", 2000, 1116),
  ],
  "residenza-collina-ospedaletti": [
    i("/work/residenza-collina-ospedaletti/01.jpg", "Render — zona giorno sul giardino di ulivi", 2000, 1116),
    i("/work/residenza-collina-ospedaletti/02.jpg", "Render — zona giorno sul giardino di ulivi", 2000, 1116),
    i("/work/residenza-collina-ospedaletti/03.jpg", "Render — zona giorno sul giardino di ulivi", 1611, 2000),
    i("/work/residenza-collina-ospedaletti/04.jpg", "Render — zona giorno sul giardino di ulivi", 1611, 2000),
    i("/work/residenza-collina-ospedaletti/05.jpg", "Render — zona giorno sul giardino di ulivi", 1611, 2000),
    i("/work/residenza-collina-ospedaletti/06.jpg", "Render — dettaglio arredo", 1611, 2000),
    i("/work/residenza-collina-ospedaletti/sketch.jpg", "Schizzo di progetto — stesso punto di vista del render", 2000, 1116),
  ],
  "loft-ex-magazzino": [
    i("/work/loft-ex-magazzino/01.jpg", "Render — zona giorno al tramonto", 2000, 1116),
    i("/work/loft-ex-magazzino/02.jpg", "Render — zona giorno al tramonto", 1611, 2000),
    i("/work/loft-ex-magazzino/03.jpg", "Render — zona giorno al tramonto", 1611, 2000),
    i("/work/loft-ex-magazzino/04.jpg", "Render — zona giorno al tramonto", 1611, 2000),
    i("/work/loft-ex-magazzino/05.jpg", "Render — dettaglio arredo", 1611, 2000),
    i("/work/loft-ex-magazzino/sketch.jpg", "Schizzo di progetto — stesso punto di vista del render", 2000, 1116),
  ],
  "villa-mare-bordighera": [
    i("/work/villa-mare-bordighera/01.jpg", "Render — zona giorno con vista mare", 2000, 1116),
    i("/work/villa-mare-bordighera/02.jpg", "Render — zona giorno con vista mare", 1611, 2000),
    i("/work/villa-mare-bordighera/03.jpg", "Render — zona giorno con vista mare", 1611, 2000),
    i("/work/villa-mare-bordighera/04.jpg", "Render — zona giorno con vista mare", 1611, 2000),
    i("/work/villa-mare-bordighera/05.jpg", "Render — dettaglio arredo", 1611, 2000),
    i("/work/villa-mare-bordighera/sketch.jpg", "Schizzo di progetto — stesso punto di vista del render", 2000, 1116),
  ],
} satisfies Record<string, Img[]>;

export type WorkSlug = keyof typeof WORK;
/** кадры без эскиза */
export const frames = (s: WorkSlug) => WORK[s].filter((x) => !x.src.endsWith("sketch.jpg"));
export const sketchOf = (s: WorkSlug) => WORK[s].find((x) => x.src.endsWith("sketch.jpg"))!;

const W = WORK;
const S = (s: WorkSlug) => sketchOf(s);

/**
 * Семантические изображения для секций сайта (Hero, услуги, процесс, сегменты, журнал…).
 * Имена исторические (от заглушек), содержимое — рендеры FORMA BURO.
 */
export const IMG = {
  hero: W["attico-porto-vecchio"][0],
  villaPool: W["villa-mare-bordighera"][0],
  houseDusk: W["loft-ex-magazzino"][0],
  houseCube: W["residenza-collina-ospedaletti"][0],
  building: W["residenza-collina-ospedaletti"][2],
  houseTerrace: W["appartamento-lungomare-bordighera"][1],
  houseFacade: W["residenza-collina-ospedaletti"][3],
  facade2: W["appartamento-lungomare-bordighera"][2],
  architecture: S("villa-mare-bordighera"),
  living1: W["villa-mare-bordighera"][1],
  living2: W["attico-porto-vecchio"][1],
  living3: W["residenza-collina-ospedaletti"][1],
  living4: W["loft-ex-magazzino"][1],
  living5: W["appartamento-corso-imperatrice"][0],
  living6: W["appartamento-corso-inglesi"][1],
  living7: W["villa-mare-bordighera"][0],
  living8: W["attico-porto-vecchio"][2],
  living9: W["loft-ex-magazzino"][2],
  living10: W["casa-di-paese-ventimiglia"][1],
  kitchen1: W["appartamento-corso-imperatrice"][3],
  kitchen2: W["appartamento-corso-inglesi"][2],
  kitchen3: W["appartamento-corso-imperatrice"][2],
  kitchen4: W["appartamento-lungomare-bordighera"][3],
  bedroom1: W["appartamento-corso-imperatrice"][6],
  bedroom2: W["appartamento-corso-imperatrice"][8],
  bath: W["appartamento-corso-imperatrice"][11],
  chair: W["casa-di-paese-ventimiglia"][4],
  detail: W["appartamento-corso-imperatrice"][5],
  vertical: W["appartamento-corso-imperatrice"][12],
  office: W["appartamento-corso-inglesi"][0],
  interior11: W["casa-di-paese-ventimiglia"][2],
  plans: S("appartamento-corso-imperatrice"),
  sketch: S("residenza-collina-ospedaletti"),
  site: W["casa-di-paese-ventimiglia"][0],
  street: W["casa-di-paese-ventimiglia"][0],
  // крупные планы — для «Студии» и галерей
  closeVelvet: W["attico-porto-vecchio"][5],
  closeLeather: W["casa-di-paese-ventimiglia"][4],
  closeWool: W["appartamento-lungomare-bordighera"][5],
  closeEames: W["villa-mare-bordighera"][4],
} satisfies Record<string, Img>;
