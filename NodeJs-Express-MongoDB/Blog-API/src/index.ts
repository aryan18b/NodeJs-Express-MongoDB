import "dotenv/config";
import app from "./app.js";
import connectDb from "./db/connection.js";
const port = process.env.PORT || 8000;

connectDb()
  .then(() => {
    app.listen(port, () => console.log(`App started at ${port}`));
  })
  .catch((err) => {
    console.error("DB connection failed");
    process.exit(1);
  });
