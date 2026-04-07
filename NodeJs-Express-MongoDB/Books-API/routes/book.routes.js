const express = require('express')
const controller = require('../controllers/book.controller');
const router = express.Router();

router.get('/', controller.getAllBooks)

router.get('/:id', controller.getBookById)

router.post('/', controller.addBook)

router.delete('/:id', controller.deleteBook)

router.put('/:id', controller.updateBook)

module.exports = router;