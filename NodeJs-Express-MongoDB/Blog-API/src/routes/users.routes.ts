import express from 'express'
import { userValidationSchema, userIdSchema, usersQuerySchema as usersQuerySchema } from '../validation/user.validation.js';
import { validate } from '../middlewares/validation.middleware.js';
import * as controller from '../controllers/users.controller.js'
const router = express.Router();


router.post('/', validate(userValidationSchema), controller.insertUser);

router.get('/', validate(usersQuerySchema, "query"), controller.getUsers);

router.get('/:id',  validate(userIdSchema, "params"), controller.getUser);

router.delete('/:id', validate(userIdSchema, "params"), controller.deleteUser);

router.put('/:id', validate(userIdSchema, "params"), validate(userValidationSchema), controller.updateUser);

export default router;