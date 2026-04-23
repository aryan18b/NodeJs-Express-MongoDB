import type { RequestHandler } from "express"
import * as service from "../services/users.service.js"
import type { IUser } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const insertUser : RequestHandler = async (req, res, next) => {
    try {
        const body = req.body;        
        const user = await service.insertUser(body);
        return res.status(201).json(new ApiResponse("User Created", user));
    } catch (err) {
        next(err);
    }
}