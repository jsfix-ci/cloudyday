const path = require('path');

const CONST = require('./constants');

function Output() {
	return Output.data[CONST.ENV];
};

Output.data = {
	production: {
		filename: CONST.PATH.BUNDLE_FILENAME,
		path: path.join(CONST.PATH.PROCESS, CONST.PATH.ASSETS)
	},
	test: {
		filename: CONST.PATH.BUNDLE_FILENAME,
		path: path.join(CONST.PATH.PROCESS, CONST.PATH.ASSETS)
	},
	development: {
		filename: CONST.PATH.BUNDLE_FILENAME,
		path: path.join(CONST.PATH.PROCESS, CONST.PATH.ASSETS),
		publicPath: `${CONST.URL.WEBPACK[CONST.ENV]}${CONST.PATH.ASSETS}/`
	}
};

module.exports = Output();
