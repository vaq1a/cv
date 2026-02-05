/**
 * Minimal logger with levels. Uses LOG_LEVEL env (debug | info | warn | error).
 * Default: development → debug, production → warn.
 * Works in Node, Edge and browser.
 */

const LEVELS = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
} as const;

type Level = keyof typeof LEVELS;

const getMinLevel = (): Level => {
  const envLevel = process.env.LOG_LEVEL?.toLowerCase();
  if (envLevel && envLevel in LEVELS) return envLevel as Level;
  return process.env.NODE_ENV === "production" ? "warn" : "debug";
};

const minLevel: number = LEVELS[getMinLevel()];

function shouldLog(level: Level): boolean {
  return LEVELS[level] >= minLevel;
}

function formatMessage(
  level: Level,
  scope: string | undefined,
  message: string,
): string {
  const prefix = scope ? `[${level}] [${scope}]` : `[${level}]`;
  return `${prefix} ${message}`;
}

function log(
  level: Level,
  scope: string | undefined,
  message: string,
  meta?: unknown,
): void {
  if (!shouldLog(level)) return;

  const formatted = formatMessage(level, scope, message);
  const method =
    level === "error" ? "error" : level === "warn" ? "warn" : "log";

  if (meta !== undefined) {
    console[method](formatted, meta);
  } else {
    console[method](formatted);
  }
}

function createLogger(scope?: string) {
  return {
    debug: (message: string, meta?: unknown) =>
      log("debug", scope, message, meta),
    info: (message: string, meta?: unknown) =>
      log("info", scope, message, meta),
    warn: (message: string, meta?: unknown) =>
      log("warn", scope, message, meta),
    error: (message: string, meta?: unknown) =>
      log("error", scope, message, meta),
  };
}

export const logger = createLogger();
export { createLogger };
