import mongoose from "mongoose";
import {UserRoles} from '../utils/Enums.js'

export interface IUser{
    name: string,
    email: string, 
    passwordHash: string,
    role: UserRoles
}

const userSchema = new mongoose.Schema<IUser>({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    passwordHash: {type: String, required: true},
    role: {
        type: String,
        enum: Object.values(UserRoles),
        default: UserRoles.User, 
        required: true
    },
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;