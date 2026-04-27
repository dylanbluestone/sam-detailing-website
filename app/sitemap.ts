import type { MetadataRoute } from "next";
import { PACKAGES } from "@/lib/services";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const url = (path: string) => `${SITE.url}${path}`;

  return [
    {
      url: url("/"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: url("/services"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...PACKAGES.map((pkg) => ({
      url: url(`/services/${pkg.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
    {
      url: url("/book"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.95,
    },
    {
      url: url("/gallery"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: url("/about"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: url("/faq"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: url("/contact"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: url("/mobile-detailing-port-coquitlam"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: url("/mobile-detailing-coquitlam"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: url("/privacy"),
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: url("/terms"),
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
