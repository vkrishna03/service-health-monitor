import Incident from "../models/incident.model.js";

export const getAllIncidents = async (req, res) => {
  try {
    const incidents = await Incident.find({});
    res.json(incidents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createIncident = async (req, res) => {
  try {
    const { serviceId, type, priority, assignedTo, description } = req.body;
    const newIncident = new Incident({
      serviceId,
      type,
      status: "Open",
      startTime: new Date(),
      priority,
      assignedTo,
      description,
    });

    const savedIncident = await newIncident.save();
    res.status(201).json(savedIncident);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateIncident = async (req, res) => {
  try {
    const { status, endTime, duration, priority, assignedTo, description } =
      req.body;
    const updatedIncident = await Incident.findByIdAndUpdate(
      req.params.incidentId,
      {
        status,
        endTime,
        duration,
        priority,
        assignedTo,
        description,
      },
      { new: true }
    );

    res.json(updatedIncident);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
