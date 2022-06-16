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
    age: {
        type: Number,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    bloodgroup: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    allocateid: {
        type: String,
        required: true
    },
    position: {
        type: Number,
        required: true
    },
    pin: {
        type: Number,

    },
    weight: {
        type: Number,
    },
    height: {
        type: Number,
    },
    bmi: {
        type: Number,
    },
    status: {
        type: String
    },
    slotdate: {
        type: String
    },
    time: {
        type: String
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