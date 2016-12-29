const CONST = require('./constants');

function Devtool() {
	return Devtool.data[CONST.ENV];
}

Devtool.data = {
	production: 'source-map',
	ciserver: 'source-map',
	development: null
};

module.exports = Devtool();