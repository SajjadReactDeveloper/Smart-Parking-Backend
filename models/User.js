const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Your Name"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please Enter Your Password"],
    },
    role: {
        type: Number,
        default: 0
    },
    avatar: {
        type: String,
        default: "https://res.cloudinary.com/djhdfdrld/image/upload/v1642513628/sample.jpg"
    },
    message: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Users', userSchema)