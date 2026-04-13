import express from 'express';
import bookRouter from './book.routes.js'
import authorRouter from './author.routes.js'

const router = express.Router();

router.use('/books', bookRouter)
router.use('/authors', authorRouter)

export default router;