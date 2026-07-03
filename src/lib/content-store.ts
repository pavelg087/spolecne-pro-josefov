import { Redis } from "@upstash/redis";
import { defaultContent, type SiteContent } from "@/data/content";

// ---------------------------------------------------------------
//  Úložiště editovatelného obsahu webu.
//  Produkce: Upstash Redis. Lokálně bez Redisu: dočasná paměť.
// ---------------------------------------------------------------

const KEY = "content:site";

function makeRedis(): Redis | null {
  const url =
    process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token =
    process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token, automaticDeserialization: false });
}

const redis = makeRedis();

const mem = globalThis as unknown as { __contentValue?: string | null };

export const hasContentStore = Boolean(redis);

async function readRaw(): Promise<string | null> {
  try {
    if (redis) return await redis.get<string>(KEY);
    return mem.__contentValue ?? null;
  } catch {
    return null;
  }
}

// Vrací aktuální obsah: uložené úpravy překryté přes výchozí hodnoty.
export async function getSiteContent(): Promise<SiteContent> {
  const raw = await readRaw();
  if (!raw) return defaultContent;
  try {
    const stored = JSON.parse(raw) as Partial<SiteContent>;
    return { ...defaultContent, ...stored };
  } catch {
    return defaultContent;
  }
}

export async function saveSiteContent(content: SiteContent): Promise<void> {
  const raw = JSON.stringify(content);
  if (redis) {
    await redis.set(KEY, raw);
  } else {
    mem.__contentValue = raw;
  }
}
