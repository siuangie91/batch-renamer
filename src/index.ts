import fs from 'fs';
import path from 'path';
import yargs from 'yargs';
import { renameToNewFile } from './utils';

interface ExpectedArguments {
  origin: string;
  prefix: string;
  startingIndex: number;
}

const parsedArgs: ExpectedArguments = yargs(process.argv.slice(2))
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
  .demandOption(
    ['origin', 'prefix'],
    '❌ Missing args. Requires origin and prefix'
  )
  .help(
    'help',
    'Show help. See https://github.com/siuangie91/batch-renamer#batch-renamer'
  )
  .parse(process.argv.slice(2));

const { origin, prefix, startingIndex } = parsedArgs;

const { name: originFolderName } = path.parse(origin);

const originParent = path.dirname(origin);

const targetFolderName = `${originFolderName}_renamed`;
const targetFolder = `${originParent}/${targetFolderName}`;

console.log(`
  🏁 Origin: ${origin}
  🎯 Target: ${targetFolder}
`);

if (!fs.existsSync(origin)) {
  throw new Error(`❌ Origin folder not found: ${originFolderName}`);
}

console.log('✅ Found folder:', originFolderName, '\n');

if (!fs.existsSync(targetFolder)) {
  fs.mkdirSync(targetFolder);
  console.log('🛠 Created target folder', targetFolder);
}

const files: string[] = fs.readdirSync(origin);

if (!files?.length) {
  throw new Error(`❌ Failed to read origin folder at path: ${origin}`);
}

files.forEach((file: string, index: number): void => {
  renameToNewFile({
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
