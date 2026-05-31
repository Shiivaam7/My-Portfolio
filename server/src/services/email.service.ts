import { Resend } from "resend";
import { assertEmailConfig, env } from "../config/env";
import { logger } from "../utils/logger";
import type { ContactPayload } from "../utils/validators";

let resendClient: Resend | null = null;

function getResendClient(): Resend {
  assertEmailConfig();
  if (!resendClient) {
    logger.info("Initializing Resend client (on-demand)", {
      from: env.resendFromEmail,
      to: env.contactToEmail,
    });
    resendClient = new Resend(env.resendApiKey);
  }
  return resendClient;
}

function formatFromAddress(): string {
  return `${env.mailFromName} <${env.resendFromEmail}>`;
}

export async function sendContactEmail(
  payload: ContactPayload
): Promise<void> {
  const startedAt = Date.now();
  const resend = getResendClient();
  const subject = `[Portfolio] ${payload.subject}`;

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

  logger.info("Resend emails.send() starting", {
    from: formatFromAddress(),
    to: env.contactToEmail,
    replyTo: payload.email,
    subject,
  });

  try {
    const { data, error } = await resend.emails.send({
      from: formatFromAddress(),
      to: [env.contactToEmail],
      replyTo: payload.email,
      subject,
      text,
      html,
    });

    if (error) {
      logger.error("Resend emails.send() returned error", {
        name: error.name,
        message: error.message,
        durationMs: Date.now() - startedAt,
      });
      throw new Error(error.message);
    }

    logger.info("Resend emails.send() succeeded", {
      messageId: data?.id,
      durationMs: Date.now() - startedAt,
    });
  } catch (error) {
    const err = error as Error;
    logger.error("Resend emails.send() failed", {
      message: err.message,
      durationMs: Date.now() - startedAt,
      hint: "Verify RESEND_API_KEY and RESEND_FROM_EMAIL in Resend dashboard",
    });
    resendClient = null;
    throw error;
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
