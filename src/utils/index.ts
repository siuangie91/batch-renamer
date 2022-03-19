import fs from 'fs';
import path from 'path';

export const createLeadingZeros = (files: string[]): string => {
  const numFiles = files.length;

  const digits = numFiles.toString().length;

  let leadingZeroes = '';
  for (let i = 0; i < digits; i += 1) {
    leadingZeroes += '0';
  }

  return leadingZeroes;
};

export const renameToNewFile = ({
  originFolder,
  originalFile,
  targetFolder,
  index,
  leadingZeroes,
  prefix,
}: {
  originFolder: string;
  originalFile: string;
  targetFolder: string;
  index: number;
  leadingZeroes: string;
  prefix: string;
}): void => {
  const extension = path.extname(originalFile);
  const basename = path.basename(originalFile, extension);
  console.log('🗂 ', basename, extension);

  const targetFileName = `${prefix}-${leadingZeroes}${index + 1}${extension}`;

  fs.copyFileSync(
    `${originFolder}/${originalFile}`,
    `${targetFolder}/${targetFileName}`
  );

  console.log('🗳 ', targetFileName);
};
