import express from 'express';
import 'dotenv/config'
import { connectMongoDB } from './connection.js';
import v1Router from './routes/v1/v1.routes.js'
import { loggerMiddleware } from './middlewares/logger.js'
import { errorHandler } from './middlewares/errorHandler.js'
const PORT = 8000;
const app = express();

const mongoURL = process.env.MongoDB_URL;
if (!mongoURL) {
  throw new Error("MongoDB_URL is not defined in environment variables");
}

connectMongoDB(mongoURL).then(() => console.log("MongoDB connected"));

// Middlewares (Plugins)
app.use(express.json());
app.use(loggerMiddleware);

app.use('/api/v1', v1Router);

app.use(errorHandler)

app.listen(PORT, () => console.log(`App is running on ${PORT}`));

export {};