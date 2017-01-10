const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const ejs = require('ejs');
const express = require('express');
const path = require('path');

const Api = require('../api');
const Cron = require('../cron');
const { CONST } = require('../config');
const environmentDependentMiddleware = require(`./environment-middleware/${CONST.ENV}`); 
const loggingMechanismMiddleware = require('./logging-mechanism');

Cron.initialize();

const Server = express();
Server.set('views', path.join(CONST.PATH.PROCESS, CONST.PATH.WEBVIEW));
Server.set('view engine', 'htm');
Server.engine('htm', ejs.renderFile); 
Server.use(loggingMechanismMiddleware);
Server.use(environmentDependentMiddleware);
Server.use('/assets', express.static(path.join(CONST.PATH.PROCESS, CONST.PATH.ASSETS)));
Server.use(bodyParser.json());
Server.use(bodyParser.urlencoded({ extended: true }));
Server.use(cookieParser('makesmth4981023992'));
Server.use('/api', Api);
Server.get('/', function(req, res) {
	res.render('index', {
		applicationTitle: CONST.META.DISPLAY_NAME,
		applicationVersion: CONST.META.VERSION,
		webpackBundle: CONST.URL.WEBPACK[CONST.ENV] + CONST.PATH.ASSETS + `/${CONST.PATH.BUNDLE_FILENAME}`
	});
});
Server.use(bodyParser.urlencoded({ extended: true }));

module.exports = Server;
