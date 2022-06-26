const mongoose = require('mongoose');
const { Schema } = mongoose;

const DoctorSchema = new Schema({

    username:{
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    hospital_name: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    allocateid: {
        type: String,
        required: true
    },
    specialization:{
        type: String,
        required: true
    },
    followup:{
        type: Number,
    },


})

const Doctor = mongoose.model('doctor', DoctorSchema);
module.exports = Doctor