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
  datumNarozeni?: string;
  povolani?: string;
  popis?: string;
  foto?: string; // soubor v /public, např. "/kandidati/jan-novak.jpg"
};

export const kandidati: Kandidat[] = [
  {
    poradi: 1,
    jmeno: "Ing. Mgr. Jitka Typltová",
    datumNarozeni: "18. 12. 1970",
    povolani: "Manažerka bezpečnosti",
  },
  {
    poradi: 2,
    jmeno: "Ing. Radim Bílek",
    datumNarozeni: "1. 5. 1994",
    povolani: "Stavbyvedoucí",
  },
  {
    poradi: 3,
    jmeno: "Bc. Pavel Galatík, MSc.",
    datumNarozeni: "13. 3. 1982",
    povolani: "Konzultant IT bezpečnosti",
  },
  {
    poradi: 4,
    jmeno: "Kateřina Bravencová",
    datumNarozeni: "4. 10. 1998",
    povolani: "Učitelka v MŠ",
  },
  {
    poradi: 5,
    jmeno: "Bc. Marek Macůrek",
    datumNarozeni: "12. 12. 1978",
    povolani: "Policie ČR",
  },
  {
    poradi: 6,
    jmeno: "Ing. Lucie Damborská",
    datumNarozeni: "28. 9. 1995",
    povolani: "Administrativní pracovnice",
  },
  {
    poradi: 7,
    jmeno: "Stanislav Esterka",
    datumNarozeni: "30. 7. 1983",
    povolani: "Hasič",
  },
  {
    poradi: 8,
    jmeno: "Luboš Koliba",
    datumNarozeni: "4. 6. 1976",
    povolani: "Opravář zemědělských strojů",
  },
  {
    poradi: 9,
    jmeno: "Pavel Typlt",
    datumNarozeni: "6. 8. 1999",
    povolani: "Podnikatel",
  },
  {
    poradi: 10,
    jmeno: "Ivana Hanáková",
    datumNarozeni: "1. 8. 1982",
    povolani: "Personální a mzdová účetní",
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
