/**
 * @module countries
 */

const express = require('express');
const router = express.Router();

const createOperation = require('./create');
const updateOperation = require('./update');
const deleteOperation = require('./delete');

router.post('/', createOperation);
router.put('/:name', updateOperation);
router.delete('/:name', deleteOperation);

module.exports = router;