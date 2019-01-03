const { NEWLINE, EMPTYSTRING } = require('./constant.js');
const { parseArgs } = require('./parser.js');
const splitContent = require('./util.js').splitContent;
const { formatCountList } = require('./formatter.js');

const countWords = content => fetchWords(content).filter(word => word).length;

const fetchWords = splitContent.bind(null, /[ \n]+/);
const fetchLines = splitContent.bind(null, NEWLINE);
const fetchBytes = splitContent.bind(null, EMPTYSTRING);

const countLines = function(content) {
	return fetchLines(content).length - 1;
};

const countBytes = function(content) {
	return fetchBytes(content).length;
};

const getRequiredCounts = function(fs, options) {
	return function(file) {
		let content = fs.readFileSync(file, 'utf-8');
		let countList = [''];
		if (options.includes('l')) {
			countList.push(countLines(content));
		}
		if (options.includes('w')) {
			countList.push(countWords(content));
		}
		if (options.includes('c')) {
			countList.push(countBytes(content));
		}
		countList.push(file);

		return countList;
	};
};

const getTotalCount = function(list1, list2) {
	let totalCountList = [''];
	for (let index = 1; index < list1.length - 1; index++) {
		totalCountList[index] = list1[index] + list2[index];
	}
	return totalCountList;
};

const wc = function(args, fs) {
	let { files, options } = parseArgs(args);
	let getCounts = getRequiredCounts(fs, options);
	let countList = files.map(getCounts);
	if (files.length > 1) {
		let total = countList.reduce(getTotalCount);
		total.push('total');
		countList.push(total);
	}
	return formatCountList(countList);
};

module.exports = {
	wc
};
