import type { UserRoles } from "../utils/Enums.js";

export interface CreateUserDto {
    name: string,
    email: string, 
    password: string,
}

export interface UserResponseDto{
    id: string
    name: string,
    email: string, 
    role: string
}