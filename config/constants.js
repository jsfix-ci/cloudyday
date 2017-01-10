const fs = require('fs');
const path = require('path');
const packageDetails = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json')).toString());

const CONST = 	{};
CONST.ENV = 		process.env.NODE_ENV || 'development';
CONST.META = 		{
									/**
									 * Retrieves package displayName from package.json
									 **/
									DISPLAY_NAME: packageDetails.displayName,
									/**
									 * Retrieves package name from package.json
									 **/
									NAME: packageDetails.name,
									/**
									 * Retrieves package version from package.json
									 **/
									VERSION: packageDetails.version
								};
CONST.PATH = 		{
									/**
									 * Path to Webpack bundle file & all other assets
									 **/
									ASSETS: '/assets',
									/**
									 * Name of Webpack bundle file 
									 **/
									BUNDLE_FILENAME: 'bundle.js',
									/**
									 * The directory relative to the process root where logs will be stored 
									 **/
									LOGS: '/logs',
									/**
									 * Sets the process directory
									 **/
									PROCESS: process.cwd(),
									/**
									 * Relative path to directory containing server
									 **/
									SERVER: '/server',
									/**
									 * Relative path to web view directory
									 **/
									WEBVIEW: '/webview'
								};
CONST.PORT = 		{
									/**
									 * Sets the application port
									 **/
									APPLICATION: process.env.PORT || 33337,
									/**
									 * Sets the webpack port
									 **/
									WEBPACK: process.env.WEBPACK_PORT || 33336
								};
CONST.URL = 		{
									/**
									 * Base URLs for the application
									 **/
									APPLICATION: {
										production: `http://localhost:${CONST.PORT.APPLICATION}`,
										test: `http://localhost:${CONST.PORT.APPLICATION}`,
										development: `http://localhost:${CONST.PORT.APPLICATION}`
									},
									/**
									 * Base URLs for the webpack bundle file
									 **/
									WEBPACK: {
										production: `http://localhost:${CONST.PORT.APPLICATION}`,
										test: `http://localhost:${CONST.PORT.WEBPACK}`,
										development: `http://localhost:${CONST.PORT.WEBPACK}`
									}
								};

module.exports = CONST;
