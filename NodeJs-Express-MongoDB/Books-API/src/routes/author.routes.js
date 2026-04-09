const express = require('express');
const controller = require('../controllers/author.controller');

const router = express.Router();

router.get('/', controller.getAllAuthorsAsync);

module.exports = router;