"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renameToNewFile = exports.createTargetFileName = exports.createFileNumber = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const leading_zeroes_1 = __importDefault(require("leading-zeroes"));
const createFileNumber = (customStartingIndex, index) => {
    const fileIndex = customStartingIndex < 1
        ? customStartingIndex + 1
        : customStartingIndex + index;
    const fileNumber = (0, leading_zeroes_1.default)(fileIndex, 3);
    return fileNumber;
};
exports.createFileNumber = createFileNumber;
/**
 * Creates the file name to rename the file as
 * @param props
 * @returns new file name
 */
const createTargetFileName = ({ prefix, extension, customStartingIndex, index, }) => {
    const fileNumber = (0, exports.createFileNumber)(customStartingIndex, index);
    return `${prefix}-${fileNumber}${extension}`;
};
exports.createTargetFileName = createTargetFileName;
/**
 * Renames a given file
 * @param props
 */
const renameToNewFile = ({ originFolder, originalFile, targetFolder, customStartingIndex, index, prefix, }) => {
    const extension = path_1.default.extname(originalFile);
    const basename = path_1.default.basename(originalFile, extension);
    console.log('🗂 ', basename, extension);
    const targetFile = (0, exports.createTargetFileName)({
        prefix,
        extension,
        customStartingIndex,
        index,
    });
    fs_1.default.copyFileSync(`${originFolder}/${originalFile}`, `${targetFolder}/${targetFile}`);
    console.log('🗳 ', targetFile);
};
exports.renameToNewFile = renameToNewFile;
