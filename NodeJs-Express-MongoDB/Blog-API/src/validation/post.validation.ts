import Joi from "joi";
import { objectId, pagination_limit, pagination_page } from "./common.validation.js";

export const postValidationSchema = Joi.object({
    title: Joi.string().min(3).max(500).required().trim(),
    body: Joi.string().min(10).max(3000).required().trim(),
    author: objectId("user id").required(),
    tags: Joi.array().items(Joi.string()).optional()
})

export const postsQueryValidationSchema = Joi.object({
    limit: pagination_limit(),
    page: pagination_page()
})