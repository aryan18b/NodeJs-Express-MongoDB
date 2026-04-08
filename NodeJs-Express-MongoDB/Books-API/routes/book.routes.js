const express = require('express')
const controller = require('../controllers/book.controller');
const { validateId, validateBody } = require('../middlewares/validation')

const router = express.Router();

// Router-level Middleware
router.use('/:id', validateId);

router.get('/', controller.getAllBooksAsync)

router.get('/:id', controller.getBookByIdAsync)

router.post('/', validateBody, controller.addBookAsync)

router.delete('/:id', controller.deleteBookAsync)

router.put('/:id', validateBody, controller.updateBookAsync)

module.exports = router;