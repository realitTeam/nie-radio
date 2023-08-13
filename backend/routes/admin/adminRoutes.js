const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const adminController = require('../../controllers/admin/adminController');

router.get('/moderators', asyncHandler(adminController.viewModerators))

module.exports = router;