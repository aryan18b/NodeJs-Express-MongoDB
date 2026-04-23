import express from 'express'
import * as controller from '../controllers/comments.controller.js';

const router = express.Router();

router.use('/:id', controller.getComment)

export default router;