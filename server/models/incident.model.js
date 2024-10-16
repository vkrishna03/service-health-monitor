import mongoose from "mongoose";

const IncidentSchema = new mongoose.Schema({
  service_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
    required: true,
  },
  status: {
    type: String,
    enum: ["Open", "In Progress", "Resolved"],
    required: true,
  },
  incident_type: {
    type: String,
    enum: ["Outage", "Performance Degradation"],
    required: true,
  },
  description: { type: String },
  start_time: { type: Date, default: Date.now },
  end_time: { type: Date },
  priority: { type: String, enum: ["High", "Medium", "Low"], required: true },
  duration: { type: Number },
});

// Export the incident model
const Incident = mongoose.model("Incident", IncidentSchema);
export default Incident;
