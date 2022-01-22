const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const vehicleSchema = new Schema({
    number: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    ownerName: {
        type: String,
        required: true
    },
    ownerCNIC: {
        type: String,
        required: true
    },
    bookFrontImage: {
        type: String,
        default: "https://res.cloudinary.com/djhdfdrld/image/upload/v1642513628/sample.jpg"
    },
    bookBackImage: {
        type: String,
        default: "https://res.cloudinary.com/djhdfdrld/image/upload/v1642513628/sample.jpg"
    }
})

const model = mongoose.model('DummyVehicle', vehicleSchema);
module.exports = model;