import type { MetadataRoute } from "next";
import { getAllContentMeta } from "@/lib/mdx";

const SITE_URL = "https://field-guide-for-ai-dev.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const staticEntries: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified, priority: 1 },
    { url: `${SITE_URL}/learn/github`, lastModified, priority: 0.9 },
    { url: `${SITE_URL}/workflow`, lastModified, priority: 0.9 },
    { url: `${SITE_URL}/tools`, lastModified, priority: 0.7 },
    { url: `${SITE_URL}/cases`, lastModified, priority: 0.7 },
    { url: `${SITE_URL}/about`, lastModified, priority: 0.5 },
  ];

  const tools = await getAllContentMeta("tools");
  const toolEntries: MetadataRoute.Sitemap = tools.map((t) => ({
    url: `${SITE_URL}/tools/${t.slug}`,
    lastModified,
    priority: 0.6,
  }));

  const cases = await getAllContentMeta("cases");
  const caseEntries: MetadataRoute.Sitemap = cases.map((c) => ({
    url: `${SITE_URL}/cases/${c.slug}`,
    lastModified: new Date(c.date),
    priority: 0.6,
  }));

  return [...staticEntries, ...toolEntries, ...caseEntries];
}
