import fs from 'fs';
import path from 'path';
import yargs from 'yargs';
import { renameToNewFile } from './utils';

interface ExpectedArguments {
  origin: string;
  prefix: string;
  target: string | null;
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
  .option('target', {
    alias: 't',
    type: 'string',
    describe: 'Absolute path tp folder to save renamed files to',
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

/**
 * Creates the absolute path to the target folder.
 * If no target was provided by the user,
 * appends `_renamed` to the original folder name
 * and uses that as the target folder name.
 * @param props
 * @returns
 */
const getTargetFolder = ({
  target,
  originFolderName,
  originParent,
}: {
  target: string | null;
  originFolderName: string;
  originParent: string;
}): string => {
  // if not target path not provided,
  // use original name with `_renamed` appended
  const backupTargetFolderName = `${originFolderName}_renamed`;

  // use backup target folder if target not provided
  const targetFolder = target || `${originParent}/${backupTargetFolderName}`;

  return targetFolder;
};

/**
 * Creates the target folder if it doesn't already exist
 * @param targetFolder absolute path to the target folder
 */
const maybeCreateTargetFolder = (targetFolder: string): void => {
  if (!fs.existsSync(targetFolder)) {
    fs.mkdirSync(targetFolder);
    console.log('🛠 Created target folder', targetFolder);
  }
};

const retrieveFiles = (origin: string): string[] => {
  const files = fs.readdirSync(origin);

  if (!files.length) {
    throw new Error(`❌ Failed to read origin folder at path: ${origin}`);
  }

  return files;
};

const batchRename = (args: ExpectedArguments): void => {
  const { origin, prefix, target, startingIndex } = args;

  const { name: originFolderName } = path.parse(origin);

  const originParent = path.dirname(origin);

  const targetFolder = getTargetFolder({
    target,
    originFolderName,
    originParent,
  });

  console.log(`
    🏁 Origin: ${origin}
    🎯 Target: ${targetFolder}
  `);

  if (!fs.existsSync(origin)) {
    throw new Error(`❌ Origin folder not found: ${originFolderName}`);
  }

  console.log('✅ Found folder:', originFolderName, '\n');

  maybeCreateTargetFolder(targetFolder);

  const files = retrieveFiles(origin);

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
    🎉 Done! Renamed files in ${originFolderName} to ${targetFolder} with prefix ${prefix}
  `);
};

batchRename(parsedArgs);
