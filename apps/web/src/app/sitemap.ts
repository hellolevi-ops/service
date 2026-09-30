import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { getArticles, getCases, getAdvisors, getPlaybooks, getEvents } from "@/content";
import { getCountries } from "@/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = SITE.siteUrl.replace(/\/$/, "");
  const staticRoutes = [
    "",
    "/services",
    "/services/premium",
    "/services/full-cycle",
    "/services/compare",
    "/tracks",
    "/tracks/us-ug",
    "/tracks/uk-pg",
    "/tracks/hk-sg",
    "/tracks/k12",
    "/tracks/arts",
    "/cases",
    "/advisors",
    "/process-fees",
    "/lab",
    "/lab/tools/assessment",
    "/lab/tools/timeline",
    "/lab/when-to-ask",
    "/guides",
    "/guides/faq",
    "/events",
    "/universities",
    "/community",
    "/lab/tools/cost",
    "/lab/tools/checklist",
    "/about",
    "/about/trust",
    "/about/contact",
    "/book",
    "/privacy",
    "/terms",
    "/disclaimer",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }));

  const [articles, cases, advisors, playbooks, events] = await Promise.all([
    getArticles(),
    getCases(),
    getAdvisors(),
    getPlaybooks(),
    getEvents(),
  ]);

  return [
    ...staticRoutes,
    ...getCountries().map((c) => ({ url: `${base}/countries/${c.slug}`, lastModified: new Date() })),
    ...articles.map((a) => ({
      url: `${base}/guides/${encodeURIComponent(a.category)}/${a.slug}`,
      lastModified: new Date(a.publishedAt),
    })),
    ...cases.map((c) => ({ url: `${base}/cases/${c.slug}`, lastModified: new Date() })),
    ...advisors.map((a) => ({ url: `${base}/advisors/${a.slug}`, lastModified: new Date() })),
    ...playbooks.map((p) => ({
      url: `${base}/lab/playbooks/${p.slug}`,
      lastModified: new Date(),
    })),
    ...events.map((e) => ({ url: `${base}/events/${e.slug}`, lastModified: new Date() })),
  ];
}
