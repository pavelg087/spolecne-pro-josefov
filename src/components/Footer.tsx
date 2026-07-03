import {
  sdruzeni as defaultSdruzeni,
  kontakt as defaultKontakt,
} from "@/data/content";

type FooterProps = {
  nazev?: string;
  obec?: string;
  email?: string;
};

export default function Footer({ nazev, obec, email }: FooterProps) {
  const jmeno = nazev ?? defaultSdruzeni.nazev;
  const mesto = obec ?? defaultSdruzeni.obec;
  const mail = email ?? defaultKontakt.email;

  return (
    <footer className="bg-primary-dark text-white">
      <div className="mx-auto max-w-6xl px-4 py-8 text-center text-sm">
        <p className="font-semibold">{jmeno}</p>
        <p className="text-white/70">{mesto}</p>
        {mail && (
          <p className="mt-2">
            <a
              href={`mailto:${mail}`}
              className="underline hover:text-accent-light"
            >
              {mail}
            </a>
          </p>
        )}
        <p className="mt-4 text-xs text-white/50">
          © {new Date().getFullYear()} {jmeno}. Volební web.
        </p>
      </div>
    </footer>
  );
}
