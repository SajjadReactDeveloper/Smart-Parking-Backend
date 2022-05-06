const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    regNo: {
        type: String,
        required: [true, "Please Enter Car Registration No"],
        trim: true,
        unique: true
    },
    brand: {
        type: String,
        required: [true, "Please Enter Brand"],
        trim: true,
    },
    model: {
        type: String,
        required: [true, "Please Enter Model"],
    },
    color: {
        type: String,
        required: [true, "Please Enter Color"]
    },
    bookImage: {
        type: String,
        default: "https://res.cloudinary.com/djhdfdrld/image/upload/v1642513628/sample.jpg"
    },
    ownerName: {
        type: String,
        required: true
    },
    ownerId: {
        type: String,
        required: true
    },
    ownerAvatar: {
        type: String,
        required: true
    },
    carImage: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Cars', carSchema)