import { createApp } from "./app";
import { env, logEnvDiagnostics } from "./config/env";
import { verifyMailTransport } from "./services/email.service";
import { logger } from "./utils/logger";

async function bootstrap() {
  logEnvDiagnostics();

  try {
    await verifyMailTransport();
  } catch {
    logger.warn(
      "Server starting without verified mail transport — contact form will fail until Gmail auth is fixed"
    );
  }

  const app = createApp();

  app.listen(env.port, () => {
    logger.info("Contact API server started", {
      port: env.port,
      nodeEnv: env.nodeEnv,
      allowedOrigins: env.frontendUrls,
    });
  });
}

bootstrap().catch((err) => {
  logger.error("Failed to start server", {
    message: err instanceof Error ? err.message : err,
  });
  process.exit(1);
});
