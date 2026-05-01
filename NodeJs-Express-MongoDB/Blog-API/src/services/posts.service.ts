import type { HydratedDocument } from "mongoose";
import type { CreatePostDto, PostResponseDto, PostWithAuthor } from "../dtos/post.dto.js";
import Post, { type IPost } from "../models/post.model.js";
import type { PostAuthor } from "../dtos/user.dto.js";

export const createPost = async (data: CreatePostDto) : Promise<HydratedDocument<IPost>> => {
    const document = await Post.create(data);
    await document.populate<{ author: PostAuthor }>('author', 'name');
    return document;
}