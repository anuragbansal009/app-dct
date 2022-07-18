const mongoose = require('mongoose');
const { Schema } = mongoose;

const OtherServicesSchema = new Schema({

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

const Otherservices = mongoose.model('otherservices', OtherServicesSchema);
module.exports = Otherservices