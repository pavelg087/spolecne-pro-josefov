"use client";

import { useEffect, useState } from "react";
import type { Kandidat } from "@/data/content";

function CardInner({ k }: { k: Kandidat }) {
  return (
    <>
      <div className="flex aspect-square items-center justify-center overflow-hidden bg-surface-dark">
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
          <p className="mt-0.5 text-xs text-gray-400">nar. {k.datumNarozeni}</p>
        )}
        {k.popis && (
          <p className="mt-3 text-sm leading-relaxed text-gray-700">
            {k.popis}
          </p>
        )}
        {k.medailonek && (
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
            Představení
            <span aria-hidden>→</span>
          </span>
        )}
      </div>
    </>
  );
}

function Modal({ k, onClose }: { k: Kandidat; onClose: () => void }) {
  const m = k.medailonek!;
  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 p-4 sm:items-center"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Představení – ${k.jmeno}`}
    >
      <div
        className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Zavřít"
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-xl text-gray-600 shadow hover:bg-white"
        >
          ✕
        </button>

        {m.foto && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={m.foto}
            alt={m.fotoPopis || k.jmeno}
            className="max-h-80 w-full object-cover"
          />
        )}

        <div className="p-6 sm:p-8">
          <h3 className="text-2xl font-bold text-gray-900">{k.jmeno}</h3>
          {k.povolani && (
            <p className="text-sm font-medium text-secondary">{k.povolani}</p>
          )}
          {k.datumNarozeni && (
            <p className="text-xs text-gray-400">nar. {k.datumNarozeni}</p>
          )}
          {m.fotoPopis && (
            <p className="mt-2 text-xs italic text-gray-400">{m.fotoPopis}</p>
          )}

          <dl className="mt-6 space-y-4">
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
}

export default function KandidatiGrid({
  kandidati,
}: {
  kandidati: Kandidat[];
}) {
  const [open, setOpen] = useState<Kandidat | null>(null);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(null);
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {kandidati.map((k) =>
          k.medailonek ? (
            <button
              key={k.poradi}
              onClick={() => setOpen(k)}
              className="flex flex-col overflow-hidden rounded-xl bg-white text-left shadow-sm ring-1 ring-transparent transition hover:shadow-md hover:ring-primary/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <CardInner k={k} />
            </button>
          ) : (
            <div
              key={k.poradi}
              className="flex flex-col overflow-hidden rounded-xl bg-white shadow-sm"
            >
              <CardInner k={k} />
            </div>
          )
        )}
      </div>

      {open && <Modal k={open} onClose={() => setOpen(null)} />}
    </>
  );
}
