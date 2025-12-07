import env from './env';

export interface AppConfig {
  nodeEnv: string;
  port: number;
  logDir: string;
}

const config: AppConfig = {
  nodeEnv: env.NODE_ENV,
  port: env.PORT,
  logDir: env.LOG_DIR,
};

export default config;
