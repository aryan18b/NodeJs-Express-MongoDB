import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema({timestamps: true})
export class User {
    @Prop({required: true, minlength: 2})
    name!: string;

    @Prop({ required: true, unique: true})
    email!: string;

    @Prop({required: true, minLength: 6, select: false})
    password!: string;

    @Prop({default: 'user', enum: ['user', 'admin']})
    role!: string;
}

export const UserSchema = SchemaFactory.createForClass(User)