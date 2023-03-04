import fs from 'fs';
import { retrieveFiles } from '../origin';

describe('utils > origin', () => {
  describe('retrieveFiles', () => {
    let readdirSyncSpy: jest.Mock;
    beforeEach(() => {
      readdirSyncSpy = jest.spyOn(fs, 'readdirSync') as jest.Mock;
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('returns the files from the origin folder if they exist', () => {
      const mockFiles = ['/folder/1', '/folder/2', '/folder/3'];
      readdirSyncSpy.mockReturnValueOnce(mockFiles);

      const result = retrieveFiles('/some/origin');
      expect(result).toEqual(mockFiles);
    });

    it("throws an error if files don't exist", () => {
      const mockFiles: string[] = []; // empty
      readdirSyncSpy.mockReturnValueOnce(mockFiles);

      expect(() => {
        retrieveFiles('/some/origin');
      }).toThrow();
    });
  });
});
