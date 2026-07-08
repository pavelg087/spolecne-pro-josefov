"use client";

import { useState } from "react";
import { sdruzeni } from "@/data/content";

const odkazy = [
  { href: "#o-nas", label: "O nás" },
  { href: "#kandidati", label: "Kandidáti" },
  { href: "#program", label: "Program" },
  { href: "#aktivity", label: "Aktivity" },
  { href: "#kontakt", label: "Kontakt" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-primary text-white shadow-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <a href="#" className="flex items-center gap-2.5 font-bold leading-tight">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#f3f7fa] shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/emblem.png"
              alt=""
              className="h-full w-full object-cover"
            />
          </span>
          <span>
            <span className="block text-lg">{sdruzeni.nazev}</span>
            <span className="block text-xs font-normal text-white/80">
              komunální volby 2026
            </span>
          </span>
        </a>

        <nav className="hidden gap-6 md:flex">
          {odkazy.map((o) => (
            <a
              key={o.href}
              href={o.href}
              className="text-sm font-medium text-white/90 transition hover:text-accent-light"
            >
              {o.label}
            </a>
          ))}
        </nav>

        <button
          className="md:hidden"
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-white/20 px-4 pb-3 md:hidden">
          {odkazy.map((o) => (
            <a
              key={o.href}
              href={o.href}
              onClick={() => setOpen(false)}
              className="rounded px-2 py-2 text-sm font-medium text-white/90 hover:bg-white/10"
            >
              {o.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
