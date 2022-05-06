const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    sender: String,
    receiver: String,
    message: String,
    received: Boolean,
    Hours: Number,
    Minutes: String
}, {
    timestamps: true
})

module.exports = mongoose.model('Message', messageSchema)