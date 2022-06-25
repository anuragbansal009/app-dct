const mongoose = require('mongoose');
const { Schema } = mongoose;

const PatientSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
    },
    age: {
        type: Number,
    },
    mobile: {
        type: Number,
        required: true
    },
    bloodgroup: {
        type: String,
    },
    city: {
        type: String,
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
    status: {
        type: String
    },
    slotdate: {
        type: String
    },
    time: {
        type: String
    },
    vitals: {
        type: Array,
    },
    labtests: {
        type: Array,
        default: "Empty"
    },
    services: {
        type: Array,
        default: "Empty"
    },
    doctor_name: {
        type: String,
        required: true
    },
    followup: {
        type: Boolean,
        default: false
    },
    dor: {
        type: String,
        defualt: Date.now(),
    },


})

const Patient = mongoose.model('patient', PatientSchema);
module.exports = Patient