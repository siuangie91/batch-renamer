import fs from 'fs';

/**
 * Creates the absolute path to the target folder.
 * If no target was provided by the user,
 * appends `_renamed` to the original folder name
 * and uses that as the target folder name.
 * @param props
 * @returns
 */
export const getTargetFolder = ({
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
export const maybeCreateTargetFolder = (targetFolder: string): void => {
  if (!fs.existsSync(targetFolder)) {
    fs.mkdirSync(targetFolder);
    console.log('🛠 Created target folder', targetFolder);
  }
};

/**
 * Retrieves the files inside the origin folder
 * @param origin
 */
export const retrieveFiles = (origin: string): string[] => {
  const files = fs.readdirSync(origin);

  if (!files.length) {
    throw new Error(`❌ Failed to read origin folder at path: ${origin}`);
  }

  return files;
};
