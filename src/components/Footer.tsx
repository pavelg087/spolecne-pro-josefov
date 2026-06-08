import { sdruzeni, kontakt } from "@/data/content";

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white">
      <div className="mx-auto max-w-6xl px-4 py-8 text-center text-sm">
        <p className="font-semibold">{sdruzeni.nazev}</p>
        <p className="text-white/70">{sdruzeni.obec}</p>
        {kontakt.email && (
          <p className="mt-2">
            <a
              href={`mailto:${kontakt.email}`}
              className="underline hover:text-accent-light"
            >
              {kontakt.email}
            </a>
          </p>
        )}
        <p className="mt-4 text-xs text-white/50">
          © {new Date().getFullYear()} {sdruzeni.nazev}. Volební web.
        </p>
      </div>
    </footer>
  );
}
