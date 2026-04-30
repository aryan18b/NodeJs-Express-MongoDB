import { type ErrorRequestHandler } from "express";
import { ApiError } from "../utils/ApiError.js";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    let statusCode = 500;
    let message = "Internal Server Error";
    let errors: string[] | undefined;

    if(err instanceof ApiError){
        statusCode = err.statusCode
        message = err.message
        errors = err.errors
    }
    else{
        console.log(err);
    }

    return res.status(statusCode).json({
        success: false,
        message: message,
        errors: errors
    })
}