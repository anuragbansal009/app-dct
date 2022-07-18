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
    mobile: {
        type: Number,
        required: true
    },
    labcharges: {
        type: Array,
    },
    discount: {
        type: Array,
    },
    totalDiscount: {
        type: Number,
    },
    billDiscount: {
        type: Number,
    },
    totalrefund: {
        type: Number,
    },
    followup: {
        type: Boolean
    },
    payment: {
        type: Number,
    },
    paymentmode: {
        type: String,
    },
    subtotal: {
        type: Number,
    },
    labtests: {
        type: Array,
    },
    allocateid: {
        type: String,
        required: true
    },
    patientid: {
        type: String,
    },
    refundarr: {
        type: Array,
    },
    date: {
        type: String,
        default: Date.now,
    }

})

const Bill = mongoose.model('bill', BillSchema);
module.exports = Bill