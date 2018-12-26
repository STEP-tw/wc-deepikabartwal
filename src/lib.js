const countLines = function(content) {
  let lines = content.split('\n');
  let lineCount = lines.length - 1;
  return lineCount;
};

const countWords = function(content) {
  let words = content
    .split('\n')
    .join(' ')
    .split(' ');
  let wordCount = words.filter(element => !element == ' ').length;
  return wordCount;
};

const countBytes = function(content) {
  let characters = content.split('');
  let byteCount = characters.length;
  return byteCount;
};

const formatOutput = function(lineCount, wordCount, byteCount) {
  return '\t' + lineCount + '\t' + wordCount + '\t' + byteCount;
};

const wc = function(fileName, fs) {
  let content = fs.readFileSync(fileName, 'utf-8');
  let lineCount = countLines(content);
  let wordCount = countWords(content);
  let byteCount = countBytes(content);
  return formatOutput(lineCount, wordCount, byteCount) + ' ' + fileName;
};
module.exports = {
  wc
};
