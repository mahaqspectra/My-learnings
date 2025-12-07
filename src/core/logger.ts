import path from 'path';
import fs from 'fs';
import { createLogger, format, transports } from 'winston';
import config from './config';

const { combine, timestamp, printf, colorize } = format;

const logDir = config.logDir || 'logs';
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

const logger = createLogger({
  level: config.nodeEnv === 'development' ? 'debug' : 'info',
  format: combine(timestamp(), logFormat),
  transports: [
    new transports.File({ filename: path.join(logDir, 'error.log'), level: 'error' }),
    new transports.File({ filename: path.join(logDir, 'combined.log') }),
  ],
});

if (config.nodeEnv !== 'production') {
  logger.add(new transports.Console({ format: combine(colorize(), timestamp(), logFormat) }));
}

export default logger;
