const mongoose = require('mongoose');
const { Schema } = mongoose;

const BillSchema = new Schema({


    name: {
        type: String,
        required: true,
    },
    doctor_name: {
        type: String,
        required: true
    },
    charges: {
        type: String,
        required: true,
    },
    consultation: {
        type: String,
        required: true,
    },
    
    date: {
        type: String,
        default: Date.now,
    }

})

const Bill = mongoose.model('bill', BillSchema);
module.exports = Bill