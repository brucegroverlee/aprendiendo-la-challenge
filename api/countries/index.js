/**
 * @module countries
 */

const express = require('express');
const router = express.Router();

const createOperation = require('./create');

router.post('/', createOperation);

module.exports = router;