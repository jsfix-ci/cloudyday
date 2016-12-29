const CONST = require('./constants');

function DevServer() {
	return DevServer.data[CONST.ENV];
};
DevServer.data = {
	production: null,
	ciserver: null,
	development: {
		contentBase: `.${CONST.PATH.ASSETS}`,
		headers: { "Access-Control-Allow-Origin": `${CONST.URL.APPLICATION[CONST.ENV]}` },
		hot: true,
		inline: true,
		lazy: false,
		noInfo: true,
		quiet: false,
		publicPath: `${CONST.URL.WEBPACK[CONST.ENV]}${CONST.PATH.ASSETS}`,
	}
};

module.exports = DevServer();