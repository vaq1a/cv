import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/ru/", "/en/"],
      disallow: [
        "/admin/",
        "/ru/admin/",
        "/en/admin/",
        "/auth/",
        "/ru/auth/",
        "/en/auth/",
      ],
    },
    sitemap: [
      "https://vadimsirisko.dev/sitemap-ru.xml",
      "https://vadimsirisko.dev/sitemap-en.xml",
    ],
  };
}
