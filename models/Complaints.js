const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
    category: {
        type: String,
        required: [true, "Please Enter Complaint Category"],
        trim: true
    },
    subCategory: {
        type: String,
        required: [true, "Please Enter Complaint Sub Category"],
        trim: true,
    },
    type: {
        type: String,
        required: [true, "Please Enter Type"],
    },
    title: {
        type: String,
        required: [true, "Please Enter Title"]
    },
    description: {
        type: String,
        required: [true, "Please Enter Description"]
    },
    status: {
        type: String,
        default: "Active"
    },
    userId: {
        type: String,
        required: [true, "Please Enter User Id"]
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Complaint', complaintSchema)