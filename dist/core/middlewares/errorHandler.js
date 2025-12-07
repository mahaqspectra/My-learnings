"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
const logger_1 = __importDefault(require("../logger"));
const AppError_1 = __importDefault(require("../errors/AppError"));
function errorHandler(err, req, res, _next) {
    logger_1.default.error(err.stack || err.message || String(err));
    if (err instanceof AppError_1.default) {
        return res.status(err.status).json({ error: err.message });
    }
    res.status(500).json({ error: 'Internal Server Error' });
}
exports.default = errorHandler;
