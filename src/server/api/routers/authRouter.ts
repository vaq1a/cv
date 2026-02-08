import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { generateToken } from "@/server/utils/jwt";
import { secret, user } from "@/server/db/schema";
import { and, eq } from "drizzle-orm";
import { env } from "@/env";

export const authRouter = createTRPCRouter({
  login: publicProcedure
    .input(z.object({ login: z.string(), password: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { login, password } = input;

      if (login !== env.ADMIN_USER_LOGIN) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid credentials",
        });
      }

      const currentSecret = await ctx.db
        .select()
        .from(secret)
        .where(and(eq(secret.id, env.ENTITY_ID), eq(secret.secret, password)));

      if (!currentSecret?.length) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid credentials",
        });
      }

      const token = await generateToken(login);

      const currentUser = await ctx.db
        .insert(user)
        .values({ id: env.ENTITY_ID, login, token })
        .onConflictDoUpdate({
          target: user.id,
          set: { login, token },
        })
        .returning({ token: user.token });

      const tokenFromDB: string | undefined = currentUser?.[0]?.token;

      if (!tokenFromDB) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "No token in the database",
        });
      }

      ctx.headers.set(
        "Set-Cookie",
        `token=${tokenFromDB}; HttpOnly; Secure; SameSite=Strict; Max-Age=180; Path=/`,
      );

      return { token: tokenFromDB };
    }),
});
