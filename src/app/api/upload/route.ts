import { NextRequest, NextResponse } from "next/server";
import { savePhoto } from "@/lib/content-store";
import { hasGithub } from "@/lib/github";

export const dynamic = "force-dynamic";

// Nahrání fotky — chráněné heslem (ADMIN_PASSWORD). Uloží do public/kandidati/.
export async function POST(req: NextRequest) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    return NextResponse.json(
      { error: "Administrace není nakonfigurovaná (chybí ADMIN_PASSWORD)." },
      { status: 503 }
    );
  }
  if (req.headers.get("x-admin-password") !== expected) {
    return NextResponse.json({ error: "Nesprávné heslo." }, { status: 401 });
  }
  if (process.env.NODE_ENV === "production" && !hasGithub()) {
    return NextResponse.json(
      { error: "Nahrávání není nakonfigurované (chybí GITHUB_TOKEN)." },
      { status: 503 }
    );
  }

  let body: { filename?: string; dataBase64?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Neplatný formát." }, { status: 400 });
  }

  const { filename, dataBase64 } = body;
  if (!filename || !dataBase64) {
    return NextResponse.json(
      { error: "Chybí soubor nebo název." },
      { status: 400 }
    );
  }

  // limit ~5 MB (base64 je ~4/3 velikosti binárky)
  if (dataBase64.length > 7_000_000) {
    return NextResponse.json(
      { error: "Fotka je příliš velká (max ~5 MB)." },
      { status: 413 }
    );
  }

  try {
    const path = await savePhoto(filename, dataBase64);
    return NextResponse.json({ ok: true, path });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Nahrání selhalo." },
      { status: 500 }
    );
  }
}
