const mongoose = require('mongoose');
const { Schema } = mongoose;

const ServicesSchema = new Schema({

    service:{
        type: String,
        required: true,
    },
    doctor_name: {
        type: String,
        required: true,
    },
    charges: {
        type: Number,
        required: true,
    },
    gst: {
        type: Number,
    },


})

const Services = mongoose.model('services', ServicesSchema);
module.exports = Services