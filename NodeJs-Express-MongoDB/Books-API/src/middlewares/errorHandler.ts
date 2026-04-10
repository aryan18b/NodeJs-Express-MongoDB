import { type ErrorRequestHandler } from "express";

export const errorHandler : ErrorRequestHandler = function (err, req, res, next) {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Unexpected error";

    return res.status(statusCode).json({ error: message });
}