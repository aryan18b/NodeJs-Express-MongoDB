import express from 'express'
import { validate } from '../middlewares/validation.middleware.js';
import * as schema from '../validation/post.validation.js';
import * as controller from '../controllers/posts.controller.js';

const router = express.Router();

router.post('/', validate(schema.createPostValidationSchema), controller.createPost)

router.get('/', validate(schema.postsQueryValidationSchema, "query"), controller.getPosts)

router.get('/:id', validate(schema.postIdValidationSchema, "params"), controller.getPost)

router.delete('/:id', validate(schema.postIdValidationSchema, "params"), controller.deletePost)

router.put('/:id', validate(schema.postIdValidationSchema, "params"), validate(schema.updatePostValidationSchema), controller.updatePost)

export default router;