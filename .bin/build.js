const moment = require('moment');
const webpack = require('webpack');

const { CONST } = require('../config');

const webpackConfiguration = require('../config/webpack.config')[CONST.ENV]();
const webpackCompiler = webpack(webpackConfiguration);
const packageDetails = require('../package.json');
const now = (new Date()).getTime();
console.info(`Build process for ${packageDetails.name} v${packageDetails.version} started...`);
webpackCompiler.run((err, result) => {
	const then = (new Date()).getTime();
	const timing = then - now;
	var seconds = timing / 1000;
	console[err ? 'error' : 'info'](`Webpack compilation ${err ? 'FAILED' : 'SUCCEEDED'} in ${seconds} seconds.`);
	if(!err) { console.info(`Output file located at: ${webpackConfiguration.output.path}/${webpackConfiguration.output.filename}`); }
});

