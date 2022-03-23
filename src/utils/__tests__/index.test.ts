import fs from 'fs';
import { getTargetFolder, maybeCreateTargetFolder } from '..';

describe('utils', () => {
  describe('getTargetFolder', () => {
    const originFolderName = 'original';
    const originParent = 'base/path';
    it('returns target folder specified by user if it was provided', () => {
      const target = 'my/path/to/target';
      const result = getTargetFolder({
        target,
        originFolderName,
        originParent,
      });

      expect(result).toBe(target);
    });

    it('uses the original folder name with "_renamed" if target folder was not specified by user ', () => {
      const result = getTargetFolder({
        target: null,
        originFolderName,
        originParent,
      });

      expect(result).toBe(`${originParent}/${originFolderName}_renamed`);
    });
  });

  describe('maybeCreateTargetFolder', () => {
    let existsSyncSpy: jest.Mock;
    let mkdirSyncSpy: jest.Mock;
    beforeEach(() => {
      existsSyncSpy = jest.spyOn(fs, 'existsSync') as jest.Mock;
      mkdirSyncSpy = jest.spyOn(fs, 'mkdirSync') as jest.Mock;
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('does not make the target folder if it already exists', () => {
      existsSyncSpy.mockReturnValueOnce(true);
      mkdirSyncSpy.mockImplementationOnce((folder: string) => folder);

      maybeCreateTargetFolder('/path/to/origin');

      expect(mkdirSyncSpy).not.toHaveBeenCalled();
    });

    it('makes the target folder if it does not already exists', () => {
      existsSyncSpy.mockReturnValueOnce(false);
      mkdirSyncSpy.mockImplementationOnce((folder: string) => folder);

      const targetFolder = '/path/to/origin';
      maybeCreateTargetFolder(targetFolder);

      expect(mkdirSyncSpy).toHaveBeenCalledWith(targetFolder);
    });
  });
});
