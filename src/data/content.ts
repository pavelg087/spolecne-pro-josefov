// =============================================================
//  OBSAH WEBU - zde upravujte texty, kandidáty a program
// =============================================================

export const sdruzeni = {
  nazev: "Společně pro Josefov",
  podtitul: "Sdružení nezávislých kandidátů — komunální volby 2026",
  obec: "Josefov, okres Hodonín (PSČ 696 21)",
  // Krátké představení na úvodní stránce
  motto: "Otevřená, zodpovědná a aktivní obec pro všechny generace.",
  uvod:
    "Jsme skupina lidí, kterým není lhostejné, jak se naší obci daří. " +
    "Spojuje nás vztah k Josefovu a chuť pracovat na tom, aby se nám tu " +
    "všem dobře žilo. Nejsme spojeni s žádnou politickou stranou — " +
    "jdeme do voleb jako nezávislí kandidáti se společným programem.",
};

export const oNas = [
  "Chceme obec, která naslouchá svým občanům a otevřeně komunikuje. " +
    "Věříme, že o důležitých věcech mají spolurozhodovat ti, kterých se týkají.",
  "Záleží nám na hospodárném nakládání s obecními penězi a na tom, aby " +
    "investice směřovaly tam, kde přinesou užitek co nejvíce lidem.",
  "Chceme podporovat spolkový a kulturní život, péči o veřejná prostranství " +
    "a rozvoj obce s ohledem na budoucí generace.",
];

export type Kandidat = {
  poradi: number;
  jmeno: string;
  vek?: number;
  povolani?: string;
  popis: string;
  foto?: string; // soubor v /public, např. "/kandidati/jan-novak.jpg"
};

export const kandidati: Kandidat[] = [
  {
    poradi: 1,
    jmeno: "Jméno Příjmení",
    vek: 45,
    povolani: "povolání",
    popis:
      "Krátké představení kandidáta — co dělá, proč kandiduje a čemu by se " +
      "chtěl v zastupitelstvu věnovat.",
  },
  {
    poradi: 2,
    jmeno: "Jméno Příjmení",
    vek: 38,
    povolani: "povolání",
    popis: "Krátké představení kandidáta.",
  },
  {
    poradi: 3,
    jmeno: "Jméno Příjmení",
    povolani: "povolání",
    popis: "Krátké představení kandidáta.",
  },
  {
    poradi: 4,
    jmeno: "Jméno Příjmení",
    povolani: "povolání",
    popis: "Krátké představení kandidáta.",
  },
  {
    poradi: 5,
    jmeno: "Jméno Příjmení",
    povolani: "povolání",
    popis: "Krátké představení kandidáta.",
  },
  {
    poradi: 6,
    jmeno: "Jméno Příjmení",
    povolani: "povolání",
    popis: "Krátké představení kandidáta.",
  },
  {
    poradi: 7,
    jmeno: "Jméno Příjmení",
    povolani: "povolání",
    popis: "Krátké představení kandidáta.",
  },
];

export type ProgramBod = {
  ikona: string;
  nadpis: string;
  body: string[];
};

export const program: ProgramBod[] = [
  {
    ikona: "🏛️",
    nadpis: "Otevřená radnice",
    body: [
      "Pravidelné informování občanů o dění v obci a o hospodaření.",
      "Veřejná projednávání důležitých investic.",
      "Srozumitelný a aktuální obecní web a vývěska.",
    ],
  },
  {
    ikona: "💰",
    nadpis: "Zodpovědné hospodaření",
    body: [
      "Transparentní a hospodárné nakládání s rozpočtem obce.",
      "Aktivní vyhledávání dotací a grantů.",
      "Priorita investicím s dlouhodobým přínosem.",
    ],
  },
  {
    ikona: "🌳",
    nadpis: "Vzhled a životní prostředí",
    body: [
      "Péče o veřejnou zeleň a veřejná prostranství.",
      "Údržba a opravy chodníků a místních komunikací.",
      "Hospodaření s vodou a zadržování vody v krajině.",
    ],
  },
  {
    ikona: "🎭",
    nadpis: "Spolkový a kulturní život",
    body: [
      "Podpora místních spolků, sportu a tradic.",
      "Akce pro všechny generace — od dětí po seniory.",
      "Údržba a využití obecních prostor pro setkávání.",
    ],
  },
  {
    ikona: "👨‍👩‍👧‍👦",
    nadpis: "Rodiny a senioři",
    body: [
      "Podmínky pro rodiny s dětmi a kvalitní volnočasové vyžití.",
      "Pomoc a služby pro seniory.",
      "Bezpečnost v obci.",
    ],
  },
  {
    ikona: "🚧",
    nadpis: "Rozvoj obce",
    body: [
      "Rozumný územní rozvoj a podpora bydlení.",
      "Zlepšování infrastruktury a dopravní situace.",
      "Dlouhodobá vize rozvoje Josefova.",
    ],
  },
];

export const kontakt = {
  email: "info@spolecneprojosefov.cz",
  // Volitelně doplňte:
  facebook: "", // např. "https://facebook.com/..."
  telefon: "",
};
