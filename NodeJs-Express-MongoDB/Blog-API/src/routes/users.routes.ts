import express from 'express'
import { userValidationSchema, getUserByIdSchema } from '../validation/user.validation.js';
import { validate } from '../middlewares/validation.middleware.js';
import * as controller from '../controllers/users.controller.js'
const router = express.Router();


router.post('/', validate(userValidationSchema), controller.insertUser);

router.get('/', controller.getAllUsers)

router.get('/:id',  validate(getUserByIdSchema, "params"), controller.getUser);

export default router;