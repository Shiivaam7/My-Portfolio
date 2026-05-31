import type { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger";
import { env } from "../config/env";

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  const message =
    err instanceof Error ? err.message : "Internal server error";

  const isConfigError =
    message.includes("GMAIL_") || message.includes("environment variable");

  const status = isConfigError ? 503 : 500;

  logger.error("Unhandled error", {
    message,
    stack: err instanceof Error ? err.stack : undefined,
  });

  res.status(status).json({
    success: false,
    message: env.isProduction
      ? "Unable to send message. Please try again later."
      : message,
  });
}

export function notFoundHandler(_req: Request, res: Response): void {
  res.status(404).json({ success: false, message: "Route not found." });
}
