import jwt from "jsonwebtoken";
import { env } from "@/env";

const JWT_SECRET = env.JWT_SECRET;

export const generateToken = (userName: string): string => {
  return jwt.sign({ userName }, JWT_SECRET, { expiresIn: "15min" });
};

export const verifyToken = (token: string): { userName: string } | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as { userName: string };
  } catch (error) {
    return null;
  }
};
