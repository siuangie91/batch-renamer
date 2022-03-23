"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const yargs_1 = __importDefault(require("yargs"));
const utils_1 = require("./utils");
const parsedArgs = (0, yargs_1.default)(process.argv.slice(2))
    .option('originFolderName', {
    alias: 'o',
    type: 'string',
    describe: 'Absolute path to original folder of files to rename',
})
    .option('prefix', {
    alias: 'p',
    type: 'string',
    describe: 'Prefix for the renamed files',
})
    .option('startingIndex', {
    alias: 's',
    type: 'number',
    describe: 'Custom starting index for renamed files',
    default: 0,
})
    .demandOption(['originFolderName', 'prefix'], '❌ Missing args. Requires originFolderName and prefix')
    .parse(process.argv.slice(2));
const { originFolderName, prefix, startingIndex } = parsedArgs;
const originFolder = path_1.default.relative(__dirname, `../${originFolderName}`);
const targetFolderName = `${originFolderName}_renamed`;
const targetFolder = path_1.default.relative(__dirname, `../${targetFolderName}`);
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
        startingIndex,
        index,
        prefix,
    });
});
console.log(`✅ Done! Renamed files in ${originFolderName} to the ${targetFolderName} with prefix ${prefix}`);
