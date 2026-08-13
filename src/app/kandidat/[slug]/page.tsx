import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getSiteContent } from "@/lib/content-store";
import { slugFromName } from "@/lib/slug";
import type { Kandidat } from "@/data/content";

const BASE_URL = "https://www.spolecneprojosefov.cz";

async function najdiKandidata(slug: string): Promise<Kandidat | undefined> {
  const { kandidati } = await getSiteContent();
  return kandidati.find((k) => slugFromName(k.jmeno) === slug);
}

export async function generateStaticParams() {
  const { kandidati } = await getSiteContent();
  return kandidati.map((k) => ({ slug: slugFromName(k.jmeno) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const k = await najdiKandidata(slug);
  if (!k) return { title: "Kandidát nenalezen" };

  const popis = [k.povolani, "kandidát/ka sdružení Společně pro Josefov"]
    .filter(Boolean)
    .join(" — ");
  // pro náhled na sociálních sítích upřednostníme fotku z představení
  const obrazek = k.medailonek?.foto || k.foto || "/logo.png";

  return {
    title: `${k.jmeno} — Společně pro Josefov`,
    description: popis,
    alternates: { canonical: `/kandidat/${slug}` },
    openGraph: {
      type: "profile",
      locale: "cs_CZ",
      url: `${BASE_URL}/kandidat/${slug}`,
      siteName: "Společně pro Josefov",
      title: `${k.jmeno} — Společně pro Josefov`,
      description: popis,
      images: [{ url: obrazek }],
    },
  };
}

export default async function KandidatPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const k = await najdiKandidata(slug);
  if (!k) notFound();

  const { sdruzeni, kontakt } = await getSiteContent();
  const m = k.medailonek;
  const hlavniFoto = m?.foto || k.foto;

  return (
    <>
      <Header />
      <main className="bg-surface">
        <div className="mx-auto max-w-3xl px-4 py-12">
          <Link
            href="/#kandidati"
            className="text-sm font-medium text-primary hover:underline"
          >
            ← Zpět na naše lidi
          </Link>

          <article className="mt-4 overflow-hidden rounded-2xl bg-white shadow-sm">
            {hlavniFoto && (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={hlavniFoto}
                alt={m?.fotoPopis || k.jmeno}
                className="max-h-[70vh] w-full bg-surface object-contain"
              />
            )}

            <div className="p-6 sm:p-8">
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                {k.jmeno}
              </h1>
              {k.povolani && (
                <p className="mt-1 font-medium text-secondary">{k.povolani}</p>
              )}
              {k.datumNarozeni && (
                <p className="text-sm text-gray-400">nar. {k.datumNarozeni}</p>
              )}
              {m?.fotoPopis && (
                <p className="mt-2 text-xs italic text-gray-400">
                  {m.fotoPopis}
                </p>
              )}

              {k.popis && (
                <p className="mt-5 leading-relaxed text-gray-700">{k.popis}</p>
              )}

              {m && m.otazky.length > 0 && (
                <dl className="mt-6 space-y-5">
                  {m.otazky.map((qa, i) => (
                    <div key={i}>
                      <dt className="font-semibold text-primary">
                        {qa.otazka}
                      </dt>
                      <dd className="mt-1 leading-relaxed text-gray-700">
                        {qa.odpoved}
                      </dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>
          </article>

          <div className="mt-8 rounded-2xl bg-primary p-6 text-center text-white">
            <p className="text-lg font-semibold">{sdruzeni.nazev}</p>
            <p className="mt-1 text-sm text-white/85">{sdruzeni.motto}</p>
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              <Link
                href="/#program"
                className="rounded-lg bg-accent px-5 py-2.5 font-semibold text-primary-dark transition hover:bg-accent-light"
              >
                Náš program
              </Link>
              <Link
                href="/#kandidati"
                className="rounded-lg border border-white/40 px-5 py-2.5 font-semibold transition hover:bg-white/10"
              >
                Naši lidé
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer
        nazev={sdruzeni.nazev}
        obec={sdruzeni.obec}
        email={kontakt.email}
      />
    </>
  );
}
