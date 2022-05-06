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
router.get('/getInfo/:id', userController.getSpecificUser);

router.get('/allInfo', auth, authAdmin, userController.getUsersAllinfo);

router.patch('/updateMessage/:id', userController.updateUserMessage);

router.patch('/updateMessageFalse/:id', userController.updateUserMessageFalse);

router.get('/logout', userController.logout);

router.patch('/update', auth, userController.updateUser);

router.patch('/updateRole/:id', auth, authAdmin, userController.updateUsersRole);

router.delete('/delete/:id', userController.deleteUser);

router.post('/google_login', userController.googleLogin);
router.post('/facebook_login', userController.facebookLogin);


module.exports = router;