import fs from 'fs';
import path from 'path';
import yargs from 'yargs';
import { renameToNewFile } from './utils';

interface ExpectedArguments {
  originFolderName: string;
  prefix: string;
  startingIndex: number;
}

const parsedArgs: ExpectedArguments = yargs(process.argv.slice(2))
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
  .demandOption(
    ['originFolderName', 'prefix'],
    '❌ Missing args. Requires originFolderName and prefix'
  )
  .parse(process.argv.slice(2));

const { originFolderName, prefix, startingIndex } = parsedArgs;

const originFolder = path.relative(__dirname, `../${originFolderName}`);

const targetFolderName = `${originFolderName}_renamed`;
const targetFolder = path.relative(__dirname, `../${targetFolderName}`);

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
    startingIndex,
    index,
    prefix,
  });
});

console.log(
  `✅ Done! Renamed files in ${originFolderName} to the ${targetFolderName} with prefix ${prefix}`
);
