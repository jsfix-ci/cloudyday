const path = require('path');

const CONST = require('./constants');

function Entry() {
	return Entry.data[CONST.ENV];
};

Entry.data = {
	production: [
		path.join(CONST.PATH.PROCESS, CONST.PATH.WEBVIEW)
	],
	ciserver: [
		path.join(CONST.PATH.PROCESS, CONST.PATH.WEBVIEW)
	],
	development: [
		`webpack-hot-middleware/client?path=${CONST.URL.WEBPACK[CONST.ENV]}/__webpack_hmr`,
		path.join(CONST.PATH.PROCESS, CONST.PATH.WEBVIEW)
	]
};

module.exports = Entry();