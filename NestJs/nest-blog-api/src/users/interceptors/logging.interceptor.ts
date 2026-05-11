import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import path from "path";
import { Observable } from "rxjs";
import { tap } from "rxjs";
import * as fs from 'node:fs'

@Injectable()
export class LoggingInterceptor implements NestInterceptor{
    private logsDir = path.join(process.cwd(), 'logs');
    private logFilePath = path.join(
        this.logsDir,
        'logs.txt'
    );

    constructor(){
        if(!fs.existsSync(this.logsDir)) fs.mkdirSync(this.logsDir);
    }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const req = context.switchToHttp().getRequest();
        const method = req.method;
        const route = req.route.path;
        const timestamp = new Date().toLocaleString();
        const logMessage = `[${timestamp}] ${method} ${route}\n`
        fs.appendFileSync(this.logFilePath, logMessage);        

        return next.handle();
    }
}