const express = require('express');
const uploadImage = require('../middleware/uploadImage');
const uploadAvatar = require('../controllers/uploadImage')
const router = express.Router();
const auth = require('../middleware/auth');

router.post('/uploadAvatar', uploadImage, auth, uploadAvatar.uploadAvatar);

module.exports = router;