import Service from "../models/service.model.js";
import ServiceStatus from "../models/serviceStatus.model.js";
import UptimeLog from "../models/uptimeLog.model.js";
import Incident from "../models/incident.model.js";

export const createService = async (req, res) => {
  try {
    const services = req.body.services; // Expecting an array of services in the request body
    if (!Array.isArray(services)) {
      return res
        .status(400)
        .json({ error: "Request body should contain an array of services" });
    }
    const createdServices = await Service.insertMany(services);
    console.log(
      "Services created with ids: ",
      createdServices.map((service) => service._id)
    );
    res.status(201).json(createdServices);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllServices = async (req, res) => {
  try {
    const services = await Service.find({ user: req.user._id });
    const servicesWithMetrics = await Promise.all(
      services.map(async (service) => {
        const uptimeLog = await UptimeLog.findOne({ service_id: service._id });
        const latestStatus = await ServiceStatus.findOne({
          service_id: service._id,
        }).sort({ checked_at: -1 });
        return {
          serviceName: service.name,
          status: latestStatus?.status || "UNKNOWN",
          uptimePercentage: uptimeLog?.uptime_percentage || 0,
          averageResponseTime: uptimeLog.total_checks
            ? uptimeLog.up_checks / uptimeLog.total_checks
            : 0,
          lastchecked: latestStatus?.checked_at || "UNKNOWN",
        };
      })
    );

    res.json(servicesWithMetrics);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getServiceDetails = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    const uptimeLog = await UptimeLog.findOne({ service_id: service._id });
    const latestStatus = await ServiceStatus.findOne({
      service_id: service._id,
    }).sort({ checked_at: -1 });
    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }
    res.json({
      serviceName: service.name,
      url: service.url,
      currentStatus: latestStatus?.status || "UNKNOWN",
      uptimePercentage: uptimeLog?.uptime_percentage || 0,
      averageResponseTime: uptimeLog.total_checks
        ? uptimeLog.up_checks / uptimeLog.total_checks
        : 0,
      lastchecked: latestStatus?.checked_at || "UNKNOWN",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getServiceStatusHistory = async (req, res) => {
  try {
    const statusHistory = await ServiceStatus.find({
      service_id: req.params.id,
    }).sort({ checked_at: -1 });

    res.json(statusHistory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getRelatedIncidents = async (req, res) => {
  try {
    const incidents = await Incident.find({ service_id: req.params.id });
    res.json(incidents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
