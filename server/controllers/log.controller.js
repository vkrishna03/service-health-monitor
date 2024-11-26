import UptimeLog from "../models/uptimeLog.model.js";
import Service from "../models/service.model.js";

export const getLogs = async (req, res) => {
  try {
    const logs = await UptimeLog.find({});
    const logsWithDetails = await Promise.all(
      logs.map(async (log) => {
        const service = await Service.findById(log.service_id);
        return {
          serviceName: service.name,
          uptimePercentage: log.uptime_percentage,
          downtime: log.downtime_duration,
        };
      })
    );
    res.json(logsWithDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
