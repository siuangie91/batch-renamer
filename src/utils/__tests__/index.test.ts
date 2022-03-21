import fs from 'fs';
import { createFileNumber, createTargetFileName, renameToNewFile } from '..';

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
  describe('createFileNumber', () => {
    it('returns with right amount of leading zeroes if will result in file numbers that are <1000', () => {
      expect(createFileNumber(3, 0)).toBe('003');
      expect(createFileNumber(33, 5)).toBe('038');
      expect(createFileNumber(333, 100)).toBe('433');
    });

    it('returns without leading zeroes if will result in file numbers that are >=1000', () => {
      expect(createFileNumber(1000, 1)).toBe('1001');
      expect(createFileNumber(1001, 99)).toBe('1100');
      expect(createFileNumber(10000, 999)).toBe('10999');
    });
  });

  describe('createTargetFileName', () => {
    describe('returns the file name that the file should be renamed as', () => {
      const prefix = 'prefix';
      const extension = '.png';
      const index = 2;

      test('when there is a >0 custom starting index', () => {
        const customStartingIndex = 23;

        const result = createTargetFileName({
          prefix,
          extension,
          customStartingIndex,
          index,
        });

        expect(result).toBe('prefix-025.png');
      });

      test('when there is no custom starting index (is 0)', () => {
        const customStartingIndex = 0;

        const result = createTargetFileName({
          prefix,
          extension,
          customStartingIndex,
          index,
        });

        expect(result).toBe('prefix-001.png');
      });
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
        customStartingIndex: 0,
      };

      const expectedCopyFileSyncArgs = [
        'originFolder/original.js',
        'targetFolder/prefix-001.js',
      ];

      renameToNewFile(args);

      expect(fs.copyFileSync).toHaveBeenCalledWith(...expectedCopyFileSyncArgs);
    });
  });
});
