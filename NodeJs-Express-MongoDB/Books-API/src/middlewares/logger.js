import fs from 'node:fs'

export const loggerMiddleware = function(req, res, next){
    const currentDate = new Date();
    const content = `[${currentDate.toString()}] ${req.method} ${req.path}\n`;
    fs.appendFileSync('logs.txt', content, 'utf-8');
    next();
}