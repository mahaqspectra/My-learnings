import path from 'path';
import dotenv from 'dotenv';

const envFile = process.env.NODE_ENV
  ? `.env.${process.env.NODE_ENV}`
  : '.env';

dotenv.config({ path: path.resolve(process.cwd(), envFile) });

export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT ? Number(process.env.PORT) : 3000,
  LOG_DIR: process.env.LOG_DIR || 'logs',
};

export default env;
