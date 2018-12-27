const { TAB, SPACE } = require('./constant.js');

const defaultFormatter = function(countDetails, fileName) {
  let { lineCount, wordCount, byteCount } = countDetails;
  outputList = ['', lineCount, wordCount, byteCount];
  return outputList.join(TAB) + SPACE + fileName;
};

const singleOptionFormatter = function(count, fileName) {
  outputList = ['', count].join(TAB);
  return [outputList, fileName].join(SPACE);
};

module.exports = {
  defaultFormatter,
  singleOptionFormatter
};
