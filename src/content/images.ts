/**
 * ВРЕМЕННЫЕ тематические заглушки (Unsplash).
 * Заменить на реальные фото кейсов: положить файлы в /public/projects/... или перенести в Sanity,
 * и поменять src в этом файле — остальной код менять не нужно.
 */
export type Img = { src: string; alt: string; w: number; h: number };

const u = (id: string, alt: string, w = 2400, h = 1600): Img => ({
  src: `https://images.unsplash.com/photo-${id}`,
  alt,
  w,
  h,
});

export const IMG = {
  // экстерьеры / виллы
  villaPool: u("1512917774080-9991f1c4c750", "Villa con piscina"),
  houseModern: u("1600585154340-be6161a56a0c", "Casa contemporanea"),
  houseDusk: u("1600596542815-ffad4c1539a9", "Villa al tramonto", 2400, 1592),
  houseLuxury: u("1613490493576-7fde63acd811", "Residenza di pregio"),
  houseWhite: u("1600047509807-ba8f99d2cdde", "Facciata bianca", 2400, 2012),
  houseGarden: u("1580587771525-78b9dba3b914", "Casa con giardino", 2400, 1800),
  houseFacade: u("1564013799919-ab600027ffc6", "Facciata residenziale"),
  houseCube: u("1600585152220-90363fe7e115", "Volumi contemporanei"),
  houseTerrace: u("1600563438938-a9a27216b4f5", "Terrazza esterna"),
  houseSquare: u("1523217582562-09d0def993a6", "Casa unifamiliare", 2400, 2400),
  houseClassic: u("1568605114967-8130f3a36994", "Casa con portico"),
  building: u("1486406146926-c627a92ad1ab", "Edificio residenziale"),
  architecture: u("1487958449943-2429e8be8625", "Dettaglio architettonico"),
  // интерьеры
  living1: u("1600210492486-724fe5c67fb0", "Soggiorno luminoso", 2400, 1800),
  living2: u("1616486338812-3dadae4b4ace", "Living contemporaneo", 2400, 1352),
  living3: u("1618221195710-dd6b41faaea6", "Zona giorno", 2400, 1264),
  living4: u("1600607687939-ce8a6c25118c", "Interno open space", 2400, 1632),
  living5: u("1502672260266-1c1ef2d93688", "Appartamento arredato", 2400, 1784),
  living6: u("1493809842364-78817add7ffb", "Salotto"),
  living7: u("1600494603989-9650cf6ddd3d", "Soggiorno con vista", 2400, 1800),
  living8: u("1600607688969-a5bfcd646154", "Ambiente living"),
  living9: u("1631679706909-1844bbd07221", "Interno minimal", 2400, 1756),
  living10: u("1617806118233-18e1de247200", "Interno caldo", 2400, 1352),
  kitchen1: u("1600566753190-17f0baa2a6c3", "Cucina"),
  kitchen2: u("1484154218962-a197022b5858", "Cucina aperta", 2400, 1596),
  kitchen3: u("1600121848594-d8644e57abab", "Cucina con isola"),
  kitchen4: u("1600573472550-8090b5e0745e", "Cucina e pranzo"),
  bedroom1: u("1505691938895-1758d7feb511", "Camera da letto"),
  bedroom2: u("1560448204-e02f11c3d0e2", "Camera matrimoniale"),
  bath: u("1600566752355-35792bedcfea", "Bagno", 1600, 2400),
  chair: u("1586023492125-27b2c045efd7", "Dettaglio arredo", 2400, 2116),
  detail: u("1615874959474-d609969a20ed", "Dettaglio materiali", 2400, 2400),
  vertical: u("1600489000022-c2086d79f9d4", "Interno verticale", 1800, 2400),
  office: u("1497366216548-37526070297c", "Spazio di lavoro", 2400, 1604),
  // планы / процесс
  plans: u("1503387762-592deb58ef4e", "Tavole di progetto e planimetrie", 2400, 1352),
  sketch: u("1541123437800-1bb1317badc2", "Schizzo di progetto"),
  site: u("1449844908441-8829872d2607", "Edificio da riqualificare"),
  street: u("1494526585095-c41746248156", "Immobile residenziale"),
  facade2: u("1558036117-15d82a90b9b1", "Facciata"),
  interior11: u("1572120360610-d971b9d7767c", "Interno residenziale"),
} satisfies Record<string, Img>;
