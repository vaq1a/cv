import type { ResumeItems } from "@/types/resume";
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

export type SecretRecord = (typeof secret)["$inferSelect"];

export const resume = pgTable("resume", {
  id: serial("id").primaryKey(),
  personalPhoto: text("personalPhoto"),
  personalInfo: jsonb("personalInfo").$type<ResumeItems>(),
  contacts: jsonb("contacts").$type<ResumeItems>(),
  aboutMe: jsonb("aboutMe").$type<ResumeItems>(),
  skills: jsonb("skills").$type<ResumeItems>(),
  educations: jsonb("educations").$type<ResumeItems>(),
  languages: jsonb("languages").$type<ResumeItems>(),
  experience: jsonb("experience").$type<ResumeItems>(),
});
