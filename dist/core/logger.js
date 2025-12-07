"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const winston_1 = require("winston");
const config_1 = __importDefault(require("./config"));
const { combine, timestamp, printf, colorize } = winston_1.format;
const logDir = config_1.default.logDir || 'logs';
if (!fs_1.default.existsSync(logDir)) {
    fs_1.default.mkdirSync(logDir, { recursive: true });
}
const logFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level}]: ${message}`;
});
const logger = (0, winston_1.createLogger)({
    level: config_1.default.nodeEnv === 'development' ? 'debug' : 'info',
    format: combine(timestamp(), logFormat),
    transports: [
        new winston_1.transports.File({ filename: path_1.default.join(logDir, 'error.log'), level: 'error' }),
        new winston_1.transports.File({ filename: path_1.default.join(logDir, 'combined.log') }),
    ],
});
if (config_1.default.nodeEnv !== 'production') {
    logger.add(new winston_1.transports.Console({ format: combine(colorize(), timestamp(), logFormat) }));
}
exports.default = logger;
