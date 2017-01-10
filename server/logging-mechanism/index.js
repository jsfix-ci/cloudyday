const morgan = require('morgan');
const path = require('path');
const winston = require('winston');

const { CONST } = require('../../config');


const transports = [
	new winston.transports.File({
		level: 'debug',
		filename: path.join(CONST.PATH.PROCESS, CONST.PATH.LOGS, `/${CONST.META.NAME}.${CONST.META.VERSION}.debug.log`),
		handleExceptions: true,
		json: false,
		maxSize: 1024 * 1024 * 10,
		maxFiles: 100,
		colorize: false
	}),
	new winston.transports.Console({
		level: 'debug',
		handleExceptions: true,
		json: false,
		colorize: true
	})
];
const exitOnError = false;

const LoggingMechanism = new winston.Logger({
	transports, exitOnError
});
LoggingMechanism.stream = {
	write: (message, encoding) => {
		(CONST.ENV === 'development') && LoggingMechanism.info(message);
	}
};

module.exports = morgan(
	((CONST.ENV !== 'development') ? 'combined' : 'common'), { 
		stream: LoggingMechanism.stream
	}
);
