import { z } from "zod";
import { ALLOWED_IMAGE_MIME_TYPES } from "@/constant/upload";

export { ALLOWED_IMAGE_MIME_TYPES } from "@/constant/upload";

export const allowedImageFileTypeSchema = z.enum(ALLOWED_IMAGE_MIME_TYPES);

export type AllowedImageFileType = z.infer<typeof allowedImageFileTypeSchema>;

export function isAllowedImageFileType(
  value: string,
): value is AllowedImageFileType {
  return (ALLOWED_IMAGE_MIME_TYPES as readonly string[]).includes(value);
}
