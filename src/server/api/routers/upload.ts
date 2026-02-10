import { z } from "zod";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { env } from "@/env";
import { logger } from "@/lib/logger";
import { r2Client } from "@/server/utils/r2";
import { resume } from "@/server/db/schema";
import { allowedImageFileTypeSchema } from "@/types/upload";

const log = logger;

export const uploadRouter = createTRPCRouter({
  getPresignedUrl: protectedProcedure
    .input(
      z.object({
        fileName: z.string(),
        fileType: allowedImageFileTypeSchema,
        fileContent: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!input.fileContent) {
        throw new Error("File content is empty");
      }

      const key = `${Date.now()}-${input.fileName}`;

      const base64Data = input.fileContent.split(",")[1];

      if (!base64Data) {
        throw new Error("Invalid base64 string format");
      }

      const command = new PutObjectCommand({
        Bucket: env.CLOUDFLARE_BUCKET_NAME,
        Key: key,
        ContentType: input.fileType,
        Body: Buffer.from(base64Data, "base64"),
      });

      try {
        await r2Client.send(command);

        const result = await ctx.db
          .insert(resume)
          .values({
            id: env.ENTITY_ID,
            personalPhoto: `${env.CLOUDFLARE_PUBLIC_URL}/${key}`,
          })
          .onConflictDoUpdate({
            target: resume.id,
            set: {
              personalPhoto: `${env.CLOUDFLARE_PUBLIC_URL}/${key}`,
            },
          })
          .returning();

        if (!result?.[0]) {
          throw new Error("Could not find file");
        }

        return {
          url: `${env.CLOUDFLARE_PUBLIC_URL}/${key}`,
          key,
        };
      } catch (error) {
        if (error instanceof Error) {
          log.error("Error uploading file", error.message);
        } else {
          log.error("Unknown error", error);
        }
        throw error;
      }
    }),
});
