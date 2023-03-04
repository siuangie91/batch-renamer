import fs from 'fs';
import path from 'path';
import yargs from 'yargs';
import type { CommandArguments } from 'src/types';
import {
  getTargetFolderName,
  maybeCreateTargetFolder,
} from './utils/target';
import { retrieveFiles } from './utils/origin';
import { renameToNewFile } from './utils/rename';

const parsedArgs: CommandArguments = yargs(process.argv.slice(2))
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
  .option('target', {
    alias: 't',
    type: 'string',
    describe: 'Absolute path to folder to save renamed files to',
    default: null,
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

const batchRename = (args: CommandArguments): void => {
  const { origin, prefix, target, startingIndex } = args;

  const { name: originFolderName } = path.parse(origin);

  const originParent = path.dirname(origin);

  const targetFolderName = getTargetFolderName({
    target,
    originFolderName,
    originParent,
  });

  console.log(`
    🏁 Origin: ${origin}
    🎯 Target: ${targetFolderName}
  `);

  if (!fs.existsSync(origin)) {
    throw new Error(`❌ Origin folder not found: ${originFolderName}`);
  }

  console.log('✅ Found folder:', originFolderName, '\n');

  maybeCreateTargetFolder(targetFolderName);

  const files = retrieveFiles(origin);

  files.forEach((file: string, index: number): void => {
    renameToNewFile({
      origin,
      originalFileName: file,
      targetFolderName,
      startingIndex,
      index,
      prefix,
    });
  });

  console.log(`
    🎉 Done! Renamed files in ${originFolderName} to ${targetFolderName} with prefix ${prefix}
  `);
};

batchRename(parsedArgs);
