import express, { Application } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import requestLogger from './middlewares/requestLogger';
import errorHandler from './middlewares/errorHandler';

export function createApp(): Application {
  const app = express();

  app.use(helmet());
  app.use(cors());
  app.use(express.json({ limit: '5mb' }));
  app.use(express.urlencoded({ extended: true }));

  app.use(requestLogger);

  // Health check
  app.get('/health', (_req, res) => res.json({ status: 'ok' }));

  // TODO: mount routes here (api routes will be added in later phases)

  // Error handler should be last
  app.use(errorHandler);

  return app;
}

export default createApp;
