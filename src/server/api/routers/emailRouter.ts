import { createTRPCRouter, publicProcedure } from "../trpc";
import { nanoid } from "nanoid";
import nodemailer from "nodemailer";
import { env } from "@/env";
import { logger } from "@/lib/logger";
import { secret } from "@/server/db/schema";

export const emailRouter = createTRPCRouter({
  sendPassword: publicProcedure.mutation(async ({ ctx }) => {
    const secretKey = nanoid(30);

    const secretData: Array<{ id: number; secret: string }> = await ctx.db
      .insert(secret)
      .values({ id: env.ENTITY_ID, secret: secretKey })
      .onConflictDoUpdate({
        target: secret.id,
        set: { secret: secretKey },
      })
      .returning();

    if (!secretData?.[0]?.secret) {
      throw new Error("Failed to send password");
    }

    const transporter = nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: parseInt(env.SMTP_PORT),
      secure: env.SMTP_SECURE === "true",
      auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASS,
      },
    });

    try {
      await transporter.sendMail({
        from: '"Your App" &lt;noreply@example.com&gt;',
        to: env.ADMIN_USER_MAIL,
        subject: "Your Password",
        text: `Your password is: ${secretKey}`,
        html: `&lt;b&gt;Your password is: ${secretKey}&lt;/b&gt;`,
      });

      return { success: true, message: "Password sent successfully" };
    } catch (error) {
      logger.error("Failed to send email", error);
      throw new Error("Failed to send password");
    }
  }),
});
