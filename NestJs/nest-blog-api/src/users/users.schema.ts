import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Exclude } from "class-transformer";
import { HydratedDocument } from "mongoose";
import { UserRole } from "src/enums/user-role.enum";

export type UserDocument = HydratedDocument<User>;

@Schema({timestamps: true})
export class User {
    @Prop({required: true, minlength: 2})
    name!: string;

    @Prop({ required: true, unique: true})
    email!: string;

    @Exclude()
    @Prop({required: true, minLength: 6, select: false})
    password!: string;

    @Prop({default: UserRole.USER, enum: UserRole})
    role!: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User)