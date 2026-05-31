import { createApp } from "./app";
import { env, logEnvDiagnostics } from "./config/env";
import { logger } from "./utils/logger";

function bootstrap() {
  logEnvDiagnostics();

  logger.info("Mail transport: lazy init on first POST /api/contact (no startup verify)");

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
