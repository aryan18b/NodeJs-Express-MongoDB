import type { RequestHandler } from "express";
import type { CreatePostDto, PostResponseDto, PostWithAuthor } from "../dtos/post.dto.js";
import * as service from "../services/posts.service.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { toPostResponse } from "../mappers/post.mapper.js";
import type { PaginationQueryParams } from "../types/common.types.js";
import { ApiError } from "../utils/ApiError.js";

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

export const getPosts: RequestHandler = async (req, res, next) => {
    try {
        const queryParams = (req as any).validated.query as PaginationQueryParams;
        const {documents, totalItems} = await service.getPosts(queryParams);
        const posts: PostResponseDto[] = documents.map(toPostResponse)

        const meta = {
            page: queryParams.page,
            limit: queryParams.limit, 
            totalItems,
            totalPages: Math.ceil(totalItems/queryParams.limit)
        }

        return res.status(200).json(new ApiResponse("Posts fetched", posts, meta));
    } catch (err) {
        next(err)
    }
}