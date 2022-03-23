import { getTargetFolder } from '..';

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
});
