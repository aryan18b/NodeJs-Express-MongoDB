import { type RequestHandler } from "express";
import { type ObjectSchema } from "joi";

export const validate = (schema: ObjectSchema) => {
    const func : RequestHandler = (req, res, next) => {
        console.log("From middleware");
        
        const { error, value } = schema.validate(req.body, {
          abortEarly: false,
          stripUnknown: true
        });
    
        if (error) {
          return res.status(400).json({
            message: "Validation failed",
            errors: error.details.map(e => e.message)
          });
        }
    
        req.body = value;
        next();
    }
    return func;
};
