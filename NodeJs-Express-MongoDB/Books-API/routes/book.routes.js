const express = require('express')
const controller = require('../controllers/book.controller');
const { validateId, validateBody } = require('../middlewares/validation')

const router = express.Router();

router.get('/', controller.getAllBooks)

router.get('/:id', validateId, controller.getBookById)

router.post('/', validateBody, controller.addBook)

router.delete('/:id', validateId, controller.deleteBook)

router.put('/:id', validateId, validateBody, controller.updateBook)

module.exports = router;