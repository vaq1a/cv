import type { db } from "@/server/db";
import { resume } from "@/server/db/schema";
import {
  resumeSectionSchema,
  type ResumeItems,
  type ResumeSectionKey,
} from "@/types/resume";
import { eq } from "drizzle-orm";
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { env } from "@/env";

async function upsertResumeSection(
  database: typeof db,
  field: ResumeSectionKey,
  value: ResumeItems,
) {
  const result = await database
    .insert(resume)
    .values({
      id: env.ENTITY_ID,
      [field]: value,
    })
    .onConflictDoUpdate({
      target: resume.id,
      set: { [field]: value },
    })
    .returning();

  return result[0];
}

function createSetSectionProcedure(field: ResumeSectionKey) {
  return protectedProcedure
    .input(z.object({ [field]: resumeSectionSchema }))
    .mutation(async ({ ctx, input }) => {
      const value = input[field];
      if (value === undefined) throw new Error(`Missing field: ${field}`);
      return upsertResumeSection(ctx.db, field, value);
    });
}

export const resumeRouter = createTRPCRouter({
  setPersonalInfo: createSetSectionProcedure("personalInfo"),
  setAboutMe: createSetSectionProcedure("aboutMe"),
  setContacts: createSetSectionProcedure("contacts"),
  setSkills: createSetSectionProcedure("skills"),
  setEducations: createSetSectionProcedure("educations"),
  setLanguages: createSetSectionProcedure("languages"),
  setExperience: createSetSectionProcedure("experience"),
  getAllData: publicProcedure.query(async ({ ctx }) => {
    const data = await ctx.db
      .select()
      .from(resume)
      .where(eq(resume.id, env.ENTITY_ID));

    return data;
  }),
});
