const packageDetails = require('../package.json');
const {expect} = require('chai');

const packages = {
	npm: require('../package.json'),
	bower: require('../bower.json')
};

describe(`${packageDetails.name} v${packageDetails.version}`, () => {
	context('is', () => {
		it('a seeder application for a React app', () => {
			expect(packages.npm.dependencies['react']).to.not.be.undefined;
		});
		it('dependent on Node v6.9.2 LTS', () => {
			expect(packages.npm.engines['node']).to.equal('6.9.2');
		});
		it('written by zephinzer out of frustration at the hassle needed to setup a React app', () => {
			expect(packages.npm.contributors[0].name).to.contain('zephinzer');
			expect(packages.bower.authors[0]).to.contain('zephinzer');
		});
		it('licensed under the GPLv3 license', () => {
			expect(packages.npm.license).to.equal('GPL-3.0');
		});
	});
	context('can', () => {
		it('be found at https://github.com/zephinzer/cloudyday', () => {
			expect(packages.npm.repository.url).to.equal('https://github.com/zephinzer/cloudyday');
		});
		it('be cloned by running `git clone git@github.com:zephinzer/cloudyday.git .`', () => {
			expect(packages.npm.repository.type).to.equal('git');
		});
	});
	context('which includes utility tools using', () => {
		it('MomentJS for handling of time/dates', () => {
			expect(packages.npm.dependencies['moment']).to.not.be.undefined;
			expect((() => { require('moment'); })()).to.not.throw;
		});
	});
	context('which includes back-end server tools using', () => {
		it('ExpressJS for handling of routes/controllers', () => {
			expect(packages.npm.dependencies['express']).to.not.be.undefined;
			expect((() => { require('express'); })()).to.not.throw;
		});
		it('BodyParser for parsing of data from HTTP request body', () => {
			expect(packages.npm.dependencies['body-parser']).to.not.be.undefined;
			expect((() => { require('body-parser'); })()).to.not.throw;
		});
		it('CookieParser for parsing of cookies from HTTP request', () => {
			expect(packages.npm.dependencies['cookie-parser']).to.not.be.undefined;
			expect((() => { require('cookie-parser'); })()).to.not.throw;
		});
		it('Embedded JavaScript (EJS) for rendering of base page to inject server-side elements', () => {
			expect(packages.npm.dependencies['ejs']).to.not.be.undefined;
			expect((() => { require('ejs'); })()).to.not.throw;
		});
		it('JSON Web Tokens for REST API authentication', () => {
			expect(packages.npm.dependencies['jsonwebtoken']).to.not.be.undefined;
			expect((() => { require('jsonwebtoken'); })()).to.not.throw;
		});
	});
	context('which includes UI tools using', () => {
		it('React for the front-end UI', () => {
			expect(packages.npm.dependencies['react-dom']).to.not.be.undefined;
		});
		it('React-Router for the front-end routing', () => {
			expect(packages.npm.dependencies['react-router']).to.not.be.undefined;
		});
		it('React-Redux with Redux-Saga for front-end data management', () => {
			expect(packages.npm.dependencies['redux']).to.not.be.undefined;
			expect(packages.npm.dependencies['react-redux']).to.not.be.undefined;
			expect(packages.npm.dependencies['redux-saga']).to.not.be.undefined;
		});
		it('FontAwesome for easy icon insertion', () => {
			expect(packages.bower.dependencies['font-awesome']).to.not.be.undefined;
		});
		it('React transition groups for doing animations', () => {
			expect(packages.npm.dependencies['react-addons-transition-group']).to.not.be.undefined;
			expect(packages.npm.dependencies['react-addons-css-transition-group']).to.not.be.undefined;
		});
		it('Material UI for easy prototyping using pre-made React components', () => {
			expect(packages.npm.dependencies['material-ui']).to.not.be.undefined;
			expect(packages.npm.dependencies['react-tap-event-plugin']).to.not.be.undefined;
		});
		it('Reactstrap for an alternative to easy prototyping using pre-made React components', () => {
			expect(packages.npm.dependencies['reactstrap']).to.not.be.undefined;
		});
	});
	context('which includes quality assurance tools and we', () => {
		it('use ESLint for JavaScript code management', () => {
			expect(packages.npm.dependencies['eslint']).to.not.be.undefined;
			expect(packages.npm.dependencies['eslint-plugin-react']).to.not.be.undefined;
		});
		it('use Mocha (with Chai) for running back-end unit tests on application', () => {
			expect(packages.npm.dependencies['mocha']).to.not.be.undefined;
			expect(packages.npm.dependencies['chai']).to.not.be.undefined;
			expect((() => { require('mocha'); })()).to.not.throw;
			expect((() => { require('chai'); })()).to.not.throw;
		});
		it('use Karma to run front-end unit tests on application', () => {
			expect(packages.npm.dependencies['karma']).to.not.be.undefined;
			expect((() => { require('karma'); })()).to.not.throw;
		});
		it('use Enzyme to perform unit tests on React components', () => {
			expect(packages.npm.dependencies['enzyme']).to.not.be.undefined;
			expect((() => { require('enzyme'); })()).to.not.throw;
		});
	});
	context('which includes devops tools and we', () => {
		it('use Cron for running of cleanup scripts', () => {
			expect(packages.npm.dependencies['cron']).to.not.be.undefined;
			expect((() => { require('cron'); })()).to.not.throw;
		});
		it('use Morgan + Winston for handling of logging', () => {
			expect(packages.npm.dependencies['morgan']).to.not.be.undefined;
			expect((() => { require('morgan'); })()).to.not.throw;
			expect(packages.npm.dependencies['winston']).to.not.be.undefined;
			expect((() => { require('winston'); })()).to.not.throw;
			
		});
		it('use Sequelize (and Sequelize CLI) for database schema versioning/management', () => {
			expect(packages.npm.dependencies['sequelize']).to.not.be.undefined;
			expect(packages.npm.dependencies['sequelize-cli']).to.not.be.undefined;
			expect((() => { require('sequelize'); })()).to.not.throw;
		});
		it('use MySQL as the SQL dialect to use with Sequelize', () => {
			expect(packages.npm.dependencies['mysql']).to.not.be.undefined;
			expect((() => { require('mysql'); })()).to.not.throw;
		})
		it('use Babel for transpiliation of ES6 code to ES5', () => {
			expect(packages.npm.dependencies['babel-core']).to.not.be.undefined;
			expect(packages.npm.dependencies['babel-loader']).to.not.be.undefined;
			expect(packages.npm.dependencies['babel-preset-es2015']).to.not.be.undefined;
			expect(packages.npm.dependencies['babel-preset-react']).to.not.be.undefined;
		});
		it('use React\'s Hot Module Replacement to ease hassles during development', () => {
			expect(packages.npm.dependencies['babel-preset-react-hmre']).to.not.be.undefined;
			expect(packages.npm.dependencies['webpack-hot-middleware']).to.not.be.undefined;
			expect(packages.npm.dependencies['webpack-dev-middleware']).to.not.be.undefined;
		});
		it('use Webpack to build your React application', () => {
			expect(packages.npm.dependencies['webpack']).to.not.be.undefined;
			expect((() => { require('webpack'); })()).to.not.throw;
		});
	});
	context('has convenience npm commands like', () => {
		it('npm run build       : runs a webpack build', () => {
			expect(packages.npm.scripts['build']).to.not.be.undefined;
		});
		it('npm run dev         : starts application in `development` environment', () => {
			expect(packages.npm.scripts['dev']).to.not.be.undefined;
		});
		it('npm run migrate     : runs Sequelize migration for all migrations in /migrations', () => {
			expect(packages.npm.scripts['migrate']).to.not.be.undefined;
		});
		it('npm run postinstall : runs post-install scripts', () => {
			expect(packages.npm.scripts['postinstall']).to.not.be.undefined;
		});
		it('npm run preinstall  : runs pre-install scripts', () => {
			expect(packages.npm.scripts['preinstall']).to.not.be.undefined;
		});
		it('npm run seed        : runs all Sequelize seeders in /seeders', () => {
			expect(packages.npm.scripts['seed']).to.not.be.undefined;
		});
		it('npm run sequelize   : runs Sequelize-CLI commands using ./config/sequelize.config.js', () => {
			expect(packages.npm.scripts['sequelize']).to.not.be.undefined;
		});
		it('npm start           : starts application in `production` environment', () => {
			expect(packages.npm.scripts['start']).to.not.be.undefined;
		});
		it('npm run test-eslint : runs ESLint on *.js', () => {
			expect(packages.npm.scripts['test-eslint']).to.not.be.undefined;
		});
		it('npm run test-mocha  : runs all Mocha tests in ./test', () => {
			expect(packages.npm.scripts['test-mocha']).to.not.be.undefined;
		});
		it('npm run unmigrate   : reverses most recent Sequelize migration in /migrations', () => {
			expect(packages.npm.scripts['unmigrate']).to.not.be.undefined;
		});
		it('npm run unseed      : reverses all Sequelize seeds in /seeders', () => {
			expect(packages.npm.scripts['unseed']).to.not.be.undefined;
		});
		it('npm run update      : installs bower and npm dependencies', () => {
			expect(packages.npm.scripts['update']).to.not.be.undefined;
		});
		it('npm test            : runs all Mocha and ESLint tests', () => {
			expect(packages.npm.scripts['test']).to.not.be.undefined;
		});
	});
	context('will someday... (roadmap)', () => {
		it('be using Bootstrap 4 when FlexBox is a base feature');
		it('be able to run feature tests (Nightwatch)');
		it('be able to run indefinitely using a process manager (PM2)');
	});
});
