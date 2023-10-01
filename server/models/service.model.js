// Import mongoose module
const mongoose = require('mongoose');

// Define the service schema
const serviceSchema = new mongoose.Schema({
  name: { // The name of the service
    type: String,
    required: true,
    unique: true
  },
  status: { // The current status of the service
    type: String,
    enum: ['up', 'down', 'degraded'],
    required: true
  },
  uptime: { // The percentage of uptime in the last 24 hours
    type: Number,
    min: 0,
    max: 100,
    required: true
  },
  responseTime: { // The average response time in milliseconds
    type: Number,
    min: 0,
    required: true
  },
  incidents: [{ // The list of incidents related to the service
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Incident'
  }]
});

// Define the incident schema
const incidentSchema = new mongoose.Schema({
  title: { // The title of the incident
    type: String,
    required: true
  },
  description: { // The description of the incident
    type: String,
    required: true
  },
  service: { // The service affected by the incident
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: true
  },
  startTime: { // The start time of the incident
    type: Date,
    required: true
  },
  endTime: { // The end time of the incident
    type: Date
  },
  status: { // The current status of the incident
    type: String,
    enum: ['resolved', 'unresolved', 'investigating'],
    required: true
  }
});

// Export the service and incident models
module.exports = {
  Service: mongoose.model('Service', serviceSchema),
  Incident: mongoose.model('Incident', incidentSchema)
};
