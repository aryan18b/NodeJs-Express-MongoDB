import type { RequestHandler } from "express";
import * as commentService from "../services/comments.service.js";
import { ApiResponse } from "../utils/apiResponse.js";

export const getComment: RequestHandler<{id: string}> = async (req, res, next) => {
  try {
    const id = req.params.id;
    const comment = await commentService.getCommentById(id);
    return res.status(200).json(new ApiResponse("Comment fetched successfully", comment));
  } catch (err) {
    next(err)
  }
};
