import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "Společně pro Josefov - Komunální volby 2026",
  description:
    "Sdružení nezávislých kandidátů pro komunální volby v obci Josefov (okres Hodonín). Představujeme náš tým a program.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs">
      <body className={`${geistSans.variable} antialiased`}>{children}</body>
    </html>
  );
}
