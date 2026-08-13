// Tituly před jménem i za ním (do slugu se nepromítají).
const TITULY = /\b(Ing|Mgr|Bc|MSc|MBA|JUDr|MUDr|PhDr|RNDr|Ph\.?D|DiS)\b\.?,?/gi;

// Kombinující diakritická znaménka (U+0300–U+036F), která zbydou po NFD.
const DIAKRITIKA = /[\u0300-\u036f]/g;

// Převede jméno kandidáta na adresu (slug):
// "Bc. Marek Macůrek" -> "marek-macurek"
export function slugFromName(jmeno: string): string {
  return jmeno
    .replace(TITULY, "")
    .normalize("NFD")
    .replace(DIAKRITIKA, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
