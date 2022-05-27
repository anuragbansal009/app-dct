const mongoose = require('mongoose');
const { Schema } = mongoose;

const PatientSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    bloodgroup: {
        type: String,
        required: true
    },
    opd_number: {
        type: String,
        
    },
    city: {
        type: String,
        required: true
    },
    pin: {
        type: String,
        
    },
    doctor_name: {
        type: String,
        required: true
    },
    dor: {
        type: String,
        defualt: Date.now(),
    },


})

const Patient = mongoose.model('patient', PatientSchema);
module.exports = Patient