// apps/api/src/index.ts
import express, { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import csurf from 'csurf';
import rateLimit from 'express-rate-limit';
import { createLogger } from './utils/logger';
import authRoutes from './routes/auth';
import paymentRoutes from './routes/payments';
import contentRoutes from './routes/content';
import legalRoutes from './routes/legal';
import { errorHandler } from './middleware/errorHandler';

const logger = createLogger('api');
const app = express();

// 1) Security-Header & CSP
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", 'data:'],
        connectSrc: ["'self'", 'ws:'],
      },
    },
  })
);

// 2) CORS-Konfiguration
const allowedOrigins = process.env.CORS_ORIGIN?.split(',') || [];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('CORS-Verbot: Origin nicht zugelassen'));
      }
    },
    credentials: true,
  })
);

// 3) Body- und Cookie-Parsing
app.use(express.json());
app.use(cookieParser());

// 4) Rate Limiting
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 Minuten
    max: 100,                 // max. 100 Anfragen pro IP
  })
);

// 5) Health-Check (ohne CSRF)
app.get('/healthz', (_req, res) => {
  res.send('OK');
});

// 6) CSRF-Schutz für /v1-Routen
const csrfProtection = csurf({
  cookie: {
    httpOnly: true,
    sameSite: 'strict',
  },
});
app.use('/v1', csrfProtection);

// 7) Routen-Mounting
app.use('/v1/auth', authRoutes);
app.use('/v1/payments', paymentRoutes);
app.use('/v1/content', contentRoutes);
app.use('/legal', legalRoutes);

// 8) Globaler Error-Handler (muss nach allen `app.use`-Aufrufen stehen)
app.use(errorHandler as any);

// 9) Server starten mit Port-Validierung
const portEnv = process.env.PORT;
const port = portEnv && /^\d+$/.test(portEnv) ? Number(portEnv) : 4000;
app.listen(port, () => {
  logger.info(`⚡️ API läuft unter http://localhost:${port}`);
});
