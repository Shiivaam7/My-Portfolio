import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";
import { assertEmailConfig, env } from "../config/env";
import { logger } from "../utils/logger";
import type { ContactPayload } from "../utils/validators";

let transporter: Transporter | null = null;

const SMTP_CONFIG = {
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
} as const;

/** Created lazily on first contact form submission (not at server startup). */
function createMailTransporter(): Transporter {
  assertEmailConfig();

  logger.info("Creating Nodemailer transporter (on-demand)", {
    host: SMTP_CONFIG.host,
    port: SMTP_CONFIG.port,
    secure: SMTP_CONFIG.secure,
    requireTLS: SMTP_CONFIG.requireTLS,
    authUser: env.gmailUser,
  });

  return nodemailer.createTransport({
    host: SMTP_CONFIG.host,
    port: SMTP_CONFIG.port,
    secure: SMTP_CONFIG.secure,
    requireTLS: SMTP_CONFIG.requireTLS,
    auth: {
      user: env.gmailUser,
      pass: env.gmailAppPassword,
    },
    tls: {
      minVersion: "TLSv1.2",
    },
    connectionTimeout: 20_000,
    greetingTimeout: 20_000,
    socketTimeout: 30_000,
  });
}

function getTransporter(): Transporter {
  if (!transporter) {
    transporter = createMailTransporter();
  }
  return transporter;
}

export async function sendContactEmail(
  payload: ContactPayload
): Promise<void> {
  const startedAt = Date.now();
  const transport = getTransporter();

  const mailOptions = {
    from: `"${env.mailFromName}" <${env.gmailUser}>`,
    to: env.contactToEmail,
    replyTo: payload.email,
    subject: `[Portfolio] ${payload.subject}`,
    text: [
      "New portfolio contact message",
      "",
      `Name: ${payload.name}`,
      `Email: ${payload.email}`,
      `Subject: ${payload.subject}`,
      "",
      "Message:",
      payload.message,
    ].join("\n"),
    html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px;">
      <h2 style="color: #915EFF;">New portfolio contact message</h2>
      <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
      <p><strong>Subject:</strong> ${escapeHtml(payload.subject)}</p>
      <hr />
      <p><strong>Message:</strong></p>
      <p style="white-space: pre-wrap;">${escapeHtml(payload.message)}</p>
    </div>
  `,
  };

  logger.info("sendMail() starting", {
    to: env.contactToEmail,
    replyTo: payload.email,
    subject: mailOptions.subject,
  });

  try {
    const info = await transport.sendMail(mailOptions);

    logger.info("sendMail() succeeded", {
      messageId: info.messageId,
      accepted: info.accepted,
      rejected: info.rejected,
      durationMs: Date.now() - startedAt,
    });
  } catch (error) {
    const err = error as Error & { code?: string };
    logger.error("sendMail() failed", {
      code: err.code,
      message: err.message,
      durationMs: Date.now() - startedAt,
      hint: getSendFailureHint(err),
    });

    // Reset so next request gets a fresh connection
    transporter = null;
    throw error;
  }
}

function getSendFailureHint(err: Error & { code?: string }): string {
  if (err.code === "ETIMEDOUT" || err.message?.includes("ETIMEDOUT")) {
    return "SMTP connection timed out. Render may block port 465; using 587+STARTTLS. Retry or check Render outbound network.";
  }
  if (err.message?.includes("535") || err.code === "EAUTH") {
    return "Gmail auth failed — use a 16-character App Password, not your login password.";
  }
  return "Check GMAIL_USER and GMAIL_APP_PASSWORD on Render.";
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
