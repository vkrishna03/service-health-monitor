import { mongoose, connect } from "mongoose";

const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB at URL:", process.env.MONGO_URL);

    await connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
      socketTimeoutMS: 45000, // Increase socket timeout to 45 seconds
    });
    console.log("MongoDB connected...!");
  } catch (err) {
    console.error(err.message);
    // process.exit(1);
  }
};

// Listen for Mongoose connection events
mongoose.connection.on("error", (err) => {
  console.error("Mongoose connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.warn("Mongoose connection disconnected");
});

export default connectDB;
