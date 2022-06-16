const mongoose = require('mongoose');
const { Schema } = mongoose;

const BillSchema = new Schema({


    name: {
        type: String,
        required: true,
    },
    gender:{
        type: String,
        required: true,
    },
    doctor_name: {
        type: String,
        required: true
    },
    consultation: {
        type: String,
    },
    mobile: {
        type: Number,
        required: true
    },
    medicines: {
        type: String,
    },
    advice: {
        type: String,

    },
    nextvisit: {
        type: String,
    },
    labcharges: {
        type: Array,
    },
    discount: {
        type: Number,
    },
    labtests: {
        type: Array,
    },
    allocateid: {
        type: String,
        required: true
    },
    totalamount:{
        type: String,
    },
    patientid: {
        type: String,
    },
    date: {
        type: String,
        default: Date.now,
    }

})

const Bill = mongoose.model('bill', BillSchema);
module.exports = Bill