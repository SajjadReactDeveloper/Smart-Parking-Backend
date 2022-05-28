const Car = require('../models/CarRequest');
const ApprovedCars = require('../models/ApprovedCars');

exports.addCar = async (req, res) => {
    try {
        const {regNo, brand, model, color, ownerName, ownerId, ownerAvatar, carImage} = req.body;
        console.log(regNo, brand, model, color, ownerId, carImage)
        const newCar = new Car({
            regNo, brand, model, color, ownerName, ownerId, ownerAvatar, carImage
        })
        newCar.save();
        console.log(newCar)
        res.json({msg: "Your Request has been send"})
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}

exports.viewCar = async (req, res) => {
    try {
        const car = await Car.find();
        res.json(car)
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}

exports.viewSpecificUserCar = async (req, res) => {
    try {
        const { ownerId } = req.body;
        const car = await Car.find({ownerId: ownerId});
        res.json(car)
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}

exports.viewApprovedCar = async (req, res) => {
    try {
        const car = await ApprovedCars.find();
        res.json(car)
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}

exports.viewSpecificUserApprovedCar = async (req, res) => {
    try {
        const { ownerId } = req.body;
        const car = await ApprovedCars.find({ownerId: ownerId});
        res.json(car)
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}

exports.deleteCar = async (req, res) => {
    try {
        await Car.findByIdAndDelete(req.params.id)
        res.json({msg: "Deleted"})
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}

exports.deleteApprovedCar = async (req, res) => {
    try {
        await ApprovedCars.findByIdAndDelete(req.params.id)
        res.json({msg: "Deleted"})
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}

exports.approvedCars = async(req, res) => {
    try {
        const {id, regNo, brand, model, color, ownerName, ownerId, ownerAvatar, carImage} = req.body;

        const newCar = new ApprovedCars({
            regNo, brand, model, color, ownerName, ownerId, ownerAvatar, carImage
        })
        newCar.save();
        console.log(newCar);
        await Car.deleteOne({_id: id});
        res.json({msg: "Your Car has been Registered"})
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}