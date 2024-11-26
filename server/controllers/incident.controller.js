import Incident from "../models/incident.model.js";
import Service from "../models/service.model.js";

export const getAllIncidents = async (req, res) => {
  try {
    const incidents = await Incident.find({});
    const incidentsWithDetails = await Promise.all(
      incidents.map(async (incident) => {
        const service = await Service.findById(incident.service_id);
        return {
          serviceName: service.name,
          status: incident.status,
          type: incident.incident_type,
          priority: incident.priority,
          startTime: incident.start_time,
          endTime: incident.end_time,
          duration: incident.duration,
        };
      })
    );
    res.json(incidentsWithDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
