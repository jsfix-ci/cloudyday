const packageDetails = require('../package.json');
const {expect} = require('chai');

describe(`${packageDetails.name} v${packageDetails.version}`, () => {
	context('is', () => {
		it('a seeder application for a React app');
		it('written by zephinzer out of frustration at the hassle needed to setup a React app');
	});
	context('which includes quality assurance tools and we', () => {
		it('use ESLint for JavaScript code management');
		it('use Mocha (with Chai) for running back-end unit tests on application');
		it('use Karma to run front-end unit tests on application');
		it('use Enzyme to perform unit tests on React components');
	});
	context('which includes devops tools and we', () => {
		it('use Sequelize for database schema versioning/management');
		it('use React\'s Hot Module Replacement to ease hassles during development');
		it('use Webpack to build your React application');
	});
	context('has convenience npm commands like', () => {
		it('npm start         : starts application in `production` environment');
		it('npm run dev       : starts application in `development` environment');
		it('npm run sequelize : runs Sequelize-CLI commands using ./config/sequelize.config.json');
		it('npm run test      : runs all Mocha tests in ./test');
		it('npm run eslint    : runs ESLint on *.js');
		it('npm run verify    : runs all Mocha and ESLint tests');
		it('npm run build     : runs a webpack build');
	});
	context('will someday... (roadmap)', () => {
		it('be able to run feature tests (Nightwatch)');
		it('be able to run indefinitely using a process manager (PM2)');
	});
});