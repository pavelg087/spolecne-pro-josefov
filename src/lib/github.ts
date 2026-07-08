// ---------------------------------------------------------------
//  Zápis souborů do GitHub repozitáře přes REST API.
//  Používá se pro ukládání obsahu z administrace (commit -> redeploy).
// ---------------------------------------------------------------

const REPO = process.env.GITHUB_REPO || "pavelg087/spolecne-pro-josefov";
const BRANCH = process.env.GITHUB_BRANCH || "main";
const TOKEN = process.env.GITHUB_TOKEN;

export function hasGithub(): boolean {
  return Boolean(TOKEN);
}

function ghHeaders(): HeadersInit {
  return {
    Authorization: `Bearer ${TOKEN}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "spolecne-pro-josefov-admin",
    "Content-Type": "application/json",
  };
}

async function getExistingSha(filePath: string): Promise<string | null> {
  const res = await fetch(
    `https://api.github.com/repos/${REPO}/contents/${filePath}?ref=${BRANCH}`,
    { headers: ghHeaders(), cache: "no-store" }
  );
  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error(`GitHub GET ${filePath}: ${res.status}`);
  }
  const data = (await res.json()) as { sha?: string };
  return data.sha ?? null;
}

// Vytvoří nebo přepíše soubor v repozitáři. contentBase64 = obsah v base64.
export async function commitFile(
  filePath: string,
  contentBase64: string,
  message: string
): Promise<void> {
  const sha = await getExistingSha(filePath);
  const res = await fetch(
    `https://api.github.com/repos/${REPO}/contents/${filePath}`,
    {
      method: "PUT",
      headers: ghHeaders(),
      body: JSON.stringify({
        message,
        content: contentBase64,
        branch: BRANCH,
        ...(sha ? { sha } : {}),
      }),
    }
  );
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitHub PUT ${filePath}: ${res.status} ${text}`);
  }
}
