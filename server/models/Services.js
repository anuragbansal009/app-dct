const mongoose = require('mongoose');
const { Schema } = mongoose;

const ServicesSchema = new Schema({

    service:{
        type: String,
        required: true,
    },
    charges: {
        type: Number,
        required: true,
    },


})

const Services = mongoose.model('services', ServicesSchema);
module.exports = Services