import type { MetadataRoute } from "next";

const BASE_URL = "https://www.spolecneprojosefov.cz";

// Vygeneruje /sitemap.xml — seznam stránek pro vyhledávače.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
