import type { RequestHandler } from "express";
import type { CreatePostDto, PostResponseDto, PostWithAuthor } from "../dtos/post.dto.js";
import * as service from "../services/posts.service.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { toPostResponse } from "../mappers/post.mapper.js";

export const createPost : RequestHandler = async (req, res, next) => {
    try {
        const body : CreatePostDto = (req as any).validated.body;
        const document = await service.createPost(body)
        const post: PostResponseDto = toPostResponse(document);
        
        return res.status(201).json(new ApiResponse("Post created", post))
    } catch (err) {
        next(err)
    }
}