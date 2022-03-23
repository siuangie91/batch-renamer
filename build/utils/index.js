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
 * @param fileIndex
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
 * @param startingIndex
 * @param index
 * @returns file index with leading zeros
 */
const createFileNumber = (startingIndex, index) => {
    const fileIndex = startingIndex < 1 ? startingIndex + 1 : startingIndex + index;
    const fileNumber = (0, exports.padWithLeadingZeroes)(fileIndex);
    return fileNumber;
};
exports.createFileNumber = createFileNumber;
/**
 * Creates the file name to rename the file as
 * @param props
 * @returns new file name
 */
const createTargetFileName = ({ prefix, extension, startingIndex, index, }) => {
    const fileNumber = (0, exports.createFileNumber)(startingIndex, index);
    return `${prefix}-${fileNumber}${extension}`;
};
exports.createTargetFileName = createTargetFileName;
/**
 * Renames a given file
 * @param props
 */
const renameToNewFile = ({ origin, originalFile, targetFolder, startingIndex, index, prefix, }) => {
    const extension = path_1.default.extname(originalFile);
    const basename = path_1.default.basename(originalFile, extension);
    const targetFile = (0, exports.createTargetFileName)({
        prefix,
        extension,
        startingIndex,
        index,
    });
    fs_1.default.copyFileSync(`${origin}/${originalFile}`, `${targetFolder}/${targetFile}`);
    console.log('🗂 ', basename, extension, '→ 🗳 ', targetFile);
};
exports.renameToNewFile = renameToNewFile;
