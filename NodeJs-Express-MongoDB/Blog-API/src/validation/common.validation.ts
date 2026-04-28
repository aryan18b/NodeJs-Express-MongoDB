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
