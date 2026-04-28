import { type RequestHandler } from "express";
import { type ObjectSchema } from "joi";
import { ApiError } from "../utils/ApiError.js";

export const validate = (schema: ObjectSchema) => {
    const func : RequestHandler = (req, res, next) => {
        const { error, value } = schema.validate(req.body, {
          abortEarly: false,
          stripUnknown: true
        });
    
        if (error) {
          const errors = error.details.map((e) => e.message);
          throw new ApiError(400, "Validation failed", errors)
        }
    
        req.body = value;
        next();
    }
    return func;
};
