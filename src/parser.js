const { defaultFormatter, singleOptionFormatter } = require('./formatter.js');

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
module.exports = {
  parseArgs
};
