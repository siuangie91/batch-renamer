import fs from 'fs';
import path from 'path';

/**
 * Returns a string of zeroes, like "000" based on the total
 * number of files and the index of the current file
 * @param numFiles total number of files to rename
 * @param index index of file to rename
 * @returns a string of zeroes
 */
export const createLeadingZeroes = (
  numFiles: number,
  index: number
): string => {
  // always have a leading zero
  if (numFiles < 10) {
    return '0';
  }

  const digits = numFiles.toString();
  const idx = index.toString();

  const numOfZeroesToCreate = digits.length - idx.length;

  let leadingZeroes = '';
  for (let i = 0; i < numOfZeroesToCreate; i += 1) {
    leadingZeroes += '0';
  }

  return leadingZeroes;
};

/**
 * Creates the file name to rename the file as
 * @param props
 * @returns new file name
 */
export const createTargetFileName = ({
  prefix,
  extension,
  numFiles,
  index,
}: {
  prefix: string;
  extension: string;
  numFiles: number;
  index: number;
}): string => {
  const leadingZeroes = createLeadingZeroes(numFiles, index);

  return `${prefix}-${leadingZeroes}${index + 1}${extension}`;
};

/**
 * Renames a given file
 * @param props
 */
export const renameToNewFile = ({
  originFolder,
  originalFile,
  targetFolder,
  numFiles,
  index,
  prefix,
}: {
  originFolder: string;
  originalFile: string;
  targetFolder: string;
  numFiles: number;
  index: number;
  prefix: string;
}): void => {
  const extension = path.extname(originalFile);
  const basename = path.basename(originalFile, extension);
  console.log('🗂 ', basename, extension);

  const targetFile = createTargetFileName({
    prefix,
    extension,
    numFiles,
    index,
  });

  fs.copyFileSync(
    `${originFolder}/${originalFile}`,
    `${targetFolder}/${targetFile}`
  );

  console.log('🗳 ', targetFile);
};
