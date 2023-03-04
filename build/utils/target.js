"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.maybeCreateTargetFolder = exports.getTargetFolderName = void 0;
const fs_1 = __importDefault(require("fs"));
/**
 * Creates the absolute path to the target folder.
 * If no target was provided by the user,
 * appends `_renamed` to the original folder name
 * and uses that as the target folder name.
 */
const getTargetFolderName = ({ target, originFolderName, originParent, }) => {
    // if not target path not provided,
    // use original name with `_renamed` appended
    const backupTargetFolderName = `${originFolderName}_renamed`;
    // use backup target folder if target not provided
    const targetFolder = target || `${originParent}/${backupTargetFolderName}`;
    return targetFolder;
};
exports.getTargetFolderName = getTargetFolderName;
/**
 * Creates the target folder if it doesn't already exist
 * @param targetFolder absolute path to the target folder
 */
const maybeCreateTargetFolder = (targetFolder) => {
    if (!fs_1.default.existsSync(targetFolder)) {
        fs_1.default.mkdirSync(targetFolder);
        console.log('🛠 Created target folder', targetFolder);
    }
};
exports.maybeCreateTargetFolder = maybeCreateTargetFolder;
