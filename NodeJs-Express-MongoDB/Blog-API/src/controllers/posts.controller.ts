import type { RequestHandler } from "express";

export const createPost : RequestHandler = (req, res, next) => {
    try {
        return res.status(200).json({message: "Post created"})
    } catch (err) {
        next(err)
    }
}