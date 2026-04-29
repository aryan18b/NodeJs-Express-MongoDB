import type { HydratedDocument, QueryFilter } from "mongoose";
import type { CreateUserDto } from "../dtos/user.dto.js";
import User, { type IUser } from "../models/user.model.js";
import type { UsersQueryParams } from "../types/user.types.js";

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

export const updateUser = async (id: string, data: CreateUserDto) : Promise<HydratedDocument<IUser> | null> => {
  const document = await User.findByIdAndUpdate(id, data, {returnDocument: 'after'});  
  return document;
};

export const deleteUser = async (id: string) => {
  const result = await User.findByIdAndDelete(id);
  return result;  
}

export const getUsers = async(query: UsersQueryParams) : Promise<{ documents: Array<HydratedDocument<IUser>>; totalItems: number}> => {
  const filter: QueryFilter<IUser> = {};

  const limit = query.limit;
  const page = query.page;
  const skip = limit*(page-1);

  if(query.role) filter.role = query.role;

  const [documents, totalItems] = await Promise.all([
    User.find(filter)
    .skip(skip)
    .limit(limit)
    .sort({createdAt: -1}),
    User.countDocuments(filter)]);

  return {documents, totalItems};
}