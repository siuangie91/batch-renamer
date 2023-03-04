"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.retrieveFiles = void 0;
const fs_1 = __importDefault(require("fs"));
/**
 * Retrieves the files inside the origin folder
 * @param origin
 * @returns files
 */
const retrieveFiles = (origin) => {
    const files = fs_1.default.readdirSync(origin);
    if (!files.length) {
        throw new Error(`❌ There are no files inside ${origin}`);
    }
    return files;
};
exports.retrieveFiles = retrieveFiles;
