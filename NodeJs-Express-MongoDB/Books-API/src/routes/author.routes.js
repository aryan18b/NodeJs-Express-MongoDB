import express from 'express';
import * as controller from '../controllers/author.controller.js'

const router = express.Router();

router.get('/', controller.getAllAuthorsAsync);

export default router;