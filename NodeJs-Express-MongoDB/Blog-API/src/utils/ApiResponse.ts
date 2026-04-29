export class ApiResponse<T, U> {

    success = true;
    message: string;
    meta: U | undefined;
    data: T | undefined

    constructor(message: string, data?: T, meta?: U){
        this.message = message
        this.data = data
        this.meta = meta
    }
}