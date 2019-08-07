/**
 * @module countries
 */

const express = require('express');
const router = express.Router();

const createOperation = require('./create');
const readListOperation = require('./readList');
const readItemOperation = require('./readItem');
const updateOperation = require('./update');
const deleteOperation = require('./delete');

router.post('/', createOperation);
router.get('/', readListOperation);
router.get('/:name', readItemOperation);
router.put('/:name', updateOperation);
router.delete('/:name', deleteOperation);

module.exports = router;