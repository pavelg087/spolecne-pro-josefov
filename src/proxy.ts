import { NextResponse, type NextRequest } from "next/server";

/**
 * WEB JE UKONČEN – všechny adresy (stránky, fotky kandidátů, API, administrace)
 * vracejí jen oznámení „Stránky již nejsou v provozu“ s kódem 410 Gone,
 * aby je vyhledávače vyřadily. Celý projekt i obsah zůstávají zachované.
 *
 * Znovuzprovoznění: ve Vercelu nastavit proměnnou SITE_CLOSED=0 a znovu nasadit
 * (nebo tento soubor smazat).
 */

// Ověření vlastnictví pro Google Search Console necháváme dostupné (žádost o odstranění z vyhledávání).
const ALLOWED = new Set(["/google08b8b0e631463d40.html"]);

const PAGE = `<!doctype html>
<html lang="cs">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow, noarchive">
<title>Stránky již nejsou v provozu</title>
<style>
  html,body{margin:0;height:100%}
  body{display:flex;align-items:center;justify-content:center;background:#f6f7f9;color:#1f2937;
       font-family:system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;padding:16px;box-sizing:border-box}
  main{max-width:520px;text-align:center;background:#fff;border-radius:16px;padding:40px 28px;
       box-shadow:0 1px 3px rgba(0,0,0,.08)}
  h1{font-size:1.5rem;margin:0 0 12px}
  p{line-height:1.6;margin:0 0 10px;color:#4b5563}
  a{color:#004f7c}
</style>
</head>
<body>
<main>
  <h1>Stránky již nejsou v provozu</h1>
  <p>Webové stránky sdružení Společně pro Josefov byly ukončeny.</p>
  <p>Informace o obci najdete na stránkách <a href="https://www.josefov.eu">obce Josefov</a>.</p>
</main>
</body>
</html>`;

export function proxy(request: NextRequest) {
  if (process.env.SITE_CLOSED === "0") return NextResponse.next();
  if (ALLOWED.has(request.nextUrl.pathname)) return NextResponse.next();
  return new NextResponse(request.method === "HEAD" ? null : PAGE, {
    status: 410,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex, nofollow, noarchive",
    },
  });
}

export const config = {
  // všechno kromě interních souborů Next.js
  matcher: ["/((?!_next/).*)"],
};
