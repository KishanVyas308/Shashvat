"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDirname = exports.getFilename = void 0;
const path_1 = __importDefault(require("path"));
const url_1 = require("url");
// Refactor to export functions for dynamic computation
const getFilename = (metaUrl) => path_1.default.resolve((0, url_1.fileURLToPath)(metaUrl));
exports.getFilename = getFilename;
const getDirname = (metaUrl) => path_1.default.dirname((0, exports.getFilename)(metaUrl));
exports.getDirname = getDirname;
