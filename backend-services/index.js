const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const ServiceModel = require('./models/Services')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/Salon")

app.get('/', (req,res) => {
    ServiceModel.find({})
    .then(service => res.json(service))
    .catch(err => res.json(err))
})

app.get('/getService/:id', (req,res) => {
    const id = req.params.id;
    ServiceModel.findById({_id:id})
    .then(service => res.json(service))
    .catch(err => res.json(err))
})

app.put("/UpdateService/:id", (req,res) => {
    const id = req.params.id;
    ServiceModel.findByIdAndUpdate({_id:id}, {
        ServiceID: req.body.ServiceID,
        ServiceType: req.body.ServiceType, 
        ServiceName: req.body.ServiceName, 
        Description: req.body.Description, 
        Price: req.body.Price,
        DateCreated: req.body.DateCreated
    },{new:true})

    .then(service => res.json(service))
    .catch(err => res.json(err))
})

app.delete('/deleteUser/:id', (req,res) => {
    const id = req.params.id;
    ServiceModel.findByIdAndDelete({_id:id})
    .then(res => res.json(res))
    .catch(err => res.json(err))
})

app.post("/CreateService", (req,res) => {
    const { ServiceID, ServiceType, ServiceName, Description, Price, Image, DateCreated } = req.body;
    ServiceModel.create({ ServiceID, ServiceType, ServiceName, Description, Price, Image, DateCreated })
    .then(service => res.json(service))
    .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while creating the service' });
    });
});



app.listen(3000, () => {
    console.log("Server is Running")
})