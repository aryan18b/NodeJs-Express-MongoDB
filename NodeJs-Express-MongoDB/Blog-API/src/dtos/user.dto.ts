import type mongoose from "mongoose";
import type { UserRoles } from "../utils/Enums.js";

export interface CreateUserDto {
    name: string,
    email: string, 
    password: string,
    role?: UserRoles
}

export interface UserResponseDto{
    id: string
    name: string,
    email: string, 
    role: string
}

export interface PostAuthor{
    _id: mongoose.Types.ObjectId,
    name: string
}