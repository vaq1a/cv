import { resume } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { env } from "@/env";

export const resumeRouter = createTRPCRouter({
  setPersonalInfo: protectedProcedure
    .input(
      z.object({
        personalInfo: z.array(
          z.object({
            lang: z.enum(["ru", "en"]),
            content: z.string(),
          }),
        ),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { personalInfo } = input;

      const result = await ctx.db
        .insert(resume)
        .values({
          id: env.ENTITY_ID,
          personalInfo,
        })
        .onConflictDoUpdate({
          target: resume.id,
          set: {
            personalInfo,
          },
        })
        .returning();

      return result[0];
    }),
  setAboutMe: protectedProcedure
    .input(
      z.object({
        aboutMe: z.array(
          z.object({
            lang: z.enum(["ru", "en"]),
            content: z.string(),
          }),
        ),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { aboutMe } = input;

      const result = await ctx.db
        .insert(resume)
        .values({
          id: env.ENTITY_ID,
          aboutMe,
        })
        .onConflictDoUpdate({
          target: resume.id,
          set: {
            aboutMe,
          },
        })
        .returning();

      return result[0];
    }),
  setContacts: protectedProcedure
    .input(
      z.object({
        contacts: z.array(
          z.object({
            lang: z.enum(["ru", "en"]),
            content: z.string(),
          }),
        ),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { contacts } = input;

      const result = await ctx.db
        .insert(resume)
        .values({
          id: env.ENTITY_ID,
          contacts,
        })
        .onConflictDoUpdate({
          target: resume.id,
          set: {
            contacts,
          },
        })
        .returning();

      return result[0];
    }),
  setSkills: protectedProcedure
    .input(
      z.object({
        skills: z.array(
          z.object({
            lang: z.enum(["ru", "en"]),
            content: z.string(),
          }),
        ),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { skills } = input;

      const result = await ctx.db
        .insert(resume)
        .values({
          id: env.ENTITY_ID,
          skills,
        })
        .onConflictDoUpdate({
          target: resume.id,
          set: {
            skills,
          },
        })
        .returning();

      return result[0];
    }),
  setEducations: protectedProcedure
    .input(
      z.object({
        educations: z.array(
          z.object({
            lang: z.enum(["ru", "en"]),
            content: z.string(),
          }),
        ),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { educations } = input;

      const result = await ctx.db
        .insert(resume)
        .values({
          id: env.ENTITY_ID,
          educations,
        })
        .onConflictDoUpdate({
          target: resume.id,
          set: {
            educations,
          },
        })
        .returning();

      return result[0];
    }),
  setLanguages: protectedProcedure
    .input(
      z.object({
        languages: z.array(
          z.object({
            lang: z.enum(["ru", "en"]),
            content: z.string(),
          }),
        ),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { languages } = input;

      const result = await ctx.db
        .insert(resume)
        .values({
          id: env.ENTITY_ID,
          languages,
        })
        .onConflictDoUpdate({
          target: resume.id,
          set: {
            languages,
          },
        })
        .returning();

      return result[0];
    }),
  setExperience: protectedProcedure
    .input(
      z.object({
        experience: z.array(
          z.object({
            lang: z.enum(["ru", "en"]),
            content: z.string(),
          }),
        ),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { experience } = input;

      const result = await ctx.db
        .insert(resume)
        .values({
          id: env.ENTITY_ID,
          experience,
        })
        .onConflictDoUpdate({
          target: resume.id,
          set: {
            experience,
          },
        })
        .returning();

      return result[0];
    }),
  getAllData: publicProcedure.query(async ({ ctx }) => {
    const data = await ctx.db
      .select()
      .from(resume)
      .where(eq(resume.id, env.ENTITY_ID));

    return data;
  }),
});
