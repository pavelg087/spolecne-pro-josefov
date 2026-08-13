import type { MetadataRoute } from "next";
import { getSiteContent } from "@/lib/content-store";
import { slugFromName } from "@/lib/slug";

const BASE_URL = "https://www.spolecneprojosefov.cz";

// Vygeneruje /sitemap.xml — úvodní stránka + stránky jednotlivých kandidátů.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { kandidati } = await getSiteContent();

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...kandidati.map((k) => ({
      url: `${BASE_URL}/kandidat/${slugFromName(k.jmeno)}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
