import Joi from "joi";
import { objectId, pagination_limit, pagination_page } from "./common.validation.js";

export const createPostValidationSchema = Joi.object({
    title: Joi.string().min(3).max(500).required().trim(),
    body: Joi.string().min(10).max(3000).required().trim(),
    author: objectId("user id").required(),
    tags: Joi.array().items(Joi.string()).optional()
})

export const updatePostValidationSchema = Joi.object({
    title: Joi.string().min(3).max(500).trim(),
    body: Joi.string().min(10).max(3000).trim(),
    tags: Joi.array().items(Joi.string()).optional()
}).min(1).required()
.messages({
    "object.min": "At least one field (title, body, or tags) must be provided"
})

export const postsQueryValidationSchema = Joi.object({
    limit: pagination_limit(),
    page: pagination_page(),
    author: objectId("author id"),
    tags: Joi.string().custom((value, helpers) => {
        if(!value) return value;

        return value
                .split(',')
                .map((tag: string) => tag.trim())
                .filter(Boolean);
    })
})

export const postIdValidationSchema = Joi.object({
    id: objectId("post id").required()
})