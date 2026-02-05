import * as jose from "jose";

import { logger } from "@/lib/logger";

export const verifyToken = async (tokenValue: string | undefined) => {
  if (!tokenValue) return false;

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jose.jwtVerify(tokenValue, secret);
    return !!payload;
  } catch (error) {
    if (error instanceof jose.errors.JWSInvalid) {
      logger.error("Invalid JWT format", error);
    } else {
      logger.error("Token verification failed", error);
    }
    return false;
  }
};
