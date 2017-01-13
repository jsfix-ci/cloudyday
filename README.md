# CloudyDay

[![Build Status](https://travis-ci.org/zephinzer/cloudyday.svg?branch=master)](https://travis-ci.org/zephinzer/cloudyday)

A React seeder app for my own convenience so that I can just clone this whenever I need
to test out with some React. Clone it, install dependencies and you're good to go.

## What's Inside

### Server Management

We use ExpressJS for the server.

### UI Tools

ReactStrap and Material UI is included depending on which suits your use case.

ReactStrap URL: https://reactstrap.github.io/
MaterialUI URL: http://www.material-ui.com/

FontAwesome is also included for ease of using icons.

### Code Quality

ESLint is included. Run ESLint test with `npm run test-eslint`.

### Quality Assurance

Mocha, Chai, Enzyme and Karma are used. Nightwatch should be on the way for feature 
testing. Run Mocha tests with `npm run test-mocha`.

### DevOps

Cron scripts allowing for periodic running of scripts are available in `/cron`.

This seeder defines 3 environments: `production`, `test` and `development`. 

## Getting Started

### Project Initialisation
Clone the repository from `git@github.com:zephinzer/cloudyday.git`.

Change package information in `package.json` and `bower.json` for your own product.

Create a repo of your own and change the remote so you'll be pushing to your own 
repository. This can be done with: `git remote remove origin master` followed by 
`git remote add origin <repo-url>`.

### Project Setup

Install all modules using `npm run update`.

To setup the database for development, run `npm run db-setup-dev`. This needs to be 
run the first time to initialise the database.

To tear down the database for development, run `npm run db-teardown-dev`. This is
useful because Sequelize's removal of seeders does not work as expected sometimes. 
When that happens, run this script followed by `npm run db-setup-dev` to restore the 
base state.

To run the application in `production` use `npm start`.

To run the application in `development` use `npm run dev`.

To use Sequelize use `npm run sequelize <SEQUELIZE-CLI-COMMAND HERE>`.
If using additional flags like `--name`, add a `--` prefix to the command so that 
flags can be picked up. Example: `npm run sequelize -- model:create --name NewModelName`

To test the application using Mocha use `npm run test-mocha`.

To check code quality using ESLint use `npm run test-eslint`.

To build the application, run `npm run build`. 

To run all tests, code quality checks and build process use `npm test`.

## Developing on CloudyDay

Assets are stored at `/assets` and is linked statically at the `/assets/**` endpoint.

Configurations are located inside `/config`.

The API is defined at `/api` and is available via the `/api/**` endpoint.

The WebView is defined in `/webview` and consists of the React app entry point.

The Server itself is defined in `/server` and defines pretty much everything above.

Tests are located inside `/test`.

## Contribution Process

Just fork and submit a pull request if you wish documenting what features you added.
Thanks!

## Contributers

Initially written by *zephinzer* and licensed under GPLv3.

## Changelog

### 0.0.4

- Adds in /assets/ext into the .gitignore
- Adds in MySQL for Sequelize 
- Adds in required Redux and Redux-Saga libraries

### 0.0.3

- Adds ReactStrap package and associated dependencies
- Adds Cron script support in folder `/cron` to run cleanup scripts

### 0.0.2

- Adds FontAwesome package to default Bower packages and MaterialUI to Yarn packages
- Adds applicationTitle and applicationVersion to front-end
- Adds seed Sequelize data and associated scripts
- Adding API harvesting feature, files inside `/api` will now automatically map
  to the corresponding filename. For example, the file `/api/example.js` will map to
	the endpoint `/api/example`.
- Removing `/assets/bundle.*` from repository (use `npm run build` to create it)
- Added JSON folder into `/assets` for static drawing of information
- Added proper ESLint rules
- Added ESLint ignore file for bundled assets

### 0.0.1

- Initial commit