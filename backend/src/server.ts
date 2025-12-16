import express from 'express';
import cors from 'cors';
import type { CorsOptions } from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import wrappedRoutes from './routes/wrapped';
import type { Request, Response, NextFunction } from 'express';


dotenv.config();

const app = express();
const PORT = Number(process.env.PORT || process.env.PORT_BACKEND || 4000);
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://localhost:3000';

app.use(helmet());

const corsOptions: CorsOptions = {
  origin: (origin: string | undefined, callback) => {
    if (!origin || /^http:\/\/localhost:\d+$/.test(origin)) {
      return callback(null, true);
    }

    if (origin === FRONTEND_ORIGIN) {
      return callback(null, true);
    }

    if (/^https:\/\/.*\.vercel\.app$/.test(origin)) {
      return callback(null, true);
    }

    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
};

app.use(cors(corsOptions));

const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10),
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '50', 10),
  message: 'Demasiados intentos. Por favor, esperá unos minutos.',
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: false,
  skipFailedRequests: false,
});

app.use('/api/', limiter as any);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req: Request, res: Response, next: NextFunction) => {
  const timeout = parseInt(process.env.REQUEST_TIMEOUT_MS || '60000', 10);
  req.setTimeout(timeout);
  res.setTimeout(timeout);
  next();
});

app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/wrapped', wrappedRoutes);

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err?.message || err);

  const statusCode = err?.statusCode || 500;
  const message = err?.message || 'Error interno del servidor';

  res.status(statusCode).json({
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err?.stack }),
  });
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`CORS enabled for: ${FRONTEND_ORIGIN}`);
});
