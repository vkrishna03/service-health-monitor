// Express.js
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import serviceRoutes from "./routes/service.routes.js";
import authRoutes from "./routes/auth.routes.js";
import incidentRoutes from "./routes/incident.routes.js";
import logRoutes from "./routes/log.routes.js";

const app = express();
// connect to database
dotenv.config();
connectDB();

// Init Middleware
app.use(cors());
app.use(express.json());

// Define Routes
app.use("/api/services", serviceRoutes);
app.use("/api/incidents", incidentRoutes)
app.use("/api/logs", logRoutes);

// Start the server
const PORT = process.env.PORT || 1337;
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
