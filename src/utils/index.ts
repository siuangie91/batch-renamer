import fs from 'fs';
import path from 'path';

export const createLeadingZeroes = (
  numFiles: number,
  index: number
): string => {
  const digits = numFiles.toString();
  const idx = index.toString();

  const numOfZeroesToCreate = digits.length - idx.length;

  let leadingZeroes = '';
  for (let i = 0; i < numOfZeroesToCreate; i += 1) {
    leadingZeroes += '0';
  }

  return leadingZeroes;
};

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

  const leadingZeroes = createLeadingZeroes(numFiles, index);

  const targetFileName = `${prefix}-${leadingZeroes}${index + 1}${extension}`;

  fs.copyFileSync(
    `${originFolder}/${originalFile}`,
    `${targetFolder}/${targetFileName}`
  );

  console.log('🗳 ', targetFileName);
};
