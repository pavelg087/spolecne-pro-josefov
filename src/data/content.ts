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
  medailonek?: Medailonek; // rozšířené představení (foto + otázky)
};

export type Medailonek = {
  foto?: string; // fotka na šířku pro medailonek
  fotoPopis?: string;
  otazky: { otazka: string; odpoved: string }[];
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
    foto: "/kandidati/radim-bilek.jpg",
    medailonek: {
      foto: "/kandidati/radim-bilek-predstaveni.jpg",
      otazky: [
        {
          otazka: "Proč kandiduji?",
          odpoved:
            "V naší obci už delší dobu kandiduje pouze jedna volební strana. " +
            "Myslím si, že každá obec si zaslouží možnost volby a různé pohledy " +
            "na její rozvoj. V malé obci nejde o soupeření, ale o spolupráci. " +
            "Zdravá konkurence ale motivuje všechny hledat lepší řešení, " +
            "přicházet s novými nápady a posouvat obec dopředu. Právě proto " +
            "jsem se rozhodl kandidovat – aby měli občané skutečnou možnost " +
            "volby a důvod přijít k volbám.",
        },
        {
          otazka: "Který bod programu mám nejvíc na srdci?",
          odpoved:
            "Nejvíce mi leží na srdci zachování tradic a péče o naši krajinu. " +
            "Jsem srdcem folklorista, vinař i horal a právě tyto tři věci mě " +
            "naučily vážit si toho, co jsme zdědili po našich předcích. Pro nás " +
            "vinaře je vztah k přírodě přirozený – bez zdravé krajiny by nebylo " +
            "ani vinohradů. Stejně důležité je ale pečovat i o naše tradice, " +
            "protože právě spojení folkloru, lidí a krásné krajiny dělá " +
            "z Josefova domov.",
        },
        {
          otazka: "Vzkaz voličům",
          odpoved:
            "Kde je možnost volby, tam je i motivace být lepší. Dojděte " +
            "k volbám.",
        },
      ],
    },
  },
  {
    poradi: 3,
    jmeno: "Bc. Pavel Galatík, MSc.",
    datumNarozeni: "13. 3. 1982",
    povolani: "Konzultant IT bezpečnosti",
    foto: "/kandidati/pavel-galatik-profil.jpg",
    medailonek: {
      foto: "/kandidati/pavel-galatik-predstaveni.jpg",
      otazky: [],
    },
  },
  {
    poradi: 4,
    jmeno: "Kateřina Bravencová",
    datumNarozeni: "4. 10. 1988",
    povolani: "Učitelka v MŠ",
  },
  {
    poradi: 5,
    jmeno: "Bc. Marek Macůrek",
    datumNarozeni: "12. 12. 1978",
    povolani: "Policie ČR",
    foto: "/kandidati/marek-macurek-profil.jpg",
    medailonek: {
      foto: "/kandidati/marek-macurek.jpg",
      fotoPopis:
        "Marek Macůrek s mladými stolními tenisty TJ Sokol Josefov.",
      otazky: [
        {
          otazka: "Odkud pocházíte a jaká je vaše rodina?",
          odpoved:
            "Jsem josefovský rodák. S manželkou Zuzanou jsme si zde postavili " +
            "rodinný dům a založili rodinu — máme čtrnáctiletého syna Tobiáše.",
        },
        {
          otazka: "Čemu se věnujete ve volném čase?",
          odpoved:
            "Celý život aktivně sportuji — fotbal a závodní stolní tenis, " +
            "dalším koníčkem je vinaření. Jsem předsedou TJ Sokol Josefov.",
        },
        {
          otazka: "Čím se živíte?",
          odpoved:
            "Jsem státní zaměstnanec — už 28 let pracuji u Policie ČR.",
        },
        {
          otazka: "Co byste chtěl v obci prosadit?",
          odpoved:
            "Své zkušenosti bych rád využil ke zvýšení bezpečnosti v obci ve " +
            "spolupráci s policií a IZS. Například podporou informativních " +
            "měřičů rychlosti, které pomohou zklidnit dopravu a zvýšit " +
            "bezpečnost chodců, a vybudováním kamerového systému u vjezdů a " +
            "výjezdů z obce.",
        },
        {
          otazka: "Váš vzkaz voličům?",
          odpoved:
            "Přijďte k volbám a podpořte především ty kandidáty, kterým " +
            "důvěřujete.",
        },
      ],
    },
  },
  {
    poradi: 6,
    jmeno: "Ing. Lucie Damborská",
    datumNarozeni: "28. 9. 1995",
    povolani: "Administrativní pracovnice",
    foto: "/kandidati/lucie-damborska.jpg",
    medailonek: {
      foto: "/kandidati/lucie-damborska-predstaveni.jpg",
      otazky: [
        {
          otazka: "Jak dlouho žijete v Josefově a co vás tu nejvíc drží?",
          odpoved:
            "V Josefově jsem se narodila a do školky a základní školy jsem " +
            "dojížděla do naší přátelské vesnice, do nedalekých Prušánek. I přes " +
            "neustálé dojíždění za prací, obchodem a do škol mě to v Josefově " +
            "stále drží. Když jsme se spolu s manželem rozhodovali, kde " +
            "zapustíme kořeny, rozhodnutí přetrvat v Josefově bylo jednoznačné. " +
            "Náš Josefov se nám líbí, že je malý, jsme tu vlastně všichni jako " +
            "rodina, všichni se známe, všichni si pomáháme. To, aby se Josefov " +
            "pomalu rozrůstal, zveleboval a kvetl, je mou velkou motivací.",
        },
        {
          otazka:
            "Čím se živíte a jak chcete své zkušenosti využít pro rozvoj obce?",
          odpoved:
            "Momentálně pracuji v autodopravní firmě, kde se starám o " +
            "administrativu a chod firmy a v poslední době jsem téměř pravá ruka " +
            "jednatele. Mé ambice jsou ale velké – mám potřebu sebe i věci kolem " +
            "neustále posouvat dál. Proto je možnost posunout naši obec lepším " +
            "směrem mou motivací.",
        },
        {
          otazka:
            "Kde vás lidé v Josefově nejčastěji potkají a jak trávíte volný čas?",
          odpoved:
            "V obci jsem často vidět. Několik let jsem vypomáhala u našeho " +
            "skvělého hospodského, potkávala se v hospodě s kamarády i staršími " +
            "občany a ráda si s nimi popovídala. Několik let jsem působila " +
            "v místní chase a stala se výrazným členem, který miluje tradice " +
            "a kroje. V posledních letech s rodinou a kamarády rádi trávíme čas " +
            "na místním dětském hřišti.",
        },
        {
          otazka: "Co byste chtěla v obci prosadit?",
          odpoved:
            "V obci mi chybí nádech moderní doby. Ráda bych zlepšila " +
            "informovanost, šířila místní tradiční i nově zavedené akce a tím " +
            "přilákala návštěvníky i společenské a sportovní vyžití.",
        },
        {
          otazka: "Co byste chtěla během následujících 4 let reálně změnit?",
          odpoved:
            "Ráda bych zkvalitnila život v obci. Aktivně bych se zapojila do " +
            "dlouho slibované cyklostezky na Prušánky, chodníku na hřbitov " +
            "i vybudování silnic v nových ulicích – aby noví obyvatelé měli " +
            "stejně kvalitní život jako zbytek obce a mohli si tu na volných " +
            "pozemcích postavit rodinný dům.",
        },
      ],
    },
  },
  {
    poradi: 7,
    jmeno: "Stanislav Esterka",
    datumNarozeni: "30. 7. 1983",
    povolani: "Hasič",
    foto: "/kandidati/stanislav-esterka.jpg",
    medailonek: {
      foto: "/kandidati/stanislav-esterka-2.jpg",
      otazky: [],
    },
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
    foto: "/kandidati/ivana-hanakova.jpg",
    medailonek: {
      foto: "/kandidati/ivana-hanakova.jpg",
      otazky: [],
    },
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

// Konkrétní program (podle podkladu sdružení). Doplňuje tematické okruhy výše.
export const konkretniProgram = {
  nadpis: "Konkrétní kroky pro Josefov",
  uvod:
    "Je nás tak akorát na domluvu — společně si pomůžeme. Ptáme se, co " +
    "potřebujete, a tady je, co pro obec chceme prosadit.",
  potrebySkupina: {
    nadpis: "Co pro vás chceme zajistit",
    body: [
      "Zajistit dovoz objednaných nákupů 2× týdně.",
      "Dostupnost starosty na úřadě alespoň jednou týdně do 18 hodin.",
      "Přehodnocení odpadového systému — zejména čistota a bezpečnost u kontejnerů.",
      "Bezpečné dojetí na kole do Prušánek — po zjištění stavu výkupu pozemků případně navrhnout jinou cestu.",
      "Zvýšit společnou informovanost — jednoduše pomocí informační tabule i moderními technologiemi.",
    ],
  },
  investiceSkupina: {
    nadpis: "Zvelebení obce",
    body: [
      "Revitalizace hřišť.",
      "Úprava prostranství „U rybníčku“ — prvky pro děti i dospělé.",
      "Chodník na hřbitov.",
      "Výsadba zeleně.",
    ],
  },
  participativni:
    "Navrhujeme participativní rozpočet — sami si určíte, na co přednostně " +
    "půjdou naše společné peníze.",
};

export const aktivity = {
  uvod:
    "Nejsme tu jen kvůli volbám. Do dění v Josefově se zapojujeme dlouhodobě " +
    "a budeme pokračovat v osvědčených a oblíbených aktivitách.",
  polozky: [
    {
      nadpis: "Větrníky za humnama",
      text:
        "Na akci, o kterou jsme úplně nestáli, se ukázalo, kolik schopných " +
        "spoluobčanů mezi sebou máme. Děkujeme za velkou pomoc zejména " +
        "Mgr. Marku Weiserovi, který pro nás zpracoval ohromné množství " +
        "materiálů — i všem, kteří roky, viditelně i neviditelně, pro nás " +
        "všechny společně pracují.",
    },
  ],
  rozhovor: {
    titulek: "„Větrníky prý zdevastují jih Moravy“",
    osoba: "Ing. Mgr. Jitka Typltová",
    zdroj: "ParlamentníListy.cz",
    datum: "2. 7. 2026",
    perex:
      "Naše kandidátka Jitka Typltová v rozhovoru upozorňuje na plánovanou " +
      "výstavbu větrných elektráren na jižní Moravě a její možné dopady na " +
      "zemědělství, vinařství, lázeňství i chráněnou krajinu.",
    url: "https://www.parlamentnilisty.cz/arena/rozhovory/Pole-vinne-sklepy-lazne-zvirata-Vetrniky-pry-zdevastuji-jih-Moravy-793574",
  },
};

export const kontakt = {
  email: "info@spolecneprojosefov.cz",
  // Volitelně doplňte:
  facebook: "", // např. "https://facebook.com/..."
  telefon: "",
};

// -------------------------------------------------------------------
//  Souhrnný objekt veškerého editovatelného obsahu.
//  Slouží jako VÝCHOZÍ hodnoty; admin ukládá úpravy do databáze,
//  které se pak přes tyto výchozí hodnoty "překryjí".
// -------------------------------------------------------------------
export type SiteContent = {
  sdruzeni: typeof sdruzeni;
  oNas: string[];
  kandidati: Kandidat[];
  program: ProgramBod[];
  konkretniProgram: typeof konkretniProgram;
  aktivity: typeof aktivity;
  kontakt: typeof kontakt;
};

export const defaultContent: SiteContent = {
  sdruzeni,
  oNas,
  kandidati,
  program,
  konkretniProgram,
  aktivity,
  kontakt,
};
