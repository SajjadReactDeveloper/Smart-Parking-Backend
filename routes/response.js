const express = require('express');
const router = express.Router();
const responseController = require('../controllers/responseController');

router.post('/addResponse', responseController.addResponse);
router.post('/viewResponse', responseController.viewSpecificResponse);

module.exports = router;