import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { logger } from "../utils/logger";

/**
 * Resolve server/.env from compiled output (dist/config/) or source (src/config/).
 */
export const ENV_FILE_PATH = path.resolve(__dirname, "..", "..", ".env");

const dotenvResult = dotenv.config({ path: ENV_FILE_PATH });

function requireEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

const isProduction = process.env.NODE_ENV === "production";

export const env = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  isProduction,
  port: Number(process.env.PORT ?? 5000),
  frontendUrls: (process.env.FRONTEND_URL ?? "http://localhost:3000")
    .split(",")
    .map((u) => u.trim())
    .filter(Boolean),
  resendApiKey: isProduction
    ? requireEnv("RESEND_API_KEY")
    : (process.env.RESEND_API_KEY?.trim() ?? ""),
  /** Must be a verified sender in Resend (use onboarding@resend.dev for testing). */
  resendFromEmail:
    process.env.RESEND_FROM_EMAIL?.trim() ?? "onboarding@resend.dev",
  contactToEmail:
    process.env.CONTACT_TO_EMAIL?.trim() ?? "shivamraj0k0r@gmail.com",
  mailFromName:
    process.env.MAIL_FROM_NAME?.trim() ?? "Shivam Kumar Portfolio",
};

export function logEnvDiagnostics(): void {
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
          (k) => !k.toLowerCase().includes("key") && !k.toLowerCase().includes("password")
        )
      : [],
    processCwd: process.cwd(),
  });

  logger.info("Resend configuration (secrets hidden)", {
    RESEND_API_KEY_exists: Boolean(env.resendApiKey),
    RESEND_API_KEY_length: env.resendApiKey ? env.resendApiKey.length : 0,
    RESEND_FROM_EMAIL: env.resendFromEmail,
    CONTACT_TO_EMAIL: env.contactToEmail,
    MAIL_FROM_NAME: env.mailFromName,
    provider: "resend-api",
  });
}

export function assertEmailConfig(): void {
  if (!env.resendApiKey) {
    throw new Error("RESEND_API_KEY must be set in server/.env or Render environment");
  }
  if (!env.resendFromEmail.includes("@")) {
    throw new Error("RESEND_FROM_EMAIL must be a valid email address");
  }
}
