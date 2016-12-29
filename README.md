# CloudyDay

A React seeder app for my own convenience so that I can just clone this whenever I need
to test out with some React. Clone it, install dependencies and you're good to go.

## What's Inside

### Code Quality

ESLint is included. Run ESLint test with `npm run eslint`.

### Quality Assurance

Mocha, Chai, Enzyme and Karma are used. Nightwatch should be on the way for feature 
testing. Run Mocha tests with `npm run test`.

### DevOps

This seeder defines 3 environments: `production`, `ciserver` and `development`. 

## Getting Started

Install NPM modules using `yarn install` or `npm install`.

To run the application in `production` use `npm start`.

To run the application in `development` use `npm run dev`.

To use Sequelize use `npm run sequelize <SEQUELIZE-CLI-COMMAND HERE>`.

To test the application using Mocha use `npm run test`.

To check code quality using ESLint use `npm run eslint`.

To run all tests and code quality checks use `npm run verify`.

To build the application, run `npm run build`. 

## Developing on CloudyDay

Assets are stored at `/assets` and is linked statically at the `/assets/**` endpoint.

Configurations are located inside `/config`.

The API is defined at `/api` and is available via the `/api/**` endpoint.

The WebView is defined in `/webview` and consists of the React app entry point.

The Server itself is defined in `/server` and defines pretty much everything above.

Tests are located inside `/test`.

Written by *zephinzer* and licensed under GPLv3.