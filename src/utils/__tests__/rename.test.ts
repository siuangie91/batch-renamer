import fs from 'fs';
import { NewFileRenameProps } from '../../types';
import {
  padWithLeadingZeroes,
  createFileNumber,
  createTargetFileName,
  renameToNewFile,
} from '../rename';

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
  const originalModule = jest.requireActual('path');
  return {
    ...originalModule,
    extname: jest.fn(
      (originalFile: string) => `.${originalFile.split('.')[1]}`
    ),
    basename: jest.fn((originalFile: string) => originalFile.split('.')[0]),
  };
});

describe('utils > rename', () => {
  describe('padWithLeadingZeroes', () => {
    it('prepends 2 zeroes when fileIndex has 1 digit', () => {
      const result = padWithLeadingZeroes(1);
      expect(result).toBe('001');
    });

    it('prepends 1 zeroes when fileIndex has 2 digits', () => {
      const result = padWithLeadingZeroes(10);
      expect(result).toBe('010');
    });

    it('returns the fileIndex has >=3 digits', () => {
      expect(padWithLeadingZeroes(100)).toBe('100');
      expect(padWithLeadingZeroes(1000)).toBe('1000');
    });
  });

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

      test('when there is a >0 custom starting index', () => {
        const startingIndex = 23;
        const index = 2;

        const result = createTargetFileName({
          prefix,
          extension,
          startingIndex,
          index,
        });

        expect(result).toBe('prefix-025.png');
      });

      test('when there is no custom starting index (is 0)', () => {
        const startingIndex = 0;
        const index = 2;

        const result = createTargetFileName({
          prefix,
          extension,
          startingIndex,
          index,
        });

        expect(result).toBe('prefix-003.png');
      });
    });
  });

  describe('renameToNewFile', () => {
    it('copies the original file to a new folder with specified prefix', () => {
      const args: NewFileRenameProps = {
        origin: '/originFolder',
        originalFileName: 'original.js',
        targetFolderName: '/targetFolder',
        startingIndex: 0,
        index: 0,
        prefix: 'prefix',
      };

      const expectedCopyFileSyncArgs = [
        '/originFolder/original.js',
        '/targetFolder/prefix-001.js',
      ];

      renameToNewFile(args);

      expect(fs.copyFileSync).toHaveBeenCalledWith(...expectedCopyFileSyncArgs);
    });
  });
});
