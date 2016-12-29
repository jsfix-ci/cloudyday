/**
 * -----------------------------------------------------------------------------------
 * Dependencies
 * -----------------------------------------------------------------------------------
 */
const {CONST} = require('../../config');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

/**
 * -----------------------------------------------------------------------------------
 * Configurations
 * -----------------------------------------------------------------------------------
 */
const webpackConfiguration = require('../../config/webpack.config')[CONST.ENV]();
const webpackCompiler = webpack(webpackConfiguration);

/**
 * -----------------------------------------------------------------------------------
 * Webpack Server
 * -----------------------------------------------------------------------------------
 */
const webpackServer = express();
webpackServer.use(webpackDevMiddleware(webpackCompiler, webpackConfiguration.devServer));
webpackServer.use(webpackHotMiddleware(webpackCompiler));
webpackServer.listen(CONST.PORT.WEBPACK);

/**
 * -----------------------------------------------------------------------------------
 * Development Server
 * -----------------------------------------------------------------------------------
 */
const DevelopmentMiddleware = express.Router();

module.exports = DevelopmentMiddleware;