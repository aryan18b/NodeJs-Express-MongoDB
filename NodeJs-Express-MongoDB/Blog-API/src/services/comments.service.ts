import type { Types } from "mongoose";
import Comment, {type IComment} from "../models/comment.model.js";

export const getCommentById = async (id: string) => {
    const result = await Comment.findById(id);
    return result;
}


