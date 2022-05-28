const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    SlotNo: {
        type: String,
        required: [true, "Please Enter Slot Number"],
        trim: true
    },
    StartTime: {
        type: String,
        required: [true, "Please Enter Start Time"],
        trim: true
    },
    EndTime: {
        type: String,
        required: [true, "Please Enter End Time"],
        trim: true
    },
    userId: {
        type: String,
        required: [true, "Please Enter User Id"],
        trim: true
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('Booking', bookingSchema)