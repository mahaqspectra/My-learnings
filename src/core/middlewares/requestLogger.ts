import { Request, Response, NextFunction } from 'express';
import logger from '../logger';

export function requestLogger(req: Request, res: Response, next: NextFunction) {
  const { method, originalUrl } = req;
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.info(`${method} ${originalUrl} ${res.statusCode} - ${duration}ms`);
  });

  next();
}

export default requestLogger;
