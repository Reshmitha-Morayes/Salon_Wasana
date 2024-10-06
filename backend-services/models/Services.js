const mongoose = require('mongoose')

const ServiceSchema = new mongoose.Schema({
    ServiceID: String,
    ServiceType: String, 
    ServiceName: String, 
    Description: String, 
    Price: Number,
    Image: String,
    DateCreated: String
});


const ServiceModel = mongoose.model("services", ServiceSchema)
module.exports = ServiceModel