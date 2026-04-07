const express = require('express')
const bookRouter = require('./routes/book.routes')
const { loggerMiddleware } = require('./middlewares/logger')
const { errorHandler } = require('./middlewares/errorHandler')
const PORT = 8000;
const app = express();

// Middlewares (Plugins)
app.use(express.json());
app.use(loggerMiddleware);

app.use('/books', bookRouter);

app.use(errorHandler)

app.listen(PORT, () => console.log(`App is running on ${PORT}`));
