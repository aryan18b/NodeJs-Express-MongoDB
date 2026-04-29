import type { RequestHandler } from "express"
import * as service from "../services/users.service.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import type { CreateUserDto, UserResponseDto } from "../dtos/user.dto.js";
import { ApiError } from "../utils/ApiError.js";
import { toUserResponse } from "../mappers/user.mapper.js";
import type { PaginationQueryParams } from "../types/pagination.types.js";

export const insertUser : RequestHandler = async (req, res, next) => {
    try {
        const body : CreateUserDto = (req as any).validated.body;        
        const document = await service.insertUser(body);        
        const user = toUserResponse(document);

        return res.status(201).json(new ApiResponse("User Created", user));
    } catch (err) {
        next(err);
    }
}

export const getUser : RequestHandler<{id: string}> = async (req, res, next) => {
    try {
        const id = (req as any).validated.params.id;
        const document = await service.getUser(id);
        if(!document) throw new ApiError(404, `User with id: ${id} not found.`);
        const user = toUserResponse(document);
        
        return res.status(200).json(new ApiResponse("User found", user));
    } catch (err) {
        next(err)
    }
}

export const getAllUsers : RequestHandler = async (req, res, next) => {
    try {
        let message = "Users found";
        
        const { page, limit } = (req as any).validated.query as PaginationQueryParams;
        const skip = limit*(page-1);

        const {documents, totalItems} = await service.getAllUsers(skip, limit);
        const users = documents.map(toUserResponse);
        if(!users || users.length <= 0) message = "No users found"
        const totalPages = Math.ceil(totalItems/limit)

        const meta = {
            page,
            limit, 
            totalItems,
            totalPages
        }

        return res.status(200).json(new ApiResponse(message, users, meta));
    } catch (err) {
        next(err)
    }
}