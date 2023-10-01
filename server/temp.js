const mongoose = require('mongoose')
const {Service, Incident} = require('./models/service.model')
mongoose.connect('mongodb://127.0.0.1.27017/service-health-app')

// Parse the json values for services

  
  // Parse the json values for incidents
const incidents = JSON.parse(`[{
  "_id": "651863f2422490742e03b9ca",
  "title": "Maintenance downtime scheduled for our service",
  "description": "We will be performing a scheduled maintenance on our service on September 25, 2023, from 10:00 AM to 12:00 PM UTC. During this time, our service will be unavailable. This maintenance is necessary to improve the stability and performance of our service. We apologize for any inconvenience caused and thank you for your cooperation.",
  "service": "651863f2422490742e03b9c4",
  "startTime": null,
  "endTime": null,
  "status": null,
}
,

{
  "_id": "651863f2422490742e03b9cb",
  "title": "Service restored after network issue",
  "description": "We have resolved the network issue that caused the service outage. Our service is now fully operational. We apologize for any inconvenience caused and thank you for your patience and support.",
  "service": "651863f2422490742e03b9c4",
  "startTime": null,
  "endTime": null,
  status: 'resolved',
}
,
{
  "_id": "651863f2422490742e03b9c9",
  "title": "Security breach detected on our service",
  "description": "We have detected a security breach on our service that may have compromised some of your data. We have taken immediate steps to contain the breach and secure our systems. We are conducting a thorough investigation and will notify you of any updates. We urge you to change your password and enable two-factor authentication on your account. We sincerely apologize for any inconvenience and concern caused.",
  "service": "651863f2422490742e03b9c6",
  "startTime": "2023-09-24T06:00:00Z",
  "endTime": null,
  "status": "investigating",
}
,]`)


Incident.insertMany(incidents)
    .then(result => {
        console.log(result);
    })
    .catch(error => {
        console.error(error);
    }
)


// {query != '' ? `http://localhost:1337/api/services/search/${query}` : "http://localhost:1337/api/services"}