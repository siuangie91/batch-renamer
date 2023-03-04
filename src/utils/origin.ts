import fs from 'fs';

/**
 * Retrieves the files inside the origin folder
 * @param origin
 * @returns files
 */
export const retrieveFiles = (origin: string): string[] => {
  const files = fs.readdirSync(origin);

  if (!files.length) {
    throw new Error(`❌ There are no files inside ${origin}`);
  }

  return files;
};