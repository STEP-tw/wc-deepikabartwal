const { NEWLINE, SPACE, TAB, EMPTY } = require('./constant.js');
const { defaultFormatter, singleOptionFormatter } = require('./formatter.js');

const splitContent = function(delimiter, content) {
  return content.split(delimiter);
};
const countWords = content => fetchWords(content).filter(word => word).length;

const fetchWords = splitContent.bind(null, /[ \n]+/);
const fetchLines = splitContent.bind(null, NEWLINE);
const fetchBytes = splitContent.bind(null, EMPTY);

const countLines = function(content) {
  return fetchLines(content).length - 1;
};

const isNotSpace = element => element != ' ';

const countBytes = function(content) {
  return fetchBytes(content).length;
};

const getAllCounts = function(content) {
  let lineCount = countLines(content);
  let wordCount = countWords(content);
  let byteCount = countBytes(content);
  return { lineCount, wordCount, byteCount };
};

const beginsWithDash = function(arg) {
  return arg.startsWith('-');
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
