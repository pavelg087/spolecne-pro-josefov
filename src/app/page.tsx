import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  sdruzeni,
  oNas,
  kandidati,
  program,
  kontakt,
} from "@/data/content";

export default function Home() {
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
                    <div className="flex items-center gap-2">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                        {k.poradi}
                      </span>
                      <h3 className="font-bold text-gray-900">{k.jmeno}</h3>
                    </div>
                    {(k.povolani || k.vek) && (
                      <p className="mt-1 text-sm text-gray-500">
                        {[k.povolani, k.vek ? `${k.vek} let` : null]
                          .filter(Boolean)
                          .join(" · ")}
                      </p>
                    )}
                    <p className="mt-3 text-sm leading-relaxed text-gray-700">
                      {k.popis}
                    </p>
                  </div>
                </div>
              ))}
            </div>
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
      <Footer />
    </>
  );
}
