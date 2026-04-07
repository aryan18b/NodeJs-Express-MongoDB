const express = require('express')
const controller = require('../controllers/book.controller');
const { validateId, validateBody } = require('../middlewares/validation')

const router = express.Router();

// Router-level Middleware
router.use('/:id', validateId);

router.get('/', controller.getAllBooks)

router.get('/:id', controller.getBookById)

router.post('/', validateBody, controller.addBook)

router.delete('/:id', controller.deleteBook)

router.put('/:id', validateBody, controller.updateBook)

module.exports = router;