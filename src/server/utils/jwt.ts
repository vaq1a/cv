import { env } from "@/env";
import * as jwt from "@/lib/jwt";

/**
 * Generates a JWT for the given user (server-only, uses env.JWT_SECRET).
 */
export async function generateToken(userName: string): Promise<string> {
  return jwt.signToken(userName, env.JWT_SECRET);
}

/**
 * Verifies a JWT and returns the payload or null (server-only, uses env.JWT_SECRET).
 */
export async function verifyToken(
  token: string | undefined,
): Promise<jwt.JwtPayload | null> {
  return jwt.verifyToken(token, env.JWT_SECRET);
}
