import { ArgumentsHost, Catch, ExceptionFilter, NotFoundException } from "@nestjs/common";
import { Request, Response } from "express";

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter{
    catch(exception: NotFoundException, host: ArgumentsHost){
        const ctx = host.switchToHttp();
        const req = ctx.getRequest<Request>();
        const res = ctx.getResponse<Response>();
        const status = exception.getStatus();

        res.status(status).json({
            statusCode: status,
            message: "Not Found",
            timestamp: new Date().toISOString(),
            path: req.url
        })
    }
}