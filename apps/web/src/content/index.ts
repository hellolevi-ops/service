import {
  advisors as seedAdvisors,
  articles as seedArticles,
  cases as seedCases,
  countries as seedCountries,
  events as seedEvents,
  playbooks as seedPlaybooks,
  tracks as seedTracks,
} from "./seed";
import type { Advisor, Article, CaseStudy, EventItem, Playbook, Track } from "./types";
import type { TrackSlug } from "@/lib/site";

const DIRECTUS = process.env.DIRECTUS_URL;
const TOKEN = process.env.DIRECTUS_TOKEN;

type DirectusArticle = {
  slug: string;
  category: string;
  title: string;
  summary: string;
  answer_block?: string;
  answerBlock?: string;
  body: string[] | string;
  faq?: { q: string; a: string }[];
  next_stops?: { href: string; title: string; reason: string }[];
  nextStops?: { href: string; title: string; reason: string }[];
  published_at?: string;
  publishedAt?: string;
  social_hooks?: string;
  status?: string;
};

async function directusGet<T>(collection: string): Promise<T[] | null> {
  if (!DIRECTUS || !TOKEN) return null;
  try {
    const res = await fetch(`${DIRECTUS}/items/${collection}?limit=-1`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
      next: { revalidate: 60, tags: [`cms:${collection}`] },
    });
    if (!res.ok) return null;
    const json = (await res.json()) as { data?: T[] };
    return json.data ?? null;
  } catch {
    return null;
  }
}

function mapArticle(a: DirectusArticle): Article {
  const body = Array.isArray(a.body) ? a.body : String(a.body || "").split("\n").filter(Boolean);
  return {
    slug: a.slug,
    category: a.category,
    title: a.title,
    summary: a.summary,
    answerBlock: a.answerBlock || a.answer_block || "",
    body,
    faq: a.faq || [],
    nextStops: a.nextStops || a.next_stops || [],
    publishedAt: a.publishedAt || a.published_at || "2026-09-01",
    socialHooks: a.social_hooks,
  };
}

export async function getTracks(): Promise<Track[]> {
  return seedTracks;
}

export async function getTrack(slug: string): Promise<Track | undefined> {
  const all = await getTracks();
  return all.find((t) => t.slug === slug);
}

export async function getCases(filters?: {
  track?: string;
  tier?: string;
}): Promise<CaseStudy[]> {
  let list = seedCases.filter((c) => c.authorized && c.status === "published");
  if (filters?.track) list = list.filter((c) => c.track === filters.track);
  if (filters?.tier)
    list = list.filter((c) => c.backgroundTier.includes(filters.tier!));
  return list;
}

export async function getCase(slug: string): Promise<CaseStudy | undefined> {
  const archived = seedCases.find((c) => c.slug === slug && c.status === "archived");
  if (archived) return undefined;
  return seedCases.find((c) => c.slug === slug && c.status === "published");
}

export async function getAdvisors(): Promise<Advisor[]> {
  return seedAdvisors;
}

export async function getAdvisor(slug: string): Promise<Advisor | undefined> {
  return seedAdvisors.find((a) => a.slug === slug);
}

export async function getArticles(): Promise<Article[]> {
  const remote = await directusGet<DirectusArticle>("articles");
  if (remote && remote.length) {
    const mapped = remote
      .filter((a) => !a.status || a.status === "published")
      .map(mapArticle);
    // Merge: Directus overrides seed by slug
    const bySlug = new Map(seedArticles.map((a) => [a.slug, a]));
    for (const a of mapped) bySlug.set(a.slug, a);
    return Array.from(bySlug.values());
  }
  return seedArticles;
}

export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
  const all = await getArticles();
  return all.find((a) => a.slug === slug);
}

export async function getEvents(): Promise<EventItem[]> {
  return seedEvents;
}

export async function getPlaybooks(): Promise<Playbook[]> {
  return seedPlaybooks;
}

export async function getPlaybook(slug: string): Promise<Playbook | undefined> {
  return seedPlaybooks.find((p) => p.slug === slug);
}

export function getCountries() {
  return seedCountries;
}

export function trackLabel(slug: TrackSlug | string) {
  const t = seedTracks.find((x) => x.slug === slug);
  return t?.name ?? slug;
}
