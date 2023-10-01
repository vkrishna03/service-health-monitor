// Express.js

const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user.model')
const jwt = require('jsonwebtoken')

const {Service, Incident} = require('./models/service.model')

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/service-health-app')

app.post('/api/register', async (req, res) => {
    console.log(req.body)
    try {
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        })
        res.json({status:'ok'})
    } catch (err) {
        console.log(err)
        res.json({status:'error',error: 'Duplicate email'})
    }
})

app.post('/api/login', async (req, res) => {
    const user = await User.findOne({
        email: req.body.email,
        password: req.body.password,
    })


    if (user) {

        const token = jwt.sign({
            name: user.name,
            email: user.email,
        },'k#jU6bl]Yx=Gbw}h@s')
         return res.json({status:'ok', user:true})
    }
    else {
        return res.json({status:'error', user:false})
    }
})


// Mock data insertion on service databse

// Parse the json values for services
// const services = JSON.parse(`[
//     {
//       "name": "Web Service",
//       "status": "up",
//       "uptime": 99.8,
//       "responseTime": 250,
//       "incidents": [
//         "60e4a5f1f3c2d41234a9b7c8",
//         "60e4a61cf3c2d41234a9b7c9"
//       ]
//     },
//     {
//       "name": "Database Service",
//       "status": "degraded",
//       "uptime": 95.2,
//       "responseTime": 500,
//       "incidents": [
//         "60e4a63df3c2d41234a9b7ca",
//         "60e4a65df3c2d41234a9b7cb"
//       ]
//     },
//     {
//       "name": "Email Service",
//       "status": "down",
//       "uptime": 80.5,
//       "responseTime": 1000,
//       "incidents": [
//         "60e4a67ff3c2d41234a9b7cc",
//         "60e4a6a1f3c2d41234a9b7cd"
//       ]
//     }
// ]`);
  
//   // Parse the json values for incidents
// const incidents = JSON.parse(`[
//     {
//       "_id": "60e4a5f1f3c2d41234a9b7c8",
//       "title": "Web Service Outage",
//       "description": "We are experiencing a major outage of our web service due to a network issue. We are working to resolve it as soon as possible.",
//       "service": "60e4a5d0f3c2d41234a9b7c7",
//       "startTime": "2023-07-05T10:00:00.000Z",
//       "endTime": null,
//       "status": "unresolved"
//     },
//     {
//       "_id": "60e4a61cf3c2d41234a9b7c9",
//       "title": "Web Service Performance Degradation",
//       "description": "We are experiencing a performance degradation of our web service due to a high volume of traffic. We are scaling up our resources to handle the load.",
//       "service": "60e4a5d0f3c2d41234a9b7c7",
//       "startTime": "2023-07-04T08:00:00.000Z",
//       "endTime": null,
//       "status": "investigating"
//     }
// ]`);

// const incidents = JSON.parse(`[

//   {
//     "_id": "651863f2422478742e03b9cb",
//     "title": "Service restored after network issue",
//     "description": "We have resolved the network issue that caused the service outage. Our service is now fully operational. We apologize for any inconvenience caused and thank you for your patience and support.",
//     "service": "651863f2422490742e03b9c4",
//     "startTime": "2023-09-24T03:44:00Z",
//     "endTime": null,
//     "status": "resolved"
//   }
//   ]`);


// Service.insertMany(services)

// Incident.insertMany(incidents)

app.get("/api/incidents", async (req, res) => {
    try {
        const incidentData = await Incident.find({})
        res.json({status:"ok", data:incidentData})
    } catch (err) {
        console.log(err);
    }
})

app.get("/api/services", async (req, res) => {
    try {
        const serviceData = await Service.find({})
        res.json({status:"ok", data:serviceData})
    } catch (err) {
        console.log(err);
    }
})

// Search API

app.get("/api/incidents/search/:key", async (req, res) => {
    console.log(req.params.key)
    const data = await Incident.find({
        "$or": [
            { title: { $regex: req.params.key } },
            { description: { $regex: req.params.key } },
        ]
    }

    )
    res.send({status:"ok", data:data})
})

app.get("/api/services/search/:key", async (req, res) => {
    console.log(req.params.key)
    const data = await Service.find({
        "$or": [
            { name: { $regex: req.params.key } },
            { status: { $regex: req.params.key } },
        ]
    }

    )
    res.send({status:"ok", data:data})
})


app.listen(1337, () => {
    console.log('Server started at port 1337')
})