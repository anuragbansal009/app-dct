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
        
    },
    pin: {
        type: String,
        
    },
    doctor_name: {
        type: String,
        
    },
    allocateid: {
        type: String,
        
    },
    dor: {
        type: String,
        defualt: Date.now(),
    },

    permission: {
        type: String,
        
    },
    occupation: {
        type: String,
        
    },
    medium: {
        type: String,
        
    },
    diagnosis: {
        type: Boolean,
        
    },
    patient_bills: {
        type: String,
        
    },
    patient_appointment: {
        type: String,
        
    },
    patient_notification_alarm: {
        type: String,
        
    },
    patient_diagnosis: {
        type: String,
        
    },
    patient_labtest: {
        type: String,
        
    },
    patient_vitals: {
        type: String,
        
    },
    patient_complaints: {
        type: String,
        
    },
    patient_history_diagnosis: {
        type: String,
        
    },
    patient_diagnosis_duration: {
        type: String,
        
    },
    patient_medicines: {
        type: String,
        
    },
    patient_dose: {
        type: String,
        
    },
    patient_notes: {
        type: String,
        
    },
    patient_advice: {
        type: String,
        
    },
    patient_instruction: {
        type: String,
        
    },
    patient_nextvisit: {
        type: String,
        
    },



})

const Patient = mongoose.model('patient', PatientSchema);
module.exports = Patient