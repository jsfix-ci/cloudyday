const CONST = require('./constants');

function Loaders() {
	return Loaders.data[CONST.ENV];
};

Loaders.data = {
	production: [
		{
			test: /\.js$/,
			exclude: /node_modules/,
			loaders: ['babel?presets[]=es2015,presets[]=react'],
		},
		{
			test: /\.css$/,
			loaders: ['style', 'css']
		}
	],
	ciserver: [
		{
			test: /\.js$/,
			exclude: /node_modules/,
			loaders: ['babel?presets[]=es2015,presets[]=react'],
		},
		{
			test: /\.css$/,
			loaders: ['style', 'css']
		}
	],
	development: [
		{
			test: /\.js$/,
			exclude: /node_modules/,
			loaders: ['babel?presets[]=es2015,presets[]=react,presets[]=react-hmre'],
		},
		{
			test: /\.css$/,
			loaders: ['style', 'css']
		}
	]
};

module.exports = Loaders();