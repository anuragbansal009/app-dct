const mongoose = require('mongoose');
const { Schema } = mongoose;

const AdminSchema = new Schema({

    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    regdate: {
        type: Date,
        default: Date.now
    },
    occupation: {
        type: String,
        required: true,
    },
    allocateid: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true
    },
    account_type: {
        type: String,
        required: true
    },
    credits: {
        type: String,
        required: true
    },
    pid: {
        type: String,
        required: true
    }, 
    did: {
        type: String,
        required: true
    }

})

const Admin = mongoose.model('admin', AdminSchema);
module.exports = Admin