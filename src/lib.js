const { NEWLINE, SPACE, TAB, EMPTY } = require('./constant.js');

const splitContent = function(delimiter, content) {
  return content.split(delimiter);
};

const fetchWords = splitContent.bind(null, /[ \n]+/);
const fetchLines = splitContent.bind(null, NEWLINE);
const fetchBytes = splitContent.bind(null, EMPTY);

const countLines = function(content) {
  return fetchLines(content).length - 1;
};

const countWords = function(content) {
  return fetchWords(content).length;
};

const countBytes = function(content) {
  return fetchBytes(content).length;
};

const getAllCounts = function(content) {
  let lineCount = countLines(content);
  let wordCount = countWords(content);
  let byteCount = countBytes(content);
  return { lineCount, wordCount, byteCount };
};

const defaultFormatter = function(countDetails, fileName) {
  let { lineCount, wordCount, byteCount } = countDetails;
  outputList = ['', lineCount, wordCount, byteCount];
  return outputList.join(TAB) + SPACE + fileName;
};

const beginsWithDash = function(arg) {
  return arg.startsWith('-');
};

const singleOptionFormatter = function(count, fileName) {
  outputList = ['', count].join(TAB);
  return [outputList, fileName].join(SPACE);
};
const parseArgs = function(args) {
  const firstArg = args[0];
  let option = 'all';
  let formatter = defaultFormatter;
  let fileName = args[0];
  if (beginsWithDash(firstArg)) {
    option = firstArg;
    formatter = singleOptionFormatter;
    fileName = args[1];
  }
  return { option, formatter, fileName };
};

const getCounter = function(type) {
  const counters = {
    all: getAllCounts,
    '-l': countLines,
    '-w': countWords,
    '-c': countBytes
  };
  return counters[type];
};

const wc = function(args, fs) {
  let { option, formatter, fileName } = parseArgs(args);
  let content = fs.readFileSync(fileName, 'utf-8');
  let counter = getCounter(option);
  let result = counter(content);
  return formatter(result, fileName);
};

module.exports = {
  wc
};
