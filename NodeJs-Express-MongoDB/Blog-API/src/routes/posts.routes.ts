import express from 'express'
import { validate } from '../middlewares/validation.middleware.js';
import { postsQueryValidationSchema, postValidationSchema } from '../validation/post.validation.js';
import * as controller from '../controllers/posts.controller.js';

const router = express.Router();

router.post('/', validate(postValidationSchema), controller.createPost)

router.get('/', validate(postsQueryValidationSchema, "query"), controller.getPosts)

export default router;