import fs from 'fs';
import path from 'path';
import padWithLeadingZeroes from 'leading-zeroes';

export const createFileNumber = (
  customStartingIndex: number,
  index: number
): string => {
  const fileIndex =
    customStartingIndex < 1
      ? customStartingIndex + 1
      : customStartingIndex + index;

  const fileNumber = padWithLeadingZeroes(fileIndex, 3);
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
