import Joi from "joi";
import { UserRoles } from "../utils/Enums.js";

export const userValidationScehma = Joi.object({
  name: Joi.string()
    .pattern(/^[A-Za-z\s'-]+$/)
    .min(3)
    .max(30)
    .required()
    .messages({
      "string.empty": "name cannot be empty",
      "string.min": "name must be at least 3 characters",
      "string.pattern.base": "name must only contain letters",
    }),
  email: Joi.string().email().required().messages({
    "string.email": "Invalid email format",
    "string.empty": "email cannot be empty",
  }),
  password: Joi.string().min(8).max(50).required().messages({
    "string.min": "Password must be at least 8 characters",
    "string.empty": "Password is required",
  }),
  role: Joi.string()
    .valid(...Object.values(UserRoles))
    .optional(),
});
