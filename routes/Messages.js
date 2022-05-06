const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

router.post('/new', messageController.NewMessage);
router.get('/sync', messageController.viewMessage);
router.post('/syncSpecific', messageController.specificMessage);
router.post('/syncSpecificSort', messageController.specificMessageSort);
router.delete('/deleteMessage/:id', messageController.deleteMessage);
router.post('/deleteAll', messageController.deleteAllMessages);

module.exports = router;