import fs from 'fs';
import path from 'path';
import type { TargetFileName, NewFileRenameInput } from 'src/types';

const FILE_NUMBER_MIN_DIGITS = 3;

/**
 * Pads the file index with appropriate number of leading zeroes
 * @param fileIndex
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
 * @param startingIndex
 * @param index
 * @returns file index with leading zeros
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
 * @param targetFileName
 * @returns new file name
 */
export const createTargetFileName = ({
  prefix,
  extension,
  startingIndex,
  index,
}: TargetFileName): string => {
  const fileNumber = createFileNumber(startingIndex, index);

  return `${prefix}-${fileNumber}${extension}`;
};

/**
 * Renames a given file
 * @param props
 */
export const renameToNewFile = ({
  origin,
  originalFile,
  targetFolder,
  startingIndex,
  index,
  prefix,
}: NewFileRenameInput): void => {
  const extension = path.extname(originalFile);
  const basename = path.basename(originalFile, extension);

  const targetFile = createTargetFileName({
    prefix,
    extension,
    startingIndex,
    index,
  });

  fs.copyFileSync(`${origin}/${originalFile}`, `${targetFolder}/${targetFile}`);

  console.log('🗂 ', basename, extension, '→ 🗳 ', targetFile);
};
