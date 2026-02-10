import { z } from "zod";

export const ALLOWED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
] as const;

export const allowedImageFileTypeSchema = z.enum(ALLOWED_IMAGE_MIME_TYPES);

export type AllowedImageFileType = z.infer<typeof allowedImageFileTypeSchema>;
