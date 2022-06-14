const mongoose = require('mongoose');
const { Schema } = mongoose;

const LabtestSchema = new Schema({

    labtest:{
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


})

const Labtest = mongoose.model('labtest', LabtestSchema);
module.exports = Labtest