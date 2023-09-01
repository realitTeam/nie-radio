// protectedRoutes.js
const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const authController = require('../../controllers/auth/authController');

router.get('/:username/details', asyncHandler(authController.loggedUserDetails))

module.exports = router;