import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { logger } from "../utils/logger";

/**
 * Resolve server/.env from compiled output (dist/config/) or source (src/config/).
 * dist/config → ../../.env = server/.env
 * src/config  → ../../.env = server/.env
 */
export const ENV_FILE_PATH = path.resolve(__dirname, "..", "..", ".env");

const dotenvResult = dotenv.config({ path: ENV_FILE_PATH });

function sanitizeAppPassword(raw: string | undefined): string {
  if (!raw) return "";
  return raw
    .trim()
    .replace(/^["']|["']$/g, "")
    .replace(/\s+/g, "");
}

function requireEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

const rawGmailPassword = process.env.GMAIL_APP_PASSWORD;
const isProduction = process.env.NODE_ENV === "production";

export const env = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  isProduction,
  port: Number(process.env.PORT ?? 5000),
  frontendUrls: (process.env.FRONTEND_URL ?? "http://localhost:3000")
    .split(",")
    .map((u) => u.trim())
    .filter(Boolean),
  gmailUser: isProduction
    ? requireEnv("GMAIL_USER")
    : (process.env.GMAIL_USER?.trim() ?? ""),
  gmailAppPassword: sanitizeAppPassword(
    isProduction ? requireEnv("GMAIL_APP_PASSWORD") : rawGmailPassword
  ),
  contactToEmail:
    process.env.CONTACT_TO_EMAIL?.trim() ?? "shivamraj0k0r@gmail.com",
  mailFromName:
    process.env.MAIL_FROM_NAME?.trim() ?? "Shivam Kumar Portfolio",
};

/** Safe diagnostics — never logs secret values */
export function logEnvDiagnostics(): void {
  const rawPass = rawGmailPassword ?? "";

  logger.info("dotenv load status", {
    envFilePath: ENV_FILE_PATH,
    envFileExists: fs.existsSync(ENV_FILE_PATH),
    dotenvLoaded: !dotenvResult.error,
    dotenvError: dotenvResult.error?.message ?? null,
    parsedKeyCount: dotenvResult.parsed
      ? Object.keys(dotenvResult.parsed).length
      : 0,
    parsedKeys: dotenvResult.parsed
      ? Object.keys(dotenvResult.parsed).filter(
          (k) => !k.toLowerCase().includes("password")
        )
      : [],
    processCwd: process.cwd(),
  });

  logger.info("Gmail credential presence (values hidden)", {
    GMAIL_USER_exists: Boolean(env.gmailUser),
    GMAIL_USER_length: env.gmailUser.length,
    GMAIL_USER_looksLikeEmail: /^[^\s@]+@gmail\.com$/i.test(env.gmailUser),
    GMAIL_APP_PASSWORD_exists: Boolean(rawPass.trim()),
    GMAIL_APP_PASSWORD_rawLength: rawPass.length,
    GMAIL_APP_PASSWORD_sanitizedLength: env.gmailAppPassword.length,
    GMAIL_APP_PASSWORD_hadWhitespace: /\s/.test(rawPass),
    GMAIL_APP_PASSWORD_hadNewlines: /[\r\n]/.test(rawPass),
    GMAIL_APP_PASSWORD_hadQuotes:
      /^["']/.test(rawPass.trim()) || /["']$/.test(rawPass.trim()),
    GMAIL_APP_PASSWORD_expectedLength: 16,
    GMAIL_APP_PASSWORD_lengthValid: env.gmailAppPassword.length === 16,
  });
}

export function assertEmailConfig(): void {
  if (!env.gmailUser || !env.gmailAppPassword) {
    throw new Error(
      "GMAIL_USER and GMAIL_APP_PASSWORD must be set in server/.env"
    );
  }
  if (env.gmailAppPassword.length !== 16) {
    throw new Error(
      `GMAIL_APP_PASSWORD must be exactly 16 characters after removing spaces (got ${env.gmailAppPassword.length}). Use a Google App Password, not your regular Gmail password.`
    );
  }
  if (!env.gmailUser.toLowerCase().endsWith("@gmail.com")) {
    logger.warn("GMAIL_USER is not a @gmail.com address — App Passwords require a Google/Gmail account");
  }
}
