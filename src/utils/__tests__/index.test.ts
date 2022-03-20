import fs from 'fs';
import { createLeadingZeroes, createTargetFileName, renameToNewFile } from '..';

jest.mock('fs', () => {
  const originalModule = jest.requireActual('fs');
  return {
    ...originalModule,
    copyFileSync: jest
      .fn()
      .mockImplementation((origin: string, target: string) => ({
        origin,
        target,
      })),
  };
});

jest.mock('path', () => {
  const originalModule = jest.requireActual('fs');
  return {
    ...originalModule,
    extname: jest.fn(
      (originalFile: string) => `.${originalFile.split('.')[1]}`
    ),
    basename: jest.fn((originalFile: string) => originalFile.split('.')[0]),
  };
});

describe('utils', () => {
  describe('createLeadingZeroes', () => {
    it('returns "0" if there are <10 files', () => {
      expect(createLeadingZeroes(9, 1)).toBe('0'); // 01
    });

    it('returns a string of zeroes based to match the number of files', () => {
      expect(createLeadingZeroes(10, 1)).toBe('0'); // 01
      expect(createLeadingZeroes(10, 10)).toBe(''); // 10
      expect(createLeadingZeroes(99, 10)).toBe(''); // 99

      expect(createLeadingZeroes(100, 1)).toBe('00'); // 001
      expect(createLeadingZeroes(100, 10)).toBe('0'); // 010
      expect(createLeadingZeroes(999, 110)).toBe(''); // 110

      expect(createLeadingZeroes(1000, 1)).toBe('000'); // 0001
      expect(createLeadingZeroes(1000, 10)).toBe('00'); // 0010
      expect(createLeadingZeroes(1000, 110)).toBe('0'); // 0110
      expect(createLeadingZeroes(9999, 1110)).toBe(''); // 1110
    });
  });

  describe('createTargetFileName', () => {
    it('returns the file name that the file should be renamed as', () => {
      const prefix = 'prefix';
      const extension = '.png';
      const numFiles = 100;
      const index = 22;

      const result = createTargetFileName({
        prefix,
        extension,
        numFiles,
        index,
      });

      expect(result).toBe('prefix-023.png');
    });
  });

  describe('renameToNewFile', () => {
    it('copies the original file to a new folder with specified prefix', () => {
      const args = {
        originFolder: 'originFolder',
        originalFile: 'original.js',
        targetFolder: 'targetFolder',
        numFiles: 10,
        index: 0,
        prefix: 'prefix',
      };

      const expectedCopyFileSyncArgs = [
        'originFolder/original.js',
        'targetFolder/prefix-01.js',
      ];

      renameToNewFile(args);

      expect(fs.copyFileSync).toHaveBeenCalledWith(...expectedCopyFileSyncArgs);
    });
  });
});
