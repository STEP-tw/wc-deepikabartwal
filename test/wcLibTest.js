const assert = require('assert');
const { wc } = require('../src/lib.js');

const fs = {};

const dummyFiles = {
  'oneLine.txt': 'this is one line\n'
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
  it('should return number of lines, words and bytes in a file for default command', () => {
    let actual = wc('oneLine.txt', fs);
    let expectedOutput = '\t1\t4\t17 oneLine.txt';
    assert.equal(actual, expectedOutput);
  });
});
