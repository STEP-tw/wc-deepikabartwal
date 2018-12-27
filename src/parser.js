const removeHyphen = function(args) {
  return args.slice(1);
};
const beginsWithDash = function(arg) {
  return arg.startsWith('-');
};

const notBeginsWithDash = function(arg) {
  return !arg.startsWith('-');
};
const parseArgs = function(args) {
  let options = args.filter(beginsWithDash);
  let files = args.filter(notBeginsWithDash);
  let optionList = options
    .map(removeHyphen)
    .join('')
    .split('');

  if (options.length == 0) {
    return { files: files, options: ['l', 'w', 'c'] };
  }
  return { files: files, options: optionList };
};
module.exports = {
  parseArgs
};
