"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renameToNewFile = exports.createLeadingZeros = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const createLeadingZeros = (files) => {
    const numFiles = files.length;
    const digits = numFiles.toString().length;
    let leadingZeroes = '';
    for (let i = 0; i < digits; i += 1) {
        leadingZeroes += '0';
    }
    return leadingZeroes;
};
exports.createLeadingZeros = createLeadingZeros;
const renameToNewFile = ({ originFolder, originalFile, targetFolder, index, leadingZeroes, prefix, }) => {
    const extension = path_1.default.extname(originalFile);
    const basename = path_1.default.basename(originalFile, extension);
    console.log('🗂 ', basename, extension);
    const targetFileName = `${prefix}-${leadingZeroes}${index + 1}${extension}`;
    fs_1.default.copyFileSync(`${originFolder}/${originalFile}`, `${targetFolder}/${targetFileName}`);
    console.log('🗳 ', targetFileName);
};
exports.renameToNewFile = renameToNewFile;
