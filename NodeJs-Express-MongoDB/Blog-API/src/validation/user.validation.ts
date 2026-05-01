import Joi from "joi";
import { UserRoles } from "../utils/Enums.js";
import { objectId, pagination_limit, pagination_page } from "./common.validation.js";
export const userValidationSchema = Joi.object({
  name: Joi.string()
    .pattern(/^[A-Za-z\s'-]+$/)
    .min(2)
    .max(30)
    .trim()
    .required()
    .messages({
      "string.empty": "name cannot be empty",
      "string.min": "name must be at least 2 characters",
      "string.pattern.base": "name must only contain letters",
    }),
  email: Joi.string().trim().email().required().messages({
    "string.email": "Invalid email format",
    "string.empty": "email cannot be empty",
  }),
  password: Joi.string().min(8).max(50).required().messages({
    "string.min": "Password must be at least 8 characters",
    "string.empty": "Password is required",
  }),
  role: Joi.string()
    .trim()
    .valid(...Object.values(UserRoles))
    .optional(),
});

export const userIdSchema = Joi.object({
  id: objectId("user id").required(),
});

export const usersQuerySchema = Joi.object({
  limit: pagination_limit(),
  page: pagination_page(),
  role: Joi.string()
    .trim()
    .valid(...Object.values(UserRoles))
    .optional(),
});
