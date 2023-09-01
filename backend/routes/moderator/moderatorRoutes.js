// // moderatorRoutes.js
const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const moderatorController = require('../../controllers/moderator/moderatorController');

router.get('/reff/:_email', asyncHandler(moderatorController.mRefCode))
router.post('/students/store', asyncHandler(moderatorController.mStoreStudent))
router.get('/students/:_email', asyncHandler(moderatorController.mViewStudents))
// router.put('/students/status/:_email', asyncHandler(moderatorController.mChangeStudentStatus))

module.exports = router;