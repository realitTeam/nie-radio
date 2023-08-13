const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const authController = require('../../controllers/auth/authController');
const auth = require('../../middleware/auth/authMiddleware');

router.post('/m', asyncHandler(authController.moderatorRegister))
router.post('/register', asyncHandler(authController.studentRegister))
router.post('/login', asyncHandler(authController.userLogin))
router.post('/logout', asyncHandler(authController.userLogout))

module.exports = router;