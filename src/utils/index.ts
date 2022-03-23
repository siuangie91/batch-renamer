import fs from 'fs';
import path from 'path';

const FILE_NUMBER_MIN_DIGITS = 3;

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

export const createFileNumber = (
  startingIndex: number,
  index: number
): string => {
  const fileIndex =
    startingIndex < 1 ? startingIndex + 1 : startingIndex + index;

  const fileNumber = padWithLeadingZeroes(fileIndex);
  return fileNumber;
};

/**
 * Creates the file name to rename the file as
 * @param props
 * @returns new file name
 */
export const createTargetFileName = ({
  prefix,
  extension,
  startingIndex,
  index,
}: {
  prefix: string;
  extension: string;
  startingIndex: number;
  index: number;
}): string => {
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
}: {
  origin: string;
  originalFile: string;
  targetFolder: string;
  startingIndex: number;
  index: number;
  prefix: string;
}): void => {
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
