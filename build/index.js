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
    .option('origin', {
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
    .demandOption(['origin', 'prefix'], '❌ Missing args. Requires origin and prefix')
    .help('help', 'Show help. See https://github.com/siuangie91/batch-renamer#batch-renamer')
    .parse(process.argv.slice(2));
const { origin, prefix, startingIndex } = parsedArgs;
const { name: originFolderName } = path_1.default.parse(origin);
const originParent = path_1.default.dirname(origin);
const targetFolderName = `${originFolderName}_renamed`;
const targetFolder = `${originParent}/${targetFolderName}`;
console.log(`
  🏁 Origin: ${origin}
  🎯 Target: ${targetFolder}
`);
if (!fs_1.default.existsSync(origin)) {
    throw new Error(`❌ Origin folder not found: ${originFolderName}`);
}
console.log('✅ Found folder:', originFolderName, '\n');
if (!fs_1.default.existsSync(targetFolder)) {
    fs_1.default.mkdirSync(targetFolder);
    console.log('🛠 Created target folder', targetFolder);
}
const files = fs_1.default.readdirSync(origin);
if (!(files === null || files === void 0 ? void 0 : files.length)) {
    throw new Error(`❌ Failed to read origin folder at path: ${origin}`);
}
files.forEach((file, index) => {
    (0, utils_1.renameToNewFile)({
        origin,
        originalFile: file,
        targetFolder,
        startingIndex,
        index,
        prefix,
    });
});
console.log(`
  🎉 Done! Renamed files in ${originFolderName} to the ${targetFolderName} with prefix ${prefix}
`);
