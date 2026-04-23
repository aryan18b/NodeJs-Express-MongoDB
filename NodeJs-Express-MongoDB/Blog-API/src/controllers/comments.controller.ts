import type { RequestHandler } from "express";
import * as commentService from "../services/comments.service.js";

const getComment: RequestHandler<{id: string}> = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await commentService.getCommentById(id);
    return res.status(200).json(result);
  } catch (err) {
    next(err)
  }
};
