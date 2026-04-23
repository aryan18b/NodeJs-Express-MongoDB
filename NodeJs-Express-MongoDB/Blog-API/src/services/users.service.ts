import User, { type IUser } from "../models/user.model.js";

export const insertUser = async (data: any) => {
  const { password, ...rest } = data;

  const passwordHash = password;

  const user: IUser = await User.create({
    ...rest,
    passwordHash,
  });
  const result = await User.create(user);
  return result;
};
