const express = require('express');
const router = express.Router();
const CarController = require('../controllers/carContoller');

router.post('/addCar', CarController.addCar);
router.get('/viewCar', CarController.viewCar);
router.post('/viewSpecificUserCar', CarController.viewSpecificUserCar);
router.get('/viewApprovedCar', CarController.viewApprovedCar);
router.post('/viewSpecificUserApprovedCar', CarController.viewSpecificUserApprovedCar);
router.delete('/deleteCar/:id', CarController.deleteCar);
router.delete('/deleteApprovedCar/:id', CarController.deleteApprovedCar);
router.post('/approveCar', CarController.approvedCars);

module.exports = router;