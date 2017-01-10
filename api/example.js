/**
 * -----------------------------------------------------------------------------------
 * Dependencies
 * -----------------------------------------------------------------------------------
 */
const express = require('express');

/**
 * -----------------------------------------------------------------------------------
 * Code
 * -----------------------------------------------------------------------------------
 */
const Example = express.Router();

/// insert your code here (example follows)
/// access this via http://localhost:33337/api/example/hello
Example.use('/:requestParams', (req, res) => {
	const parameters = {
		query: req.query,
		params: req.params,
		body: req.body
	};
	res.json({
		endpoint: `/${req.params.requestParams}`,
		parameters
	});
});

module.exports = Example;
