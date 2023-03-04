import fs from 'fs';
import path from 'path';
import type { TargetFile, NewFileRenameProps } from 'src/types';

const FILE_NUMBER_MIN_DIGITS = 3;

/**
 * Pads the file index with appropriate number of leading zeroes
 * @returns file index with leading zeroes
 */
export const padWithLeadingZeroes = (fileIndex: number): string => {
  const digits = fileIndex.toString().length;

  const numLeadingZeros = FILE_NUMBER_MIN_DIGITS - digits;

  if (numLeadingZeros < 1) return fileIndex.toString();

  let leadingZeros = '';
  for (let i = 0; i < numLeadingZeros; i += 1) {
    leadingZeros += '0';
  }

  return `${leadingZeros}${fileIndex}`;
};

/**
 * Creates the file number, taking the starting index into account
 */
export const createFileNumber = (
  startingIndex: number,
  index: number
): string => {
  // if no starting index provided, start number at 1 (instead of 0)
  const incrementer = startingIndex ? 0 : 1;

  const fileIndex = startingIndex + index + incrementer;

  return padWithLeadingZeroes(fileIndex);
};

/**
 * Creates the file name to rename the file as
 * @returns new file name with the format `{prefix}_{fileNumber}{extension}`
 */
export const createTargetFileName = ({
  prefix,
  extension,
  startingIndex,
  index,
}: TargetFile): string => {
  const fileNumber = createFileNumber(startingIndex, index);

  return `${prefix}-${fileNumber}${extension}`;
};

/**
 * Renames a given file
 */
export const renameToNewFile = ({
  origin,
  originalFileName,
  targetFolderName,
  startingIndex,
  index,
  prefix,
}: NewFileRenameProps): void => {
  const extension = path.extname(originalFileName);
  const basename = path.basename(originalFileName, extension);

  const targetFile = createTargetFileName({
    prefix,
    extension,
    startingIndex,
    index,
  });

  fs.copyFileSync(`${origin}/${originalFileName}`, `${targetFolderName}/${targetFile}`);

  console.log('🗂 ', `${basename}${extension}` , '→ 🗳', targetFile);
};
