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
      const responseTime = Date.now() - startTime; // Calculate response time

      console.log(`Service checked: ${service.url}, Status: ${response.status}, Response time: ${responseTime}ms`);

      // Log the service status
      await ServiceStatus.create({
        service_id: service._id, // Ensure this is a valid ObjectId
        status: getStatusEnum(response.status),
        checked_at: new Date(),
        response_time: responseTime,
      });

      // Fetch the current uptime log
      const uptimeLog = await UptimeLog.findOne({ service_id: service._id });

      // Calculate the new uptime percentage
      const totalChecks = (uptimeLog?.total_checks || 0) + 1;
      const upChecks = (uptimeLog?.up_checks || 0) + 1;
      const uptimePercentage = (upChecks / totalChecks) * 100;

      // Update uptime logs
      await UptimeLog.updateOne(
        { service_id: service._id },
        {
          $inc: {
            uptime: responseTime,
            total_checks: 1,
            up_checks: 1,
          },
          $set: {
            uptime_percentage: uptimePercentage,
          },
        },
        { upsert: true }
      );

      console.log(`Uptime log updated for service: ${service.url}, Uptime percentage: ${uptimePercentage}%`);
    } catch (error) {
      console.error(`Error checking service ${service.url}:`, error.message);

      // Log the service status as down
      await ServiceStatus.create({
        service_id: service._id, // Ensure this is a valid ObjectId
        status: getStatusEnum(error.response ? error.response.status : 500),
        checked_at: new Date(),
        response_time: null,
      });

      // Fetch the current uptime log
      const uptimeLog = await UptimeLog.findOne({ service_id: service._id });

      // Calculate the new uptime percentage
      const totalChecks = (uptimeLog?.total_checks || 0) + 1;
      const upChecks = uptimeLog?.up_checks || 0;
      const uptimePercentage = (upChecks / totalChecks) * 100;

      // Update downtime logs
      await UptimeLog.updateOne(
        { service_id: service._id },
        {
          $inc: {
            downtime: 6000, // Assume 1 minute of downtime for simplicity
            total_checks: 1,
            down_checks: 1,
            downtime_duration: 1, // Increment downtime duration by 1 minute
          },
          $set: {
            uptime_percentage: uptimePercentage,
          },
        },
        { upsert: true }
      );

      console.log(`Downtime log updated for service: ${service.url}, Uptime percentage: ${uptimePercentage}%`);
    }
  }
};

export default checkServices;
