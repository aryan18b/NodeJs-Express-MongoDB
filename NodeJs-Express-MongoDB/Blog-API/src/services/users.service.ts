import type { CreateUserDto } from "../dtos/user.dto.js";
import User, { type IUser } from "../models/user.model.js";

export const insertUser = async (data: CreateUserDto) => {
  const { password, ...rest } = data;

  const document = await User.create({
    ...rest,
    passwordHash: password,
  });

  return document;
};
