/**
 * -----------------------------------------------------------------------------------
 * Root of Application
 * -----------------------------------------------------------------------------------
 */
const http = require('http');
const { CONST } = require('./config');
const server = require(`.${CONST.PATH.SERVER}`);

http.createServer(server).listen(CONST.PORT.APPLICATION);
