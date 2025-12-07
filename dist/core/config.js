"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = __importDefault(require("./env"));
const config = {
    nodeEnv: env_1.default.NODE_ENV,
    port: env_1.default.PORT,
    logDir: env_1.default.LOG_DIR,
};
exports.default = config;
