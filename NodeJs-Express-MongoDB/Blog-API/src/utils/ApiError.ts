export class ApiError extends Error {
    statusCode: number;
    errors?: string[] | undefined;

    constructor(statusCode: number, message: string, errors?: string[]){    
        super(message)
        this.statusCode = statusCode;
        this.errors = errors;

        Error.captureStackTrace(this, this.constructor);
    }
}