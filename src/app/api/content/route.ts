import { NextRequest, NextResponse } from "next/server";
import { getSiteContent, saveSiteContent } from "@/lib/content-store";
import type { SiteContent } from "@/data/content";

export const dynamic = "force-dynamic";

// Veřejné načtení aktuálního obsahu (pro předvyplnění administrace).
export async function GET() {
  const content = await getSiteContent();
  return NextResponse.json(content);
}

// Uložení obsahu — chráněné heslem (proměnná ADMIN_PASSWORD).
export async function POST(req: NextRequest) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    return NextResponse.json(
      { error: "Administrace není nakonfigurovaná (chybí heslo ADMIN_PASSWORD)." },
      { status: 503 }
    );
  }
  if (req.headers.get("x-admin-password") !== expected) {
    return NextResponse.json({ error: "Nesprávné heslo." }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Neplatný formát." }, { status: 400 });
  }

  // Základní kontrola tvaru dat.
  const c = body as Partial<SiteContent>;
  if (
    !c ||
    typeof c !== "object" ||
    !c.sdruzeni ||
    !Array.isArray(c.kandidati) ||
    !Array.isArray(c.program) ||
    !Array.isArray(c.oNas)
  ) {
    return NextResponse.json(
      { error: "Data nemají očekávanou strukturu." },
      { status: 400 }
    );
  }

  await saveSiteContent(c as SiteContent);
  return NextResponse.json({ ok: true });
}
