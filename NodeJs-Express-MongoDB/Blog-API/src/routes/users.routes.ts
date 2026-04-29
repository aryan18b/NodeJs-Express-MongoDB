import express from 'express'
import { userValidationSchema, userIdSchema, getAllUsersQuerySchema } from '../validation/user.validation.js';
import { validate } from '../middlewares/validation.middleware.js';
import * as controller from '../controllers/users.controller.js'
const router = express.Router();


router.post('/', validate(userValidationSchema), controller.insertUser);

router.get('/', validate(getAllUsersQuerySchema, "query"), controller.getAllUsers)

router.get('/:id',  validate(userIdSchema, "params"), controller.getUser);

router.delete('/:id', validate(userIdSchema, "params"), controller.deleteUser)

router.put('/:id', validate(userIdSchema, "params"), validate(userValidationSchema), controller.updateUser)

export default router;