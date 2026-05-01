import type { HydratedDocument } from "mongoose";
import type { IPost } from "../models/post.model.js";
import type { PostResponseDto, PostWithAuthor } from "../dtos/post.dto.js";

export const toPostResponse = (document: HydratedDocument<IPost>) : PostResponseDto => {
    const obj = document.toObject() as unknown as PostWithAuthor;

    return {
        id: obj._id.toString(),
        title: obj.title,
        body: obj.body,
        author: {
            id: obj.author._id.toString(),
            name: obj.author.name
        },
        tags: obj.tags
    }
}