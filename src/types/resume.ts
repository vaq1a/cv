import { z } from "zod";

export type ResumeItem = { lang: "ru" | "en"; content: string };
export type ResumeItems = ResumeItem[];

/** Полная запись резюме (ответ API / строка БД) */
export type ResumeData = {
  id: number;
  personalPhoto: string | null;
  personalInfo: ResumeItems | null;
  contacts: ResumeItems | null;
  aboutMe: ResumeItems | null;
  skills: ResumeItems | null;
  educations: ResumeItems | null;
  languages: ResumeItems | null;
  experience: ResumeItems | null;
};

export type ResumeSectionKey =
  | "personalInfo"
  | "aboutMe"
  | "contacts"
  | "skills"
  | "educations"
  | "languages"
  | "experience";

export const resumeSectionItemSchema = z.object({
  lang: z.enum(["ru", "en"]),
  content: z.string(),
});

export const resumeSectionSchema = z.array(resumeSectionItemSchema);
