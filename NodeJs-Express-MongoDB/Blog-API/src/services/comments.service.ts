import Comment, {type IComment} from "../models/comment.model.js";
import { ApiError } from "../utils/ApiError.js";

export const getCommentById = async (id: string) => {
    const comment = await Comment.findById(id).lean();
    if(!comment) throw new ApiError(404, "Comment not found");
    return comment;
}


