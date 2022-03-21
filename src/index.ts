import fs from 'fs';
import path from 'path';
import { renameToNewFile } from './utils';

const args = process.argv.slice(2);

const originFolderName = args[0];
const originFolder = path.relative(__dirname, `../${originFolderName}`);

const targetFolderName = `${originFolderName}_renamed`;
const targetFolder = path.relative(__dirname, `../${targetFolderName}`);

const newPrefix = args[1];

const customStartingIndex = parseInt(args[2], 10) || 0;

if (!originFolderName || !newPrefix) {
  throw new Error('❌ Missing args. Requires originFolderName and newPrefix');
}

console.log(
  'originFolder 🤖',
  path.dirname(`${originFolder}/${originFolderName}`)
);
console.log(
  'targetFolder 🎯',
  path.dirname(`${targetFolder}/${targetFolderName}`)
);

if (!fs.existsSync(originFolder)) {
  throw new Error(`❌ Origin folder not found: ${originFolder}`);
}

if (!fs.existsSync(targetFolder)) {
  fs.mkdirSync(targetFolder);
  console.log('🛠 Created target folder', targetFolder);
}

const files: string[] = fs.readdirSync(originFolder);

if (!files?.length) {
  throw new Error(`❌ Failed to read origin folder at path: ${originFolder}`);
}

files.forEach((file: string, index: number): void => {
  renameToNewFile({
    originFolder,
    originalFile: file,
    targetFolder,
    numFiles: files.length,
    customStartingIndex,
    index,
    prefix: newPrefix,
  });
});

console.log(
  `✅ Done! Renamed files in ${originFolderName} to the ${targetFolderName} with prefix ${newPrefix}`
);
