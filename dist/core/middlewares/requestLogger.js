"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestLogger = requestLogger;
const logger_1 = __importDefault(require("../logger"));
function requestLogger(req, res, next) {
    const { method, originalUrl } = req;
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        logger_1.default.info(`${method} ${originalUrl} ${res.statusCode} - ${duration}ms`);
    });
    next();
}
exports.default = requestLogger;
