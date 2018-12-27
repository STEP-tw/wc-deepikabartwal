const { NEWLINE, SPACE, TAB, EMPTY } = require('./constant.js');
const { parseArgs } = require('./parser.js');
const splitContent = require('./util.js').splitContent;

const countWords = content => fetchWords(content).filter(word => word).length;

const fetchWords = splitContent.bind(null, /[ \n]+/);
const fetchLines = splitContent.bind(null, NEWLINE);
const fetchBytes = splitContent.bind(null, EMPTY);

const countLines = function(content) {
  return fetchLines(content).length - 1;
};

const countBytes = function(content) {
  return fetchBytes(content).length;
};

const wc = function(args, fs) {
  let { files, options } = parseArgs(args);
  let content = fs.readFileSync(files[0], 'utf-8');
  let countList = [];
  if (options.includes('l')) {
    countList.push(countLines(content));
  }
  if (options.includes('w')) {
    countList.push(countWords(content));
  }
  if (options.includes('c')) {
    countList.push(countBytes(content));
  }
  countList.push(files[0]);
  return countList.join('\t');
};

module.exports = {
  wc
};
