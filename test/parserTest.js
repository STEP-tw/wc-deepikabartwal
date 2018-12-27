const assert = require('assert');
const { parseArgs } = require('../src/parser.js');

describe('parseArgs', () => {
  describe('for only single files is given', () => {
    it('should return object with key "files" and  value filenames', () => {
      let actual = parseArgs(['file1']);
      let expectedOutput = { options: ['l', 'w', 'c'], files: ['file1'] };
      assert.deepEqual(actual, expectedOutput);
    });
  });

  describe('for an options and a files is given', () => {
    it('should return object with key "files" and "options" for -c', () => {
      let actual = parseArgs(['-c', 'file1']);
      let expectedOutput = { options: ['c'], files: ['file1'] };
      assert.deepEqual(actual, expectedOutput);
    });

    it('should return object with key "files" and "options" for -l', () => {
      let actual = parseArgs(['-l', 'file1']);
      let expectedOutput = { options: ['l'], files: ['file1'] };
      assert.deepEqual(actual, expectedOutput);
    });
  });

  describe('for multiples options are given', () => {
    it('should return object with key "files" and "options" and given options in it', () => {
      let actual = parseArgs(['-c', '-l', 'file1']);
      let expectedOutput = { options: ['c', 'l'], files: ['file1'] };
      assert.deepEqual(actual, expectedOutput);
    });

    it('should return object with key "files" and "options" ', () => {
      let actual = parseArgs(['-lc', 'file1']);
      let expectedOutput = { options: ['l', 'c'], files: ['file1'] };
      assert.deepEqual(actual, expectedOutput);
    });
  });
});
