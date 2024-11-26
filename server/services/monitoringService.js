import axios from "axios";
import ServiceStatus from "../models/serviceStatus.model.js";
import UptimeLog from "../models/uptimeLog.model.js";
import Service from "../models/service.model.js";
import Incident from "../models/incident.model.js";

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
            current_downtime_streak: 0, // Reset current downtime streak
          },
        },
        { upsert: true }
      );

      console.log(`Uptime log updated for service: ${service.url}, Uptime percentage: ${uptimePercentage}%`);

      // Resolve any open incidents for this service
      await Incident.updateMany(
        { service_id: service._id, status: { $ne: "Resolved" } },
        {
          $set: {
            status: "Resolved",
            end_time: new Date(),
            duration: uptimeLog?.downtime_duration || 0,
          },
        }
      );

      console.log(`Incidents resolved for service: ${service.url}`);
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

      // Calculate the actual downtime duration
      const lastCheckedAt = uptimeLog?.last_checked_at || new Date();
      const currentCheckedAt = new Date();
      const downtimeDuration = (currentCheckedAt - lastCheckedAt) / 1000 / 60; // Convert milliseconds to minutes

      // Update downtime logs
      await UptimeLog.updateOne(
        { service_id: service._id },
        {
          $inc: {
            downtime: downtimeDuration, // Increment downtime by the actual duration
            total_checks: 1,
            down_checks: 1,
            downtime_duration: downtimeDuration, // Increment downtime duration by the actual duration
            current_downtime_streak: downtimeDuration, // Increment current downtime streak by the actual duration
          },
          $set: {
            uptime_percentage: uptimePercentage,
            last_checked_at: currentCheckedAt, // Update the last checked time
          },
        },
        { upsert: true }
      );

      console.log(`Downtime log updated for service: ${service.url}, Uptime percentage: ${uptimePercentage}%`);

      // Determine incident type and severity
      let incidentType = "Outage";
      let priority = "Medium";

      if (uptimePercentage < 80) {
        incidentType = "Performance Degradation";
        priority = uptimePercentage < 65 ? "High" : "Medium";
      } else {
        priority = uptimeLog?.current_downtime_streak > 10 ? "High" : "Medium"; // Example threshold
      }

      // Create or update an incident for the downtime
      await Incident.updateOne(
        { service_id: service._id, status: { $ne: "Resolved" } },
        {
          $set: {
            status: "In Progress",
            incident_type: incidentType,
            description: `Service ${service.url} is experiencing ${incidentType.toLowerCase()}.`,
            priority: priority,
          },
          $setOnInsert: {
            start_time: new Date(),
          },
        },
        { upsert: true }
      );

      console.log(`Incident created/updated for service: ${service.url}`);
    }
  }
};

export default checkServices;
