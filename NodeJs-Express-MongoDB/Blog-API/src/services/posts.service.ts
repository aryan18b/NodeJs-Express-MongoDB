import type { HydratedDocument, QueryFilter } from "mongoose";
import type { CreatePostDto } from "../dtos/post.dto.js";
import Post, { type IPost } from "../models/post.model.js";
import type { PaginationQueryParams } from "../types/common.types.js";

export const createPost = async (data: CreatePostDto) : Promise<HydratedDocument<IPost>> => {
    const document = await Post.create(data);
    await document.populate('author', 'name');
    return document;
}

export const getPosts = async(query: PaginationQueryParams) : Promise<{documents: Array<HydratedDocument<IPost>>; totalItems: number}> => {
    const limit = query.limit;
    const page = query.page;
    const skip = limit*(page-1);

    const [documents, totalItems] = await Promise.all([
        Post.find()
        .skip(skip)
        .limit(limit)
        .populate('author', 'name')
        .sort({createdAt: -1}),
        Post.countDocuments()
    ])

    return {documents, totalItems};
}

export const getPost = async (id: string) : Promise<HydratedDocument<IPost> | null> => {
  const document = await Post.findById(id);
  await document?.populate('author', 'name');
  return document;
};