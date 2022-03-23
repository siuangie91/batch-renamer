"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renameToNewFile = exports.createTargetFileName = exports.createFileNumber = exports.padWithLeadingZeroes = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const FILE_NUMBER_MIN_DIGITS = 3;
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
const renameToNewFile = ({ originFolder, originalFile, targetFolder, startingIndex, index, prefix, }) => {
    const extension = path_1.default.extname(originalFile);
    const basename = path_1.default.basename(originalFile, extension);
    console.log('🗂 ', basename, extension);
    const targetFile = (0, exports.createTargetFileName)({
        prefix,
        extension,
        startingIndex,
        index,
    });
    fs_1.default.copyFileSync(`${originFolder}/${originalFile}`, `${targetFolder}/${targetFile}`);
    console.log('🗳 ', targetFile);
};
exports.renameToNewFile = renameToNewFile;
