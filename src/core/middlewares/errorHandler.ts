import { Request, Response, NextFunction } from 'express';
import logger from '../logger';
import AppError from '../errors/AppError';

export function errorHandler(err: any, req: Request, res: Response, _next: NextFunction) {
  logger.error(err.stack || err.message || String(err));

  if (err instanceof AppError) {
    return res.status(err.status).json({ error: err.message });
  }

  res.status(500).json({ error: 'Internal Server Error' });
}

export default errorHandler;
