import type mongoose from "mongoose"
import type { IPost } from "../models/post.model.js"
import type { PostAuthor } from "./user.dto.js"

export type CreatePostDto = {
    title: string,
    body: string,
    author: mongoose.Types.ObjectId,
    tags?: string[]
}

export type UpdatePostDto = {
    title: string,
    body: string,
    tags?: string[]
}

export type PostWithAuthor = Omit<IPost, 'author'> & {
    _id: mongoose.Types.ObjectId;
    author: PostAuthor;
};

export type PostResponseDto = {
    id: string,
    title: string,
    body: string,
    author: {
        id: string,
        name: string
    }
    tags?: string[]
}
