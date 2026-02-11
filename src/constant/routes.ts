import type { Language } from "@/types/intl";

export const ADMIN_PATH = "/admin";
export const AUTH_PATH = "/auth";

export const LOCALES: Language[] = ["en", "ru"];
export const DEFAULT_LOCALE: Language = "en";

export const ROBOTS_DISALLOW = [
  `${ADMIN_PATH}/`,
  `/ru${ADMIN_PATH}/`,
  `/en${ADMIN_PATH}/`,
  `${AUTH_PATH}/`,
  `/ru${AUTH_PATH}/`,
  `/en${AUTH_PATH}/`,
] as const;

export const ROBOTS_ALLOW = ["/", "/ru/", "/en/"] as const;
