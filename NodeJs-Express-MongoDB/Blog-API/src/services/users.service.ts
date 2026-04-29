import type { HydratedDocument } from "mongoose";
import type { CreateUserDto } from "../dtos/user.dto.js";
import User, { type IUser } from "../models/user.model.js";
import { totalmem } from "node:os";

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

export const getAllUsers = async(skip: number, limit: number) : Promise<{ documents: Array<HydratedDocument<IUser>>; totalItems: number }> => {
  const [documents, totalItems] = await Promise.all([
    User.find()
    .skip(skip)
    .limit(limit)
    .sort({createdAt: -1}),
    User.countDocuments()]);

    return {documents, totalItems};
}