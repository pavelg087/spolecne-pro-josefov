import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
});

const BASE_URL = "https://www.spolecneprojosefov.cz";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Společně pro Josefov – komunální volby 2026",
  description:
    "Sdružení nezávislých kandidátů pro komunální volby v obci Josefov (okres Hodonín). Představujeme náš tým a program.",
  keywords: [
    "Společně pro Josefov",
    "Josefov",
    "komunální volby 2026",
    "obec Josefov",
    "okres Hodonín",
    "nezávislí kandidáti",
    "zastupitelstvo",
  ],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    url: BASE_URL,
    siteName: "Společně pro Josefov",
    title: "Společně pro Josefov – komunální volby 2026",
    description:
      "Sdružení nezávislých kandidátů pro komunální volby v obci Josefov. Náš tým a program.",
    images: [{ url: "/logo.png", width: 598, height: 520 }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs">
      <body className={`${geistSans.variable} antialiased`}>
        {children}
        {/* Měření návštěvnosti (Vercel Web Analytics) — bez cookies */}
        <Analytics />
      </body>
    </html>
  );
}
