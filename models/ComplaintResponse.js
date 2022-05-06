const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: [true, "Please Enter User Id"],
        trim: true
    },
    complaintId: {
        type: String,
        required: [true, "Please Enter Complaint Id"],
        trim: true,
    },
    response: {
        type: String,
        required: [true, "Please Enter Model"],
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('ComplaintResponse', carSchema)