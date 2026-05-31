import express, { type Request, type Response, type NextFunction } from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { env } from "./config/env";
import { contactRouter } from "./routes/contact.routes";
import { healthRouter } from "./routes/health.routes";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler";
import { logger } from "./utils/logger";

export function createApp() {
  const app = express();

  app.set("trust proxy", 1);

  app.use(helmet());

  app.use(
    cors({
      origin(origin, callback) {
        if (!origin) {
          callback(null, true);
          return;
        }
        if (env.frontendUrls.includes(origin)) {
          callback(null, true);
          return;
        }
        logger.warn("CORS blocked origin", { origin });
        callback(new Error("Not allowed by CORS"));
      },
      methods: ["GET", "POST", "OPTIONS"],
      allowedHeaders: ["Content-Type"],
    })
  );

  app.use(express.json({ limit: "32kb" }));

  const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      success: false,
      message: "Too many messages. Please try again in 15 minutes.",
    },
  });

  app.use("/api", healthRouter);
  app.use("/api", contactLimiter, contactRouter);

  app.use(
    (err: Error, _req: Request, res: Response, next: NextFunction) => {
      if (err.message === "Not allowed by CORS") {
        res.status(403).json({
          success: false,
          message: "Origin not allowed.",
        });
        return;
      }
      next(err);
    }
  );

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
