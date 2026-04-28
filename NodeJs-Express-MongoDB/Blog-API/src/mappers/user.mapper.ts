import type { HydratedDocument } from "mongoose";
import type { UserResponseDto } from "../dtos/user.dto.js";
import type { IUser } from "../models/user.model.js";

export const toUserResponse = (document: HydratedDocument<IUser>): UserResponseDto => {
  const obj = document.toObject();
  return {
    id: obj._id.toString(),
    name: obj.name,
    email: obj.email,
    role: obj.role,
  };
};
