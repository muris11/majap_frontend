import type { MetadataRoute } from "next";
import { SITE } from "@/lib/seo";

const BASE_URL = SITE.url;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/tentang`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/kegiatan`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/galeri`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/kontak`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/faq`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/saran`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE_URL}/terms-of-service`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/privacy-policy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];

  const EXTERNAL_API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/v1";

  let activityPages: MetadataRoute.Sitemap = [];
  try {
    const res = await fetch(`${EXTERNAL_API_URL}/activities?per_page=100`, {
      cache: "no-store",
      headers: { Accept: "application/json" },
    });
    if (res.ok) {
      const raw = await res.json();
      const json = raw.result || raw;
      const activities = json.success ? json.data : [];
      activityPages = (activities as { slug: string; updated_at?: string }[]).map((a) => ({
        url: `${BASE_URL}/kegiatan/${a.slug}`,
        lastModified: a.updated_at ? new Date(a.updated_at) : new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }));
    }
  } catch {}

  let albumPages: MetadataRoute.Sitemap = [];
  try {
    const res = await fetch(`${EXTERNAL_API_URL}/albums?per_page=100`, {
      cache: "no-store",
      headers: { Accept: "application/json" },
    });
    if (res.ok) {
      const raw = await res.json();
      const json = raw.result || raw;
      const albums = json.success ? json.data : [];
      albumPages = (albums as { slug: string; updated_at?: string }[]).map((a) => ({
        url: `${BASE_URL}/galeri/${a.slug}`,
        lastModified: a.updated_at ? new Date(a.updated_at) : new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      }));
    }
  } catch {}

  return [...staticPages, ...activityPages, ...albumPages];
}
