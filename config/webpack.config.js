const devServer = require('./webpack.dev-server.config');
const devtool = require('./webpack.devtool.config');
const entry = require('./webpack.entry.config');
const loaders = require('./webpack.loaders.config');
const output = require('./webpack.output.config');
const plugins = require('./webpack.plugins.config');

module.exports = {
	production: function() {
		return {
			devtool,
			entry,
			module: { loaders },
			output,
			plugins
		};
	},
	ciserver: function() {
		return {
			devtool,
			entry,
			module: { loaders },
			output,
			plugins
		};
	},
	development: function() {
		return {
			devServer,
			entry,
			module: { loaders },
			output,
			plugins
		};
	}
};