import mongoose from "mongoose";

const serviceStatusSchema = new mongoose.Schema({
  service_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
    required: true,
  },
  status: { type: String, enum: ["UP", "DOWN", "TIMEOUT"], required: true },
  checked_at: { type: Date, default: Date.now },
  response_time: { type: Number },
  message: { type: String },
});

const ServiceStatus = mongoose.model("ServiceStatus", serviceStatusSchema);
export default ServiceStatus;
