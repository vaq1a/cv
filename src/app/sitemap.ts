import { type MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://vadimsirisko.dev/ru",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
      alternates: {
        languages: {
          ru: "https://vadimsirisko.dev/ru",
          en: "https://vadimsirisko.dev/en",
        },
      },
    },
    {
      url: "https://vadimsirisko.dev/en",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
      alternates: {
        languages: {
          ru: "https://vadimsirisko.dev/ru",
          en: "https://vadimsirisko.dev/en",
        },
      },
    },
  ];
}
