const express = require('express');
const router = express.Router();
const complaintController = require('../controllers/complaintController');

router.post('/addComplaint', complaintController.addComplaint);
router.get('/viewComplaint', complaintController.viewComplaint);
router.get('/viewAllComplaint', complaintController.viewAllComplaint);
router.get('/viewSpecificComplaint/:id', complaintController.viewSpecificComplaint);
router.get('/getStatus/:id', complaintController.getStatus);
router.delete('/deleteComplaint/:id', complaintController.deleteComplaint);
router.patch('/changeStatus/:id', complaintController.changeStatus);

router.get('/a', complaintController.a);

module.exports = router;