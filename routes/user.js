const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');

router.post('/register', userController.register);

router.post('/activation', userController.activateEmail);

router.post('/login', userController.login);

router.post('/refreshToken', userController.getAccessToken);

router.post('/forgot', userController.forgotPassword);

router.post('/reset', auth, userController.resetPassword);

router.get('/info', auth, userController.getUserInfo);

router.get('/allInfo', auth, authAdmin, userController.getUsersAllinfo);

router.get('/logout', userController.logout);

router.patch('/update', auth, userController.updateUser);

router.patch('/updateRole/:id', auth, authAdmin, userController.updateUsersRole);

router.delete('/delete/:id', auth, authAdmin, userController.deleteUser);

router.post('/google_login', userController.googleLogin);

router.post('/addVehicle', userController.addVehicle);

router.get('/viewVehicle', userController.viewVehicle);

router.get('/addVehicleDb/:id', userController.addVehicleDB);

router.get('/deleteVehicle/:id', userController.deleteVehicle);

module.exports = router;