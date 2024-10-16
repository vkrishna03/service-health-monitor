import mongoose from "mongoose";

const uptimeLogSchema = new mongoose.Schema({
  service_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
    required: true,
  },
  date: { type: Date, default: Date.now },
  uptime_percentage: { type: Number },
  downtime_duration: { type: Number }, // in minutes
  total_checks: { type: Number },
  up_checks: { type: Number },
  down_checks: { type: Number },
});

const UptimeLog = mongoose.model("UptimeLog", uptimeLogSchema);
export default UptimeLog;
