const { TAB, SPACE, NEWLINE } = require('./constant.js');

const joinByTab = function(list) {
  return list.join(TAB);
};

const joinByNewline = function(list) {
  return list.join(NEWLINE);
};

const formatCountList = function(countList) {
  return joinByNewline(countList.map(joinByTab));
};

module.exports = {
  formatCountList
};
