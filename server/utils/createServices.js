import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Service from "../models/service.model.js";

dotenv.config();
connectDB();

const services = [
  {
    name: "Service 1",
    url: "http://localhost:8081",
  },
  {
    name: "Service 2",
    url: "http://localhost:8082",
  },
  {
    name: "Service 3",
    url: "http://localhost:8083",
  },
];

const createServices = async () => {
  try {
    for (const service of services) {
      const existingService = await Service.findOne({ url: service.url });
      if (!existingService) {
        await Service.create(service);
        console.log(`Service created: ${service.name}`);
      } else {
        console.log(`Service already exists: ${service.name}`);
      }
    }
    console.log("Service creation process completed.");
    mongoose.connection.close();
  } catch (err) {
    console.error(err.message);
    mongoose.connection.close();
  }
};

createServices();