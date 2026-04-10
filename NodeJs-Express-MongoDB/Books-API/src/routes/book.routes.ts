import express from 'express';
import * as controller from '../controllers/book.controller.js'
import { validateId, validateBody } from '../middlewares/validation.js'

const router = express.Router();

// Router-level Middleware
router.use('/:id', validateId);

router.get('/', controller.getAllBooksAsync)

router.get('/:id', controller.getBookByIdAsync)

router.post('/', validateBody, controller.addBookAsync)

router.delete('/:id', controller.deleteBookAsync)

router.put('/:id', validateBody, controller.updateBookAsync)

export default router;