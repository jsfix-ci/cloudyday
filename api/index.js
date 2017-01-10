/**
 * -----------------------------------------------------------------------------------
 * Dependencies
 * -----------------------------------------------------------------------------------
 */
const express = require('express');

const utility = require('./.utility');

/**
 * -----------------------------------------------------------------------------------
 * Code
 * -----------------------------------------------------------------------------------
 */
const API = express.Router();

/// [BEGIN] get all possible endpoints within /api folder and use them as endpoints
utility.harvestEndpoints(__dirname, __filename, API);
/// [ENDOF] get all possible endpoints within /api folder and use them as endpoints

module.exports = API;
