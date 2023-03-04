"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renameToNewFile = exports.createTargetFileName = exports.createFileNumber = exports.padWithLeadingZeroes = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const FILE_NUMBER_MIN_DIGITS = 3;
/**
 * Pads the file index with appropriate number of leading zeroes
 * @returns file index with leading zeroes
 */
const padWithLeadingZeroes = (fileIndex) => {
    const digits = fileIndex.toString().length;
    const numLeadingZeros = FILE_NUMBER_MIN_DIGITS - digits;
    if (numLeadingZeros < 1)
        return fileIndex.toString();
    let leadingZeros = '';
    for (let i = 0; i < numLeadingZeros; i += 1) {
        leadingZeros += '0';
    }
    return `${leadingZeros}${fileIndex}`;
};
exports.padWithLeadingZeroes = padWithLeadingZeroes;
/**
 * Creates the file number, taking the starting index into account
 */
const createFileNumber = (startingIndex, index) => {
    // if no starting index provided, start number at 1 (instead of 0)
    const incrementer = startingIndex ? 0 : 1;
    const fileIndex = startingIndex + index + incrementer;
    return (0, exports.padWithLeadingZeroes)(fileIndex);
};
exports.createFileNumber = createFileNumber;
/**
 * Creates the file name to rename the file as
 * @returns new file name with the format `{prefix}_{fileNumber}{extension}`
 */
const createTargetFileName = ({ prefix, extension, startingIndex, index, }) => {
    const fileNumber = (0, exports.createFileNumber)(startingIndex, index);
    return `${prefix}-${fileNumber}${extension}`;
};
exports.createTargetFileName = createTargetFileName;
/**
 * Renames a given file
 */
const renameToNewFile = ({ origin, originalFileName, targetFolderName, startingIndex, index, prefix, }) => {
    const extension = path_1.default.extname(originalFileName);
    const basename = path_1.default.basename(originalFileName, extension);
    const targetFile = (0, exports.createTargetFileName)({
        prefix,
        extension,
        startingIndex,
        index,
    });
    fs_1.default.copyFileSync(`${origin}/${originalFileName}`, `${targetFolderName}/${targetFile}`);
    console.log('🗂 ', basename, extension, '→ 🗳 ', targetFile);
};
exports.renameToNewFile = renameToNewFile;
