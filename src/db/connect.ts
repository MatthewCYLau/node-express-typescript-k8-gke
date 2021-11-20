import mongoose from "mongoose";

const connectDB = () =>
  mongoose.connect(
    process.env["MONGO_DB_CONNECTION_STRING"],
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    },
    () => {
      console.log("Connected to database");
    }
  );

export default connectDB;
