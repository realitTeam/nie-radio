// studentRoutes.js
const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const studentController = require('../../controllers/student/studentController');

router.post('/ticket/store', asyncHandler(studentController.sStoreChatContent))
router.get('/tickets/:_email', asyncHandler(studentController.sListTickets))

module.exports = router;