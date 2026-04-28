import type { RequestHandler } from "express"
import * as service from "../services/users.service.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import type { CreateUserDto, UserResponseDto } from "../dtos/user.dto.js";

export const insertUser : RequestHandler = async (req, res, next) => {
    try {
        const body : CreateUserDto = req.body;        
        const document = await service.insertUser(body);
        
        const obj = document.toObject();
        const user : UserResponseDto = {
            id: obj._id.toString(),
            name: obj.name,
            email: obj.email,
            role: obj.role
        };

        return res.status(201).json(new ApiResponse("User Created", user));
    } catch (err) {
        next(err);
    }
}