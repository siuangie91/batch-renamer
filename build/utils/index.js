"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renameToNewFile = exports.createLeadingZeroes = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const createLeadingZeroes = (numFiles, index) => {
    const digits = numFiles.toString();
    const idx = index.toString();
    const numOfZeroesToCreate = digits.length - idx.length;
    let leadingZeroes = '';
    for (let i = 0; i < numOfZeroesToCreate; i += 1) {
        leadingZeroes += '0';
    }
    return leadingZeroes;
};
exports.createLeadingZeroes = createLeadingZeroes;
const renameToNewFile = ({ originFolder, originalFile, targetFolder, numFiles, index, prefix, }) => {
    const extension = path_1.default.extname(originalFile);
    const basename = path_1.default.basename(originalFile, extension);
    console.log('🗂 ', basename, extension);
    const leadingZeroes = (0, exports.createLeadingZeroes)(numFiles, index);
    const targetFileName = `${prefix}-${leadingZeroes}${index + 1}${extension}`;
    fs_1.default.copyFileSync(`${originFolder}/${originalFile}`, `${targetFolder}/${targetFileName}`);
    console.log('🗳 ', targetFileName);
};
exports.renameToNewFile = renameToNewFile;
