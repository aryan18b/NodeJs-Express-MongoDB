import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { User } from "src/users/users.schema";

export type PostDocument = HydratedDocument<Post>;

@Schema({ timestamps: true })
export class Post {
    @Prop({ required: true, minlength: 2 })
    title!: string;

    @Prop({ required: true, minlength: 10 })
    body!: string;

    @Prop({ type: Types.ObjectId, ref: User.name, required: true })
    author!: Types.ObjectId | User;

    @Prop({ type: [String], default: [] })
    tags!: string[];
}

export const PostSchema = SchemaFactory.createForClass(Post);
