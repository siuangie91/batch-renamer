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
  customStartingIndex: number,
  index: number
): string => {
  const fileIndex =
    customStartingIndex < 1
      ? customStartingIndex + 1
      : customStartingIndex + index;

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
  customStartingIndex,
  index,
}: {
  prefix: string;
  extension: string;
  customStartingIndex: number;
  index: number;
}): string => {
  const fileNumber = createFileNumber(customStartingIndex, index);

  return `${prefix}-${fileNumber}${extension}`;
};

/**
 * Renames a given file
 * @param props
 */
export const renameToNewFile = ({
  originFolder,
  originalFile,
  targetFolder,
  customStartingIndex,
  index,
  prefix,
}: {
  originFolder: string;
  originalFile: string;
  targetFolder: string;
  customStartingIndex: number;
  index: number;
  prefix: string;
}): void => {
  const extension = path.extname(originalFile);
  const basename = path.basename(originalFile, extension);
  console.log('🗂 ', basename, extension);

  const targetFile = createTargetFileName({
    prefix,
    extension,
    customStartingIndex,
    index,
  });

  fs.copyFileSync(
    `${originFolder}/${originalFile}`,
    `${targetFolder}/${targetFile}`
  );

  console.log('🗳 ', targetFile);
};
