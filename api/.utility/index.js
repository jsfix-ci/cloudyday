/**
 * -----------------------------------------------------------------------------------
 * Dependencies
 * -----------------------------------------------------------------------------------
 */
const fs = require('fs');
const path = require('path');

/**
 * -----------------------------------------------------------------------------------
 * Code
 * -----------------------------------------------------------------------------------
 */

function harvestEndpoints(originDirectoryPath, originFilePath, expressRouterInstance) {
	console.log('!', originDirectoryPath, originFilePath);
	const directoryListing = fs.readdirSync(originDirectoryPath);
	const originFilename = originFilePath.substr(originDirectoryPath.length + 1);
	console.info('API Harvesting');
	directoryListing.forEach(fileListing => {
		const notSystemFolder = (fileListing.match(/^\./) === null);
		const notThisFile = (fileListing !== originFilename);
		(notSystemFolder && notThisFile) ? (() => {
			process.stdout.write(`\tProcessing listing: /${fileListing}... `);
				const endpoint = fileListing.substr(0, fileListing.lastIndexOf('.js'));
				try {
					expressRouterInstance.use(
						`/${endpoint}`, 
						require(path.join(originDirectoryPath, `/${endpoint}`))
					);
					console.log(`Added endpoint: /${endpoint}`);
				} catch(ex) {
					console.log(`Endpoint: /${endpoint} could not be imported.`);
					console.error(ex);
				}
		})() : (() => {});
	});
};

module.exports = {
	harvestEndpoints
};