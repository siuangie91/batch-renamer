"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renameToNewFile = exports.createTargetFileName = exports.createLeadingZeroes = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
/**
 * Returns a string of zeroes, like "000" based on the total
 * number of files and the index of the current file
 * @param numFiles total number of files to rename
 * @param index index of file to rename
 * @returns a string of zeroes
 */
const createLeadingZeroes = (numFiles, index) => {
    // always have a leading zero
    if (numFiles < 10) {
        return '0';
    }
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
/**
 * Creates the file name to rename the file as
 * @param props
 * @returns new file name
 */
const createTargetFileName = ({ prefix, extension, numFiles, index, }) => {
    const leadingZeroes = (0, exports.createLeadingZeroes)(numFiles, index);
    return `${prefix}-${leadingZeroes}${index + 1}${extension}`;
};
exports.createTargetFileName = createTargetFileName;
/**
 * Renames a given file
 * @param props
 */
const renameToNewFile = ({ originFolder, originalFile, targetFolder, numFiles, index, prefix, }) => {
    const extension = path_1.default.extname(originalFile);
    const basename = path_1.default.basename(originalFile, extension);
    console.log('🗂 ', basename, extension);
    const targetFile = (0, exports.createTargetFileName)({
        prefix,
        extension,
        numFiles,
        index,
    });
    fs_1.default.copyFileSync(`${originFolder}/${originalFile}`, `${targetFolder}/${targetFile}`);
    console.log('🗳 ', targetFile);
};
exports.renameToNewFile = renameToNewFile;
