// adminRoutes.js
const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const adminController = require('../../controllers/admin/adminController');

router.get('/moderators', asyncHandler(adminController.viewModerators))
router.get('/students', asyncHandler(adminController.viewStudents))
router.put('/moderators/{_id}/status', asyncHandler(adminController.changeModeratorStatus))
router.put('/students/{_id}/status', asyncHandler(adminController.changeStudentStatus))
router.post('/moderators/store', asyncHandler(adminController.storeRegister))

module.exports = router;