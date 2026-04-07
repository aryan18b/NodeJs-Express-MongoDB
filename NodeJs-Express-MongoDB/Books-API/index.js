const express = require('express')
const bookRouter = require('./routes/book.routes')
const PORT = 8000;
const app = express();

app.use(express.json())

app.use('/books', bookRouter);

app.listen(PORT, () => console.log(`App is running on ${PORT}`));
