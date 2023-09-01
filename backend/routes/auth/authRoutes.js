// authRoutes.js
const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const authController = require('../../controllers/auth/authController');
const auth = require('../../middleware/auth/authMiddleware');

// Public routes
router.post('/login', asyncHandler(authController.userLogin));
router.post('/logout', asyncHandler(authController.userLogout));
router.post('/m', asyncHandler(authController.moderatorRegister))
router.post('/register', asyncHandler(authController.studentRegister))

// Protected routes for specific roles
router.post('/register/student', asyncHandler(authController.studentRegister));
router.post('/register/moderator', asyncHandler(authController.moderatorRegister));

module.exports = router;
