import { jsonb, pgTable, serial, text } from "drizzle-orm/pg-core";

export const user = pgTable("users", {
  id: serial("id").primaryKey(),
  login: text("login").notNull(),
  token: text("token").notNull(),
});

export const secret = pgTable("secret", {
  id: serial("id").primaryKey(),
  secret: text("secret").notNull(),
});

export const resume = pgTable("resume", {
  id: serial("id").primaryKey(),
  personalPhoto: text("personalPhoto"),
  personalInfo: jsonb("personalInfo").$type<
    {
      lang: "ru" | "en";
      content: string;
    }[]
  >(),
  contacts: jsonb("contacts").$type<
    {
      lang: "ru" | "en";
      content: string;
    }[]
  >(),
  aboutMe: jsonb("aboutMe").$type<
    {
      lang: "ru" | "en";
      content: string;
    }[]
  >(),
  skills: jsonb("skills").$type<
    {
      lang: "ru" | "en";
      content: string;
    }[]
  >(),
  educations: jsonb("educations").$type<
    {
      lang: "ru" | "en";
      content: string;
    }[]
  >(),
  languages: jsonb("languages").$type<
    {
      lang: "ru" | "en";
      content: string;
    }[]
  >(),
  experience: jsonb("experience").$type<
    {
      lang: "ru" | "en";
      content: string;
    }[]
  >(),
});
