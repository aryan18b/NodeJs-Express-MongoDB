import type { HydratedDocument } from "mongoose";
import type { CreateUserDto } from "../dtos/user.dto.js";
import User, { type IUser } from "../models/user.model.js";

export const insertUser = async (data: CreateUserDto) : Promise<HydratedDocument<IUser>> => {
  const { password, ...rest } = data;

  const document = await User.create({
    ...rest,
    passwordHash: password,
  });

  return document;
};

export const getUser = async (id: string) : Promise<HydratedDocument<IUser> | null> => {
  const document = await User.findById(id);
  return document;
};

export const getAllUsers = async(skip: number, limit: number) : Promise<Array<HydratedDocument<IUser>>> => {
  const result = await User.find().skip(skip).limit(limit).sort({createdAt: -1});
  return result;
}