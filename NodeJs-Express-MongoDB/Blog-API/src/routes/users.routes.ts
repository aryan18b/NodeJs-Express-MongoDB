import express from 'express'
import { userValidationSchema } from '../validation/user.validation.js';
import { validate } from '../middlewares/validation.middleware.js';
import * as controller from '../controllers/users.controller.js'
const router = express.Router();


router.post('/', validate(userValidationSchema), controller.insertUser);


export default router;