import type { HydratedDocument, QueryFilter } from "mongoose";
import type { CreatePostDto, UpdatePostDto } from "../dtos/post.dto.js";
import Post, { type IPost } from "../models/post.model.js";
import type { PostsQueryParams } from "../types/post.types.js";

export const createPost = async (data: CreatePostDto) : Promise<HydratedDocument<IPost>> => {
    const document = await Post.create(data);
    await document.populate('author', 'name');
    return document;
}

export const getPosts = async(query: PostsQueryParams) : Promise<{documents: Array<HydratedDocument<IPost>>; totalItems: number}> => {
    const filter : QueryFilter<IPost> = {};

    if(query.author) filter.author = query.author
    if(query.tags?.length) filter.tags = {$in: query.tags}
    
    const limit = query.limit;
    const page = query.page;
    const skip = limit*(page-1);

    const [documents, totalItems] = await Promise.all([
        Post.find(filter)
        .skip(skip)
        .limit(limit)
        .populate('author', 'name')
        .sort({createdAt: -1}),
        Post.countDocuments(filter)
    ])

    return {documents, totalItems};
}

export const getPost = async (id: string) : Promise<HydratedDocument<IPost> | null> => {
  const document = await Post.findById(id);
  await document?.populate('author', 'name');
  return document;
};

export const deletePost = async (id: string) : Promise<HydratedDocument<IPost> | null> => {
  const document = await Post.findByIdAndDelete(id);
  await document?.populate('author', 'name');
  return document;
};

export const updatePost = async(id: string, data: UpdatePostDto): Promise<HydratedDocument<IPost> | null> => {
  const document = await Post.findByIdAndUpdate(id, data, {returnDocument: 'after'});
  await document?.populate('author', 'name');
  return document;
}