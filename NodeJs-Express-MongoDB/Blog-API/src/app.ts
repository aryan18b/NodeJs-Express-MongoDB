import express from "express";
import usersRouter from './routes/users.routes.js'
import postsRouter from './routes/posts.routes.js'
import commentsRouter from './routes/comments.routes.js'
const app = express();

app.use(express.json());

app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);

export default app;
