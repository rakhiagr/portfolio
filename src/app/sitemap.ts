import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://rakhi-agrawal.vercel.app";
  return [
    { url: base, changeFrequency: "monthly", priority: 1 },
  ];
}
