import { createApp } from "./app";
import { env, logEnvDiagnostics } from "./config/env";
import { logger } from "./utils/logger";

function bootstrap() {
  logEnvDiagnostics();

  logger.info("Email provider: Resend API (HTTPS — no SMTP ports)");

  const app = createApp();

  app.listen(env.port, () => {
    logger.info("Contact API server started", {
      port: env.port,
      nodeEnv: env.nodeEnv,
      allowedOrigins: env.frontendUrls,
    });
  });
}

bootstrap();
