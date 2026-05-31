import type { Request, Response, NextFunction } from "express";
import { sendContactEmail } from "../services/email.service";
import { sanitizeEmail, sanitizeText } from "../utils/sanitize";
import { validateContactBody } from "../utils/validators";
import { logger } from "../utils/logger";

export async function postContact(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const validation = validateContactBody(req.body);

    if (!validation.valid || !validation.data) {
      res.status(400).json({
        success: false,
        message: "Validation failed.",
        errors: validation.errors,
      });
      return;
    }

    const payload = {
      name: sanitizeText(validation.data.name, 100),
      email: sanitizeEmail(validation.data.email),
      subject: sanitizeText(validation.data.subject, 150),
      message: sanitizeText(validation.data.message, 5000),
    };

    if (!payload.email) {
      res.status(400).json({
        success: false,
        message: "Validation failed.",
        errors: { email: "Please enter a valid email address." },
      });
      return;
    }

    await sendContactEmail(payload);

    res.status(200).json({
      success: true,
      message: "Your message has been sent successfully.",
    });
  } catch (error) {
    logger.error("Contact form error", {
      error: error instanceof Error ? error.message : error,
      stack: error instanceof Error ? error.stack : undefined,
    });
    next(error);
  }
}
