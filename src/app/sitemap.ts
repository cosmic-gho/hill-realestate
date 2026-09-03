import type { MetadataRoute } from "next";
import { listProperties, type Property } from "@/actions/properties";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

  let properties: Property[] = [];
  try {
    properties = await listProperties();
  } catch (err) {
    console.error("Failed to load properties for sitemap:", err);
  }

  const propertyUrls: MetadataRoute.Sitemap = properties.map((p) => ({
    url: `${siteUrl}/property/${p.id}`,
    lastModified: p.created_at ? new Date(p.created_at) : new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${siteUrl}/search`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  return [...staticUrls, ...propertyUrls];
}
