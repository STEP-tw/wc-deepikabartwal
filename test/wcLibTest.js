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
      let expectedOutput = ['', '0', '4', '16', 'oneLine.txt'].join(TAB);
      assert.equal(actual, expectedOutput);
    });
  });
  describe('for option specified', () => {
    it('should return number of lines in a file when -l is mentioned', () => {
      let actual = wc(['-l', 'oneLine.txt'], fs);
      let expectedOutput = ['', '0', 'oneLine.txt'].join(TAB);
      assert.equal(actual, expectedOutput);
    });
    it('should return number of words in a file when -w is mentioned', () => {
      let actual = wc(['-w', 'oneLine.txt'], fs);
      let expectedOutput = ['', '4', 'oneLine.txt'].join(TAB);
      assert.equal(actual, expectedOutput);
    });
    it('should return number of bytes in a file when -w is mentioned', () => {
      let actual = wc(['-c', 'oneLine.txt'], fs);
      let expectedOutput = ['', '16', 'oneLine.txt'].join(TAB);
      assert.equal(actual, expectedOutput);
    });
  });
  describe('for two option specified together for argument', () => {
    it('should count lines and words when -lw is specified', () => {
      let actual = wc(['-lw', 'oneLine.txt'], fs);
      let expectedOutput = ['', '0', '4', 'oneLine.txt'].join(TAB);
      assert.equal(actual, expectedOutput);
    });
    it('should count lines and words when -wl is specified', () => {
      let actual = wc(['-wl', 'oneLine.txt'], fs);
      let expectedOutput = ['', '0', '4', 'oneLine.txt'].join(TAB);
      assert.equal(actual, expectedOutput);
    });
    it('should count lines and bytes when -lc is specified', () => {
      let actual = wc(['-lc', 'oneLine.txt'], fs);
      let expectedOutput = ['', '0', '16', 'oneLine.txt'].join(TAB);
      assert.equal(actual, expectedOutput);
    });
    it('should count lines and bytes when -cl is specified', () => {
      let actual = wc(['-cl', 'oneLine.txt'], fs);
      let expectedOutput = ['', '0', '16', 'oneLine.txt'].join(TAB);
      assert.equal(actual, expectedOutput);
    });
    it('should count words and bytes when -wc is specified', () => {
      let actual = wc(['-wc', 'oneLine.txt'], fs);
      let expectedOutput = ['', '4', '16', 'oneLine.txt'].join(TAB);
      assert.equal(actual, expectedOutput);
    });
    it('should count words and bytes when -cw is specified', () => {
      let actual = wc(['-cw', 'oneLine.txt'], fs);
      let expectedOutput = ['', '4', '16', 'oneLine.txt'].join(TAB);
      assert.equal(actual, expectedOutput);
    });
    it('should count words, lines and bytes when -lcw is specified', () => {
      let actual = wc(['-lcw', 'oneLine.txt'], fs);
      let expectedOutput = ['', '0', '4', '16', 'oneLine.txt'].join(TAB);
      assert.equal(actual, expectedOutput);
    });
    it('should count words, lines and bytes when -lwc is specified', () => {
      let actual = wc(['-lwc', 'oneLine.txt'], fs);
      let expectedOutput = ['', '0', '4', '16', 'oneLine.txt'].join(TAB);
      assert.equal(actual, expectedOutput);
    });
    it('should count words, lines and bytes when -clw is specified', () => {
      let actual = wc(['-clw', 'oneLine.txt'], fs);
      let expectedOutput = ['', '0', '4', '16', 'oneLine.txt'].join(TAB);
      assert.equal(actual, expectedOutput);
    });
    it('should count words, lines and bytes when -cwl is specified', () => {
      let actual = wc(['-cwl', 'oneLine.txt'], fs);
      let expectedOutput = ['', '0', '4', '16', 'oneLine.txt'].join(TAB);
      assert.equal(actual, expectedOutput);
    });
    it('should count words, lines and bytes when -wlc is specified', () => {
      let actual = wc(['-wlc', 'oneLine.txt'], fs);
      let expectedOutput = ['', '0', '4', '16', 'oneLine.txt'].join(TAB);
      assert.equal(actual, expectedOutput);
    });
    it('should count words, lines and bytes when -wcl is specified', () => {
      let actual = wc(['-wcl', 'oneLine.txt'], fs);
      let expectedOutput = ['', '0', '4', '16', 'oneLine.txt'].join(TAB);
      assert.equal(actual, expectedOutput);
    });

    it('should count lines and words when -l -w is specified', () => {
      let actual = wc(['-l', '-w', 'oneLine.txt'], fs);
      let expectedOutput = ['', '0', '4', 'oneLine.txt'].join(TAB);
      assert.equal(actual, expectedOutput);
    });
    it('should count lines and words when -w -l is specified', () => {
      let actual = wc(['-w', '-l', 'oneLine.txt'], fs);
      let expectedOutput = ['', '0', '4', 'oneLine.txt'].join(TAB);
      assert.equal(actual, expectedOutput);
    });
    it('should count lines and bytes when -l -c is specified', () => {
      let actual = wc(['-l', '-c', 'oneLine.txt'], fs);
      let expectedOutput = ['', '0', '16', 'oneLine.txt'].join(TAB);
      assert.equal(actual, expectedOutput);
    });
    it('should count lines and bytes when -c -l is specified', () => {
      let actual = wc(['-c', '-l', 'oneLine.txt'], fs);
      let expectedOutput = ['', '0', '16', 'oneLine.txt'].join(TAB);
      assert.equal(actual, expectedOutput);
    });
    it('should count words and bytes when -w -c is specified', () => {
      let actual = wc(['-w', '-c', 'oneLine.txt'], fs);
      let expectedOutput = ['', '4', '16', 'oneLine.txt'].join(TAB);
      assert.equal(actual, expectedOutput);
    });
    it('should count words and bytes when -c -w is specified', () => {
      let actual = wc(['-c', '-w', 'oneLine.txt'], fs);
      let expectedOutput = ['', '4', '16', 'oneLine.txt'].join(TAB);
      assert.equal(actual, expectedOutput);
    });
  });
});
