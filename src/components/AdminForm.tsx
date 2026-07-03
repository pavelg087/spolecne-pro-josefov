"use client";

import { useState } from "react";
import type { SiteContent, Kandidat, ProgramBod } from "@/data/content";

// ---- malé pomocné prvky --------------------------------------------

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="mb-1 block text-sm font-medium text-gray-700">
      {children}
    </label>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="mb-4">
      <Label>{label}</Label>
      <input
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-gray-300 px-3 py-2"
      />
    </div>
  );
}

function Area({
  label,
  value,
  onChange,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  return (
    <div className="mb-4">
      <Label>{label}</Label>
      <textarea
        value={value}
        rows={rows}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-gray-300 px-3 py-2"
      />
    </div>
  );
}

function StringList({
  label,
  items,
  onChange,
  textarea,
  addLabel = "+ Přidat položku",
}: {
  label: string;
  items: string[];
  onChange: (next: string[]) => void;
  textarea?: boolean;
  addLabel?: string;
}) {
  return (
    <div className="mb-4">
      <Label>{label}</Label>
      <div className="space-y-2">
        {items.map((it, i) => (
          <div key={i} className="flex gap-2">
            {textarea ? (
              <textarea
                value={it}
                rows={2}
                onChange={(e) => {
                  const n = [...items];
                  n[i] = e.target.value;
                  onChange(n);
                }}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
              />
            ) : (
              <input
                value={it}
                onChange={(e) => {
                  const n = [...items];
                  n[i] = e.target.value;
                  onChange(n);
                }}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
              />
            )}
            <button
              type="button"
              onClick={() => onChange(items.filter((_, j) => j !== i))}
              className="shrink-0 rounded-lg border border-red-200 px-3 text-red-600 hover:bg-red-50"
              aria-label="Odebrat"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => onChange([...items, ""])}
        className="mt-2 text-sm font-medium text-primary hover:underline"
      >
        {addLabel}
      </button>
    </div>
  );
}

function SectionCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-6 rounded-2xl border border-surface-dark bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-bold text-primary">{title}</h2>
      {children}
    </section>
  );
}

// ---- hlavní komponenta ---------------------------------------------

export default function AdminForm() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [content, setContent] = useState<SiteContent | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function update(fn: (draft: SiteContent) => void) {
    setContent((prev) => {
      if (!prev) return prev;
      const next = structuredClone(prev);
      fn(next);
      return next;
    });
  }

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // ověření hesla proti uložení "naprázdno" nelze; místo toho jen
      // načteme obsah a heslo ověříme až při uložení. Pro pohodlí ale
      // rovnou zkusíme "probní" GET (veřejný) a heslo držíme v paměti.
      const res = await fetch("/api/content", { cache: "no-store" });
      if (!res.ok) throw new Error("Nepodařilo se načíst obsah.");
      const data = (await res.json()) as SiteContent;
      setContent(data);
      setAuthed(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Chyba.");
    } finally {
      setLoading(false);
    }
  }

  async function save() {
    if (!content) return;
    setSaving(true);
    setMessage(null);
    setError(null);
    // normalizace pořadí kandidátů podle jejich pořadí v seznamu
    const toSave = structuredClone(content);
    toSave.kandidati = toSave.kandidati.map((k, i) => ({
      ...k,
      poradi: i + 1,
    }));
    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": password,
        },
        body: JSON.stringify(toSave),
      });
      if (res.status === 401) {
        setError("Nesprávné heslo — uložení zamítnuto.");
        return;
      }
      if (res.status === 503) {
        setError(
          "Administrace zatím není nakonfigurovaná (na serveru chybí heslo ADMIN_PASSWORD)."
        );
        return;
      }
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.error || "Uložení selhalo.");
      }
      setContent(toSave);
      setMessage("✓ Uloženo. Změny jsou na webu ihned viditelné.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Chyba při ukládání.");
    } finally {
      setSaving(false);
    }
  }

  // --- přihlašovací obrazovka ---
  if (!authed || !content) {
    return (
      <main className="mx-auto max-w-sm px-4 py-16">
        <h1 className="text-2xl font-bold text-gray-900">Administrace webu</h1>
        <p className="mt-2 text-sm text-gray-600">
          Zadejte heslo pro úpravu obsahu.
        </p>
        <form className="mt-6 space-y-3" onSubmit={login}>
          <input
            type="password"
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Heslo"
            className="w-full rounded-lg border border-gray-300 px-4 py-3"
          />
          <button
            type="submit"
            disabled={loading || !password}
            className="w-full rounded-lg bg-primary px-6 py-3 font-semibold text-white transition hover:bg-primary-dark disabled:opacity-50"
          >
            {loading ? "Načítám…" : "Přihlásit"}
          </button>
        </form>
        {error && (
          <div className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800">
            {error}
          </div>
        )}
        <p className="mt-4 text-xs text-gray-400">
          Heslo se ověří při uložení změn.
        </p>
      </main>
    );
  }

  const c = content;

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 pb-28">
      <h1 className="text-2xl font-bold text-gray-900">Administrace webu</h1>
      <p className="mt-1 text-sm text-gray-600">
        Upravte texty a uložte. Změny se na webu projeví ihned.
      </p>

      {/* SDRUŽENÍ */}
      <SectionCard title="Úvod / sdružení">
        <Field
          label="Název sdružení"
          value={c.sdruzeni.nazev}
          onChange={(v) => update((d) => (d.sdruzeni.nazev = v))}
        />
        <Field
          label="Podtitul"
          value={c.sdruzeni.podtitul}
          onChange={(v) => update((d) => (d.sdruzeni.podtitul = v))}
        />
        <Field
          label="Obec"
          value={c.sdruzeni.obec}
          onChange={(v) => update((d) => (d.sdruzeni.obec = v))}
        />
        <Area
          label="Motto (velký text na úvodu)"
          value={c.sdruzeni.motto}
          onChange={(v) => update((d) => (d.sdruzeni.motto = v))}
        />
        <Area
          label="Úvodní text (sekce O nás)"
          value={c.sdruzeni.uvod}
          rows={4}
          onChange={(v) => update((d) => (d.sdruzeni.uvod = v))}
        />
      </SectionCard>

      {/* O NÁS */}
      <SectionCard title="O nás — hodnotové bloky">
        <StringList
          label="Bloky (3 krátké odstavce)"
          items={c.oNas}
          textarea
          onChange={(next) => update((d) => (d.oNas = next))}
          addLabel="+ Přidat blok"
        />
      </SectionCard>

      {/* KANDIDÁTI */}
      <SectionCard title="Kandidáti (pořadí = pořadí na webu)">
        {c.kandidati.map((k: Kandidat, i: number) => (
          <div
            key={i}
            className="mb-4 rounded-xl border border-surface-dark bg-surface p-4"
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-500">
                #{i + 1}
              </span>
              <div className="flex gap-1">
                <button
                  type="button"
                  disabled={i === 0}
                  onClick={() =>
                    update((d) => {
                      [d.kandidati[i - 1], d.kandidati[i]] = [
                        d.kandidati[i],
                        d.kandidati[i - 1],
                      ];
                    })
                  }
                  className="rounded border border-gray-300 px-2 disabled:opacity-30"
                >
                  ▲
                </button>
                <button
                  type="button"
                  disabled={i === c.kandidati.length - 1}
                  onClick={() =>
                    update((d) => {
                      [d.kandidati[i + 1], d.kandidati[i]] = [
                        d.kandidati[i],
                        d.kandidati[i + 1],
                      ];
                    })
                  }
                  className="rounded border border-gray-300 px-2 disabled:opacity-30"
                >
                  ▼
                </button>
                <button
                  type="button"
                  onClick={() =>
                    update((d) => {
                      d.kandidati = d.kandidati.filter((_, j) => j !== i);
                    })
                  }
                  className="rounded border border-red-200 px-2 text-red-600 hover:bg-red-50"
                >
                  ✕
                </button>
              </div>
            </div>
            <Field
              label="Jméno"
              value={k.jmeno}
              onChange={(v) => update((d) => (d.kandidati[i].jmeno = v))}
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Profese"
                value={k.povolani ?? ""}
                onChange={(v) => update((d) => (d.kandidati[i].povolani = v))}
              />
              <Field
                label="Datum narození"
                value={k.datumNarozeni ?? ""}
                onChange={(v) =>
                  update((d) => (d.kandidati[i].datumNarozeni = v))
                }
              />
            </div>
            <Field
              label="Cesta k fotce (nepovinné, např. /kandidati/jmeno.jpg)"
              value={k.foto ?? ""}
              onChange={(v) => update((d) => (d.kandidati[i].foto = v))}
            />
            <Area
              label="Popis (nepovinné)"
              value={k.popis ?? ""}
              onChange={(v) => update((d) => (d.kandidati[i].popis = v))}
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            update((d) =>
              d.kandidati.push({
                poradi: d.kandidati.length + 1,
                jmeno: "",
                povolani: "",
                datumNarozeni: "",
              })
            )
          }
          className="text-sm font-medium text-primary hover:underline"
        >
          + Přidat kandidáta
        </button>
      </SectionCard>

      {/* PROGRAM – tematické okruhy */}
      <SectionCard title="Program — tematické okruhy">
        {c.program.map((p: ProgramBod, i: number) => (
          <div
            key={i}
            className="mb-4 rounded-xl border border-surface-dark bg-surface p-4"
          >
            <div className="mb-2 flex justify-end">
              <button
                type="button"
                onClick={() =>
                  update((d) => {
                    d.program = d.program.filter((_, j) => j !== i);
                  })
                }
                className="rounded border border-red-200 px-2 text-red-600 hover:bg-red-50"
              >
                ✕ odebrat okruh
              </button>
            </div>
            <div className="grid gap-4 sm:grid-cols-[80px_1fr]">
              <Field
                label="Ikona"
                value={p.ikona}
                onChange={(v) => update((d) => (d.program[i].ikona = v))}
              />
              <Field
                label="Nadpis"
                value={p.nadpis}
                onChange={(v) => update((d) => (d.program[i].nadpis = v))}
              />
            </div>
            <StringList
              label="Body"
              items={p.body}
              onChange={(next) => update((d) => (d.program[i].body = next))}
              addLabel="+ Přidat bod"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            update((d) =>
              d.program.push({ ikona: "⭐", nadpis: "", body: [] })
            )
          }
          className="text-sm font-medium text-primary hover:underline"
        >
          + Přidat okruh
        </button>
      </SectionCard>

      {/* KONKRÉTNÍ PROGRAM */}
      <SectionCard title="Program — konkrétní kroky">
        <Field
          label="Nadpis"
          value={c.konkretniProgram.nadpis}
          onChange={(v) => update((d) => (d.konkretniProgram.nadpis = v))}
        />
        <Area
          label="Úvodní text"
          value={c.konkretniProgram.uvod}
          onChange={(v) => update((d) => (d.konkretniProgram.uvod = v))}
        />
        <Field
          label="Nadpis 1. skupiny"
          value={c.konkretniProgram.potrebySkupina.nadpis}
          onChange={(v) =>
            update((d) => (d.konkretniProgram.potrebySkupina.nadpis = v))
          }
        />
        <StringList
          label="Body 1. skupiny"
          items={c.konkretniProgram.potrebySkupina.body}
          onChange={(next) =>
            update((d) => (d.konkretniProgram.potrebySkupina.body = next))
          }
          addLabel="+ Přidat bod"
        />
        <Field
          label="Nadpis 2. skupiny"
          value={c.konkretniProgram.investiceSkupina.nadpis}
          onChange={(v) =>
            update((d) => (d.konkretniProgram.investiceSkupina.nadpis = v))
          }
        />
        <StringList
          label="Body 2. skupiny"
          items={c.konkretniProgram.investiceSkupina.body}
          onChange={(next) =>
            update((d) => (d.konkretniProgram.investiceSkupina.body = next))
          }
          addLabel="+ Přidat bod"
        />
        <Area
          label="Zvýrazněná věta (participativní rozpočet)"
          value={c.konkretniProgram.participativni}
          onChange={(v) =>
            update((d) => (d.konkretniProgram.participativni = v))
          }
        />
      </SectionCard>

      {/* AKTIVITY */}
      <SectionCard title="Aktivity sdružení">
        <Area
          label="Úvodní text"
          value={c.aktivity.uvod}
          onChange={(v) => update((d) => (d.aktivity.uvod = v))}
        />
        {c.aktivity.polozky.map((a, i) => (
          <div
            key={i}
            className="mb-4 rounded-xl border border-surface-dark bg-surface p-4"
          >
            <div className="mb-2 flex justify-end">
              <button
                type="button"
                onClick={() =>
                  update((d) => {
                    d.aktivity.polozky = d.aktivity.polozky.filter(
                      (_, j) => j !== i
                    );
                  })
                }
                className="rounded border border-red-200 px-2 text-red-600 hover:bg-red-50"
              >
                ✕ odebrat aktivitu
              </button>
            </div>
            <Field
              label="Nadpis aktivity"
              value={a.nadpis}
              onChange={(v) =>
                update((d) => (d.aktivity.polozky[i].nadpis = v))
              }
            />
            <Area
              label="Text"
              value={a.text}
              rows={4}
              onChange={(v) => update((d) => (d.aktivity.polozky[i].text = v))}
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            update((d) =>
              d.aktivity.polozky.push({ nadpis: "", text: "" })
            )
          }
          className="mb-6 text-sm font-medium text-primary hover:underline"
        >
          + Přidat aktivitu
        </button>

        <div className="rounded-xl border border-accent/40 bg-amber-50 p-4">
          <h3 className="mb-3 font-semibold text-gray-800">
            Odkaz na rozhovor
          </h3>
          <Field
            label="Titulek"
            value={c.aktivity.rozhovor.titulek}
            onChange={(v) => update((d) => (d.aktivity.rozhovor.titulek = v))}
          />
          <div className="grid gap-4 sm:grid-cols-3">
            <Field
              label="Osoba"
              value={c.aktivity.rozhovor.osoba}
              onChange={(v) => update((d) => (d.aktivity.rozhovor.osoba = v))}
            />
            <Field
              label="Zdroj"
              value={c.aktivity.rozhovor.zdroj}
              onChange={(v) => update((d) => (d.aktivity.rozhovor.zdroj = v))}
            />
            <Field
              label="Datum"
              value={c.aktivity.rozhovor.datum}
              onChange={(v) => update((d) => (d.aktivity.rozhovor.datum = v))}
            />
          </div>
          <Area
            label="Perex"
            value={c.aktivity.rozhovor.perex}
            onChange={(v) => update((d) => (d.aktivity.rozhovor.perex = v))}
          />
          <Field
            label="URL odkazu"
            value={c.aktivity.rozhovor.url}
            onChange={(v) => update((d) => (d.aktivity.rozhovor.url = v))}
          />
        </div>
      </SectionCard>

      {/* KONTAKT */}
      <SectionCard title="Kontakt">
        <Field
          label="E-mail"
          value={c.kontakt.email}
          onChange={(v) => update((d) => (d.kontakt.email = v))}
        />
        <Field
          label="Facebook (URL, nepovinné)"
          value={c.kontakt.facebook}
          onChange={(v) => update((d) => (d.kontakt.facebook = v))}
        />
        <Field
          label="Telefon (nepovinné)"
          value={c.kontakt.telefon}
          onChange={(v) => update((d) => (d.kontakt.telefon = v))}
        />
      </SectionCard>

      {/* SPODNÍ LIŠTA S ULOŽENÍM */}
      <div className="fixed inset-x-0 bottom-0 border-t border-surface-dark bg-white/95 p-3 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center gap-3 px-1">
          <button
            onClick={save}
            disabled={saving}
            className="rounded-lg bg-primary px-6 py-3 font-semibold text-white transition hover:bg-primary-dark disabled:opacity-50"
          >
            {saving ? "Ukládám…" : "💾 Uložit změny"}
          </button>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-primary hover:underline"
          >
            Otevřít web ↗
          </a>
          {message && (
            <span className="text-sm font-medium text-green-700">
              {message}
            </span>
          )}
          {error && (
            <span className="text-sm font-medium text-red-700">{error}</span>
          )}
        </div>
      </div>
    </main>
  );
}
