const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const moderatorController = require('../../controllers/moderator/moderatorController');

router.get('/students', asyncHandler(moderatorController.viewStudents))

module.exports = router;