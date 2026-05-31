import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";
import { assertEmailConfig, env } from "../config/env";
import { logger } from "../utils/logger";
import type { ContactPayload } from "../utils/validators";

let transporter: Transporter | null = null;

/** Gmail SMTP — explicit host is more reliable than service: "gmail" alone */
export function createMailTransporter(): Transporter {
  assertEmailConfig();

  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: env.gmailUser,
      pass: env.gmailAppPassword,
    },
  });
}

export function logTransporterConfig(): void {
  logger.info("Nodemailer transporter configuration (secrets excluded)", {
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    service: "gmail-smtp",
    auth: {
      user: env.gmailUser,
      pass: "[REDACTED]",
      passLength: env.gmailAppPassword.length,
    },
  });
}

export async function verifyMailTransport(): Promise<void> {
  assertEmailConfig();
  logTransporterConfig();

  const transport = createMailTransporter();

  try {
    await transport.verify();
    logger.info("Nodemailer transporter.verify() succeeded — Gmail SMTP auth OK");
    transporter = transport;
  } catch (error) {
    const err = error as Error & { code?: string; response?: string };
    logger.error("Nodemailer transporter.verify() failed", {
      code: err.code,
      message: err.message,
      hint: getAuthFailureHint(err),
    });
    throw error;
  }
}

function getAuthFailureHint(err: Error & { code?: string }): string {
  if (err.message?.includes("535") || err.code === "EAUTH") {
    return [
      "Gmail rejected username/password (535).",
      "Use an App Password from Google Account → Security → 2-Step Verification → App passwords.",
      "GMAIL_USER must match the Google account that created the App Password.",
      "Do not use your normal Gmail login password.",
      "Remove spaces from the 16-character App Password in server/.env.",
    ].join(" ");
  }
  return "Check server/.env and Gmail App Password settings.";
}

function getTransporter(): Transporter {
  if (transporter) return transporter;
  transporter = createMailTransporter();
  return transporter;
}

export async function sendContactEmail(
  payload: ContactPayload
): Promise<void> {
  const transport = getTransporter();

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px;">
      <h2 style="color: #915EFF;">New portfolio contact message</h2>
      <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
      <p><strong>Subject:</strong> ${escapeHtml(payload.subject)}</p>
      <hr />
      <p><strong>Message:</strong></p>
      <p style="white-space: pre-wrap;">${escapeHtml(payload.message)}</p>
    </div>
  `;

  const text = [
    "New portfolio contact message",
    "",
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Subject: ${payload.subject}`,
    "",
    "Message:",
    payload.message,
  ].join("\n");

  await transport.sendMail({
    from: `"${env.mailFromName}" <${env.gmailUser}>`,
    to: env.contactToEmail,
    replyTo: payload.email,
    subject: `[Portfolio] ${payload.subject}`,
    text,
    html,
  });

  logger.info("Contact email sent", {
    to: env.contactToEmail,
    from: payload.email,
    subject: payload.subject,
  });
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
