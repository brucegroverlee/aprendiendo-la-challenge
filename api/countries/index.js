/**
 * @module countries
 */

const express = require('express');
const router = express.Router();

const createOperation = require('./create');
const deleteOperation = require('./delete');

router.post('/', createOperation);
router.delete('/:name', deleteOperation);

module.exports = router;