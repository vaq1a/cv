import type { MetadataRoute } from "next";
import { ROBOTS_ALLOW, ROBOTS_DISALLOW } from "@/constant/routes";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: [...ROBOTS_ALLOW],
      disallow: [...ROBOTS_DISALLOW],
    },
    sitemap: "https://vadimsirisko.dev/sitemap.xml",
  };
}
