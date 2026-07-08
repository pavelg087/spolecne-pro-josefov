import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Zajistí, že soubor s obsahem je dostupný i pro serverless funkce.
  outputFileTracingIncludes: {
    "/": ["./content/**"],
    "/api/content": ["./content/**"],
  },
};

export default nextConfig;
