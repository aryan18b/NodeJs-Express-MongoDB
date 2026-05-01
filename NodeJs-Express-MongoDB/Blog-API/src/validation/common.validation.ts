import Joi from "joi";
import mongoose from "mongoose";

export const objectId = (fieldname = "id") => 
    Joi.string()
    .custom((value, helpers) => {
        if(!mongoose.Types.ObjectId.isValid(value)){
            return helpers.error("any.invalid")
        }
        return value;
    })
    .messages({
        "any.invalid": `Invalid ${fieldname}`
    })

export const pagination_page = () => Joi.number().integer().min(1).default(1);
export const pagination_limit = () => Joi.number().integer().min(1).max(50).default(10);