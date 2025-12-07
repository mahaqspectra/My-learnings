import http from 'http';
import createApp from './app';
import config from './config';
import logger from './logger';

const app = createApp();

export function startServer(): http.Server {
  const port = config.port || 3000;
  const server = http.createServer(app);

  server.listen(port, () => {
    logger.info(`Server listening on port ${port} in ${config.nodeEnv} mode`);
  });

  const shutdown = () => {
    logger.info('Shutting down server');
    server.close(() => {
      logger.info('Server closed');
      process.exit(0);
    });
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);

  return server;
}

if (require.main === module) {
  startServer();
}

export default startServer;
