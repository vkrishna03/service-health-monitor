// Express.js
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import serviceRoutes from "./routes/service.routes.js";
import userRoutes from "./routes/user.routes.js";

const app = express();
// connect to database
dotenv.config();
connectDB();

// Init Middleware
app.use(cors());
app.use(express.json());

// Define Routes
app.use("/api/service", serviceRoutes);
app.use("/api/user", userRoutes);

// Start the server
const PORT = process.env.PORT || 1337;
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
