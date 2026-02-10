/**
 * Single JWT implementation using jose (works in Node and Edge).
 * Secret is passed in so this module does not depend on env and is safe for middleware.
 */

import type { JwtPayload } from "@/types/auth";
import * as jose from "jose";

const ALG = "HS256";
const EXPIRES_IN = "15m";

function getSecret(secret: string): Uint8Array {
  return new TextEncoder().encode(secret);
}

/**
 * Signs a JWT with the given userName. Use the same secret as for verifyToken.
 */
export async function signToken(
  userName: string,
  secret: string,
): Promise<string> {
  const key = getSecret(secret);
  return await new jose.SignJWT({ userName })
    .setProtectedHeader({ alg: ALG })
    .setIssuedAt()
    .setExpirationTime(EXPIRES_IN)
    .sign(key);
}

/**
 * Verifies a JWT and returns the payload or null. Safe to use in Edge (middleware) and Node (tRPC).
 */
export async function verifyToken(
  token: string | undefined,
  secret: string,
): Promise<JwtPayload | null> {
  if (!token || !secret) return null;

  try {
    const key = getSecret(secret);
    const { payload } = await jose.jwtVerify(token, key);
    const userName = payload.userName;
    if (typeof userName !== "string") return null;
    return { userName };
  } catch {
    return null;
  }
}
