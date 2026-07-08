import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getSiteContent } from "@/lib/content-store";

// Stránka se vykresluje dynamicky, aby vždy ukázala aktuální obsah z adminu.
export const dynamic = "force-dynamic";

export default async function Home() {
  const {
    sdruzeni,
    oNas,
    kandidati,
    program,
    konkretniProgram,
    aktivity,
    kontakt,
  } = await getSiteContent();

  return (
    <>
      <Header />
      <main>
        {/* HERO */}
        <section className="bg-gradient-to-br from-primary to-primary-dark text-white">
          <div className="mx-auto max-w-5xl px-4 py-24 text-center">
            <p className="mb-4 inline-block rounded-full bg-accent px-4 py-1 text-sm font-semibold text-primary-dark">
              Komunální volby 2026
            </p>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">
              {sdruzeni.nazev}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90 sm:text-xl">
              {sdruzeni.motto}
            </p>
            <p className="mt-2 text-sm text-white/70">{sdruzeni.podtitul}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href="#program"
                className="rounded-lg bg-accent px-6 py-3 font-semibold text-primary-dark transition hover:bg-accent-light"
              >
                Náš program
              </a>
              <a
                href="#kandidati"
                className="rounded-lg border border-white/40 px-6 py-3 font-semibold transition hover:bg-white/10"
              >
                Naši kandidáti
              </a>
            </div>
          </div>
        </section>

        {/* O NÁS */}
        <section id="o-nas" className="scroll-mt-20 bg-white">
          <div className="mx-auto max-w-4xl px-4 py-20">
            <h2 className="text-center text-3xl font-bold text-primary">
              O našem sdružení
            </h2>
            <p className="mt-6 text-center text-lg leading-relaxed text-gray-700">
              {sdruzeni.uvod}
            </p>
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {oNas.map((text, i) => (
                <div
                  key={i}
                  className="rounded-xl bg-surface p-6 text-sm leading-relaxed text-gray-700 shadow-sm"
                >
                  {text}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* KANDIDÁTI */}
        <section id="kandidati" className="scroll-mt-20 bg-surface">
          <div className="mx-auto max-w-6xl px-4 py-20">
            <h2 className="text-center text-3xl font-bold text-primary">
              Naši kandidáti
            </h2>
            <p className="mt-3 text-center text-gray-600">
              Lidé, kteří jsou připraveni pracovat pro Josefov.
            </p>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {kandidati.map((k) => (
                <div
                  key={k.poradi}
                  className="flex flex-col overflow-hidden rounded-xl bg-white shadow-sm transition hover:shadow-md"
                >
                  <div className="flex aspect-square items-center justify-center bg-surface-dark">
                    {k.foto ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={k.foto}
                        alt={k.jmeno}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-6xl text-primary/30">
                        {k.jmeno.charAt(0)}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-bold text-gray-900">{k.jmeno}</h3>
                    {k.povolani && (
                      <p className="mt-1 text-sm font-medium text-secondary">
                        {k.povolani}
                      </p>
                    )}
                    {k.datumNarozeni && (
                      <p className="mt-0.5 text-xs text-gray-400">
                        nar. {k.datumNarozeni}
                      </p>
                    )}
                    {k.popis && (
                      <p className="mt-3 text-sm leading-relaxed text-gray-700">
                        {k.popis}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Medailonky kandidátů (kdo vyplnil rozšířené představení) */}
            {kandidati.some((k) => k.medailonek) && (
              <div className="mt-16">
                <h3 className="text-center text-2xl font-bold text-primary">
                  Kandidáti se představují
                </h3>
                <div className="mt-8 space-y-8">
                  {kandidati
                    .filter((k) => k.medailonek)
                    .map((k) => {
                      const m = k.medailonek!;
                      return (
                        <div
                          key={k.poradi}
                          className="overflow-hidden rounded-2xl border border-surface-dark bg-white shadow-sm"
                        >
                          <div className="grid gap-0 md:grid-cols-2">
                            {m.foto && (
                              <div className="bg-surface-dark">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={m.foto}
                                  alt={m.fotoPopis || k.jmeno}
                                  className="h-full max-h-96 w-full object-cover"
                                />
                              </div>
                            )}
                            <div className="p-6 sm:p-8">
                              <h4 className="text-xl font-bold text-gray-900">
                                {k.jmeno}
                              </h4>
                              {k.povolani && (
                                <p className="text-sm font-medium text-secondary">
                                  {k.povolani}
                                </p>
                              )}
                              {m.fotoPopis && (
                                <p className="mt-2 text-xs italic text-gray-400">
                                  {m.fotoPopis}
                                </p>
                              )}
                              <dl className="mt-5 space-y-4">
                                {m.otazky.map((qa, i) => (
                                  <div key={i}>
                                    <dt className="text-sm font-semibold text-primary">
                                      {qa.otazka}
                                    </dt>
                                    <dd className="mt-1 text-sm leading-relaxed text-gray-700">
                                      {qa.odpoved}
                                    </dd>
                                  </div>
                                ))}
                              </dl>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* PROGRAM */}
        <section id="program" className="scroll-mt-20 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-20">
            <h2 className="text-center text-3xl font-bold text-primary">
              Náš program
            </h2>
            <p className="mt-3 text-center text-gray-600">
              Co chceme pro Josefov prosadit.
            </p>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {program.map((p, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-surface-dark bg-surface p-6"
                >
                  <div className="text-4xl">{p.ikona}</div>
                  <h3 className="mt-3 text-lg font-bold text-primary">
                    {p.nadpis}
                  </h3>
                  <ul className="mt-3 space-y-2">
                    {p.body.map((b, j) => (
                      <li
                        key={j}
                        className="flex gap-2 text-sm leading-relaxed text-gray-700"
                      >
                        <span className="mt-1 text-accent">✓</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Konkrétní program dle podkladu sdružení */}
            <div className="mt-16 rounded-2xl bg-primary p-8 text-white sm:p-10">
              <h3 className="text-2xl font-bold">{konkretniProgram.nadpis}</h3>
              <p className="mt-2 max-w-3xl text-white/85">
                {konkretniProgram.uvod}
              </p>
              <div className="mt-8 grid gap-8 md:grid-cols-2">
                <div>
                  <h4 className="font-semibold text-accent-light">
                    {konkretniProgram.potrebySkupina.nadpis}
                  </h4>
                  <ul className="mt-3 space-y-2">
                    {konkretniProgram.potrebySkupina.body.map((b, i) => (
                      <li key={i} className="flex gap-2 text-sm text-white/90">
                        <span className="mt-0.5 text-accent-light">✓</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-accent-light">
                    {konkretniProgram.investiceSkupina.nadpis}
                  </h4>
                  <ul className="mt-3 space-y-2">
                    {konkretniProgram.investiceSkupina.body.map((b, i) => (
                      <li key={i} className="flex gap-2 text-sm text-white/90">
                        <span className="mt-0.5 text-accent-light">✓</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <p className="mt-8 rounded-xl bg-white/10 p-4 text-sm font-medium">
                💡 {konkretniProgram.participativni}
              </p>
            </div>
          </div>
        </section>

        {/* AKTIVITY SDRUŽENÍ */}
        <section id="aktivity" className="scroll-mt-20 bg-surface">
          <div className="mx-auto max-w-4xl px-4 py-20">
            <h2 className="text-center text-3xl font-bold text-primary">
              Aktivity sdružení
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-gray-700">
              {aktivity.uvod}
            </p>

            <div className="mt-10 space-y-6">
              {aktivity.polozky.map((a, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-surface-dark bg-white p-6 shadow-sm"
                >
                  <h3 className="text-lg font-bold text-secondary">
                    {a.nadpis}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-700">
                    {a.text}
                  </p>
                </div>
              ))}

              {/* Odkaz na rozhovor */}
              <a
                href={aktivity.rozhovor.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-xl border border-accent bg-amber-50 p-6 shadow-sm transition hover:shadow-md"
              >
                <div className="text-xs font-semibold uppercase tracking-wide text-accent">
                  Rozhovor · {aktivity.rozhovor.zdroj} ·{" "}
                  {aktivity.rozhovor.datum}
                </div>
                <h3 className="mt-2 text-lg font-bold text-gray-900">
                  {aktivity.rozhovor.titulek}
                </h3>
                <p className="mt-1 text-sm font-medium text-gray-600">
                  {aktivity.rozhovor.osoba}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-gray-700">
                  {aktivity.rozhovor.perex}
                </p>
                <span className="mt-3 inline-block text-sm font-semibold text-primary">
                  Přečíst celý rozhovor →
                </span>
              </a>
            </div>
          </div>
        </section>

        {/* KONTAKT */}
        <section
          id="kontakt"
          className="scroll-mt-20 bg-gradient-to-br from-primary to-primary-dark text-white"
        >
          <div className="mx-auto max-w-3xl px-4 py-20 text-center">
            <h2 className="text-3xl font-bold">Spojte se s námi</h2>
            <p className="mt-4 text-white/90">
              Máte dotaz, nápad nebo nám chcete pomoci? Ozvěte se nám.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              {kontakt.email && (
                <a
                  href={`mailto:${kontakt.email}`}
                  className="rounded-lg bg-accent px-6 py-3 font-semibold text-primary-dark transition hover:bg-accent-light"
                >
                  ✉️ {kontakt.email}
                </a>
              )}
              {kontakt.facebook && (
                <a
                  href={kontakt.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-white/40 px-6 py-3 font-semibold transition hover:bg-white/10"
                >
                  Facebook
                </a>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer
        nazev={sdruzeni.nazev}
        obec={sdruzeni.obec}
        email={kontakt.email}
      />
    </>
  );
}
