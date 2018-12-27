const assert = require('assert');
const { wc } = require('../src/lib.js');
const { NEWLINE, TAB, SPACE, EMPTY } = require('../src/constant.js');
const fs = {};

const dummyFiles = {
  'oneLine.txt': 'this is one line'
};

fs.readFileSync = function(path, encoding) {
  if (encoding != 'utf-8') return;
  const content = dummyFiles[path];
  if (content == undefined) throw 'no such file ' + path;
  return content;
};
fs.existsSync = function(path) {
  if (dummyFiles[path] == undefined) return false;
  return true;
};
describe('wc', () => {
  describe('for default arguments', () => {
    it('should return number of lines, words and bytes in a file for default command', () => {
      let actual = wc(['oneLine.txt'], fs);
      let expectedOutput = '\t0\t4\t16 oneLine.txt';
      assert.equal(actual, expectedOutput);
    });
  });
  describe('for option specified', () => {
    it('should return number of lines in a file when -l is mentioned', () => {
      let actual = wc(['-l', 'oneLine.txt'], fs);
      let expectedOutput = '\t0 oneLine.txt';
      assert.equal(actual, expectedOutput);
    });
    it('should return number of words in a file when -w is mentioned', () => {
      let actual = wc(['-w', 'oneLine.txt'], fs);
      let expectedOutput = '\t4 oneLine.txt';
      assert.equal(actual, expectedOutput);
    });
    it('should return number of bytes in a file when -w is mentioned', () => {
      let actual = wc(['-c', 'oneLine.txt'], fs);
      let expectedOutput = '\t16 oneLine.txt';
      assert.equal(actual, expectedOutput);
    });
  });
});
