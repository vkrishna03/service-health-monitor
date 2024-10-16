import Service from "../models/service.model.js";
import ServiceStatus from "../models/serviceStatus.model.js";
import UptimeLog from "../models/uptimeLog.model.js";
import Incident from "../models/incident.model.js";

export const getDashboardMetrics = async (req, res) => {
  try {
    const totalServices = await Service.countDocuments({ user: req.user._id });
    const activeIncidentsCount = await Incident.countDocuments({
      status: "Open",
    });
    const averageResponseTime = await ServiceStatus.aggregate([
      {
        $group: {
          _id: null,
          averageResponseTime: { $avg: "$response_time" },
        },
      },
    ]);
    const uptimeLogs = await UptimeLog.find({});
    const overallUptimePercentage =
      uptimeLogs.reduce((acc, log) => acc + log.uptime, 0) / uptimeLogs.length;

    res.json({
      totalServices,
      activeIncidentsCount,
      averageResponseTime: averageResponseTime[0]?.averageResponseTime || 0,
      overallUptimePercentage,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getIncidentsSummary = async (req, res) => {
  try {
    const summary = await Incident.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const incidentsSummary = summary.reduce(
      (acc, item) => {
        acc[item._id.toLowerCase()] = item.count;
        return acc;
      },
      { open: 0, inProgress: 0, resolved: 0 }
    );

    res.json(incidentsSummary);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getRecentServiceChecks = async (req, res) => {
  try {
    const recentChecks = await ServiceStatus.find({ user: req.user._id })
      .populate("service_id", "name")
      .sort({ checked_at: -1 })
      .limit(5);

    const formattedChecks = recentChecks.map((check) => ({
      serviceName: check.service_id.name,
      status: check.status,
      checkedAt: check.checked_at,
      responseTime: check.response_time,
    }));

    res.json(formattedChecks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
