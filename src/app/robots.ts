import type { MetadataRoute } from "next";

const BASE_URL = "https://www.spolecneprojosefov.cz";

// Vygeneruje /robots.txt — povolí vyhledávačům celý web kromě administrace.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api/"],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
