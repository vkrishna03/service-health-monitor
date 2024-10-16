import axios from "axios";
import ServiceStatus from "../models/serviceStatus.model.js";
import UptimeLog from "../models/uptimeLog.model.js";
import Service from "../models/service.model.js";

const checkServices = async () => {
  console.log("Fetching services...");
  const services = await Service.find({}); // Fetch all services from the database

  // Define the enum mapping function
  const getStatusEnum = (statusCode) => {
    if (statusCode >= 200 && statusCode < 300) {
      return "UP";
    } else if (statusCode === 408) {
      return "TIMEOUT";
    } else {
      return "DOWN";
    }
  };

  for (const service of services) {
    try {
      const startTime = Date.now();
      const response = await axios.get(service.url);
      const responseTime = response.headers["request-duration"]; // Example header for response time

      // Log the service status
      await ServiceStatus.create({
        service_id: service.id,
        status: getStatusEnum(response.status),
        checked_at: new Date(),
        response_time: responseTime,
      });

      console.log("Service checked:", service.url, "Status:", response.status);

      // Update uptime logs
      await UptimeLog.updateOne(
        { service_id: service.id },
        { $inc: { uptime: responseTime } },
        { upsert: true }
      );

      console.log(
        "Service checked:",
        service.url,
        "Response time:",
        responseTime
      );
    } catch (error) {
      // Log the service status as down
      await ServiceStatus.create({
        service_id: service.id,
        status: getStatusEnum(error.response ? error.response.status : 500),
        checked_at: new Date(),
        response_time: null,
      });

      // Update downtime logs
      await UptimeLog.updateOne(
        { service_id: service.id },
        { $inc: { downtime: 6000 } }, // Assume 1 minute of downtime for simplicity
        { upsert: true }
      );
    }
  }
};

export default checkServices;
