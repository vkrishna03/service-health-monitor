import cron from "node-cron";
import checkServices from "../services/monitoringService.js";

import { mongoose, connect } from "mongoose";

const connectDB = async () => {
  try {
    await connect("mongodb://localhost:27017/service-health-monitor", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
      socketTimeoutMS: 45000, // Increase socket timeout to 45 seconds
    });
    console.log("MongoDB connected in cron instance...!");
  } catch (err) {
    console.error(err.message);
    // process.exit(1);
  }
};

connectDB();

console.log("Starting cron job script...");

// Schedule a check every minute
cron.schedule("* * * * *", () => {
  console.log("Running service checks...");
  checkServices();
});

console.log("Cron job scheduled.");
