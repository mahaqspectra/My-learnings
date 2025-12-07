"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = createApp;
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const requestLogger_1 = __importDefault(require("./middlewares/requestLogger"));
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
function createApp() {
    const app = (0, express_1.default)();
    app.use((0, helmet_1.default)());
    app.use((0, cors_1.default)());
    app.use(express_1.default.json({ limit: '5mb' }));
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use(requestLogger_1.default);
    // Health check
    app.get('/health', (_req, res) => res.json({ status: 'ok' }));
    // TODO: mount routes here (api routes will be added in later phases)
    // Error handler should be last
    app.use(errorHandler_1.default);
    return app;
}
exports.default = createApp;
