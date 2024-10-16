import UptimeLog from "../models/uptimeLog.model.js";

export const getLogs = async (req, res) => {
  try {
    const { serviceId, dateRangeStart, dateRangeEnd } = req.query;
    const query = {};

    if (serviceId) query.serviceId = serviceId;
    if (dateRangeStart && dateRangeEnd) {
      query.date = {
        $gte: new Date(dateRangeStart),
        $lte: new Date(dateRangeEnd),
      };
    }

    const logs = await UptimeLog.find(query).sort({ date: -1 });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
