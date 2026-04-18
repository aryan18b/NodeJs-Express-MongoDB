import mongoose from "mongoose";

const connectDb = async () => {
  try {
    if (!process.env.MONGODB_URL) throw new Error("MONGODB_URL is not defined");
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Unable to connect to MongoDB", error);
    process.exit(1);
  }
};

export default connectDb;
