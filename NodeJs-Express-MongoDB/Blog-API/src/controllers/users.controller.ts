import type { RequestHandler } from "express"
import * as userService from "../services/users.service.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import type { CreateUserDto, UserResponseDto } from "../dtos/user.dto.js";
import { ApiError } from "../utils/ApiError.js";
import { toUserResponse } from "../mappers/user.mapper.js";
import type { UsersQueryParams } from "../types/user.types.js";
import * as postService from "../services/posts.service.js";
import type { PaginationQueryParams } from "../types/common.types.js";
import type { PostResponseDto } from "../dtos/post.dto.js";
import { toPostResponse } from "../mappers/post.mapper.js";

export const insertUser : RequestHandler = async (req, res, next) => {
    try {
        const body : CreateUserDto = (req as any).validated.body;        
        const document = await userService.insertUser(body);        
        const user : UserResponseDto = toUserResponse(document);

        return res.status(201).json(new ApiResponse("User Created", user));
    } catch (err) {
        next(err);
    }
}

export const getUser : RequestHandler = async (req, res, next) => {
    try {
        const id = (req as any).validated.params.id;
        const document = await userService.getUser(id);
        if(!document) throw new ApiError(404, `User with id: ${id} does not exist.`);
        const user : UserResponseDto = toUserResponse(document);
        
        return res.status(200).json(new ApiResponse("User found", user));
    } catch (err) {
        next(err)
    }
}

export const deleteUser : RequestHandler = async (req, res, next) => {
    try {
        const id = (req as any).validated.params.id;
        const document = await userService.deleteUser(id);
        if(!document) throw new ApiError(404, `User with id: ${id} does not exist.`);
        const user : UserResponseDto = toUserResponse(document);

        return res.status(200).json(new ApiResponse("User deleted", user));
    } catch (err) {
        next(err)
    }
}

export const updateUser : RequestHandler = async (req, res, next) =>{
    try {        
        const id = (req as any).validated.params.id;
        const body : CreateUserDto = (req as any).validated.body;
        const document = await userService.updateUser(id, body);
        if(!document) throw new ApiError(404, `User with id: ${id} does not exist.`);
        const user : UserResponseDto = toUserResponse(document);

        return res.status(200).json(new ApiResponse("User updated", user));
    } catch (err) {
        next(err);
    }
}

export const getUsers : RequestHandler = async (req, res, next) => {
    try {
        const queryParams = (req as any).validated.query as UsersQueryParams;
        const {documents, totalItems} = await userService.getUsers(queryParams);
        const users : UserResponseDto[] = documents.map(toUserResponse);
        
        const meta = {
            page: queryParams.page,
            limit: queryParams.limit, 
            totalItems,
            totalPages: Math.ceil(totalItems/queryParams.limit)
        }

        return res.status(200).json(new ApiResponse("Users fetched", users, meta));
    } catch (err) {
        next(err)
    }
}

export const getUserPosts: RequestHandler = async(req, res, next) => {
    try {
        const id = (req as any).validated.params.id;

        const user = await userService.getUser(id);
        if(!user) throw new ApiError(404, `User with id: ${id} does not exist.`);

        const queryParams = (req as any).validated.query as PaginationQueryParams;
        
        const {documents, totalItems} = await postService.getPosts({
            author: id,
            ...queryParams
        });
        
        const posts: PostResponseDto[] = documents.map(toPostResponse)
        
        const meta = {
            page: queryParams.page,
            limit: queryParams.limit, 
            totalItems,
            totalPages: Math.ceil(totalItems/queryParams.limit)
        }

        return res.status(200).json(new ApiResponse("User posts fetched", posts, meta));
    } catch (err) {
        next(err);
    }
}