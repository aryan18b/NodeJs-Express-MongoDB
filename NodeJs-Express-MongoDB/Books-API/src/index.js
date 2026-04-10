import express from 'express';
import 'dotenv/config'
import { connectMongoDB } from './connection.js';
import bookRouter from './routes/book.routes.js'
import authorRouter from './routes/author.routes.js'
import { loggerMiddleware } from './middlewares/logger.js'
import { errorHandler } from './middlewares/errorHandler.js'
const PORT = 8000;
const app = express();

connectMongoDB(process.env.MongoDB_URL).then(() => console.log("MongoDB connected"));

// Middlewares (Plugins)
app.use(express.json());
app.use(loggerMiddleware);

app.use('/books', bookRouter);
app.use('/authors', authorRouter);

app.use(errorHandler)

app.listen(PORT, () => console.log(`App is running on ${PORT}`));
