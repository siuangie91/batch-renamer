"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const utils_1 = require("./utils");
const args = process.argv.slice(2);
const originFolderName = args[0];
const originFolder = path_1.default.relative(__dirname, `../${originFolderName}`);
const targetFolderName = `${originFolderName}_renamed`;
const targetFolder = path_1.default.relative(__dirname, `../${targetFolderName}`);
const newPrefix = args[1];
if (!originFolderName || !newPrefix) {
    throw new Error('❌ Missing args. Requires originFolderName and newPrefix');
}
console.log('originFolder 🤖', path_1.default.dirname(`${originFolder}/${originFolderName}`));
console.log('targetFolder 🎯', path_1.default.dirname(`${targetFolder}/${targetFolderName}`));
if (!fs_1.default.existsSync(originFolder)) {
    throw new Error(`❌ Origin folder not found: ${originFolder}`);
}
if (!fs_1.default.existsSync(targetFolder)) {
    fs_1.default.mkdirSync(targetFolder);
    console.log('🛠 Created target folder', targetFolder);
}
const files = fs_1.default.readdirSync(originFolder);
if (!(files === null || files === void 0 ? void 0 : files.length)) {
    throw new Error(`❌ Failed to read origin folder at path: ${originFolder}`);
}
files.forEach((file, index) => {
    (0, utils_1.renameToNewFile)({
        originFolder,
        originalFile: file,
        targetFolder,
        numFiles: files.length,
        index,
        prefix: newPrefix,
    });
});
console.log(`✅ Done! Renamed files in ${originFolderName} to the ${targetFolderName} with prefix ${newPrefix}`);
