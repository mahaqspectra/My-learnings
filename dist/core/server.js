"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = startServer;
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./config"));
const logger_1 = __importDefault(require("./logger"));
const app = (0, app_1.default)();
function startServer() {
    const port = config_1.default.port || 3000;
    const server = http_1.default.createServer(app);
    server.listen(port, () => {
        logger_1.default.info(`Server listening on port ${port} in ${config_1.default.nodeEnv} mode`);
    });
    const shutdown = () => {
        logger_1.default.info('Shutting down server');
        server.close(() => {
            logger_1.default.info('Server closed');
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
exports.default = startServer;
