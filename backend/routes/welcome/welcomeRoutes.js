// welcomeRoutes.js
const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const welcomeController = require('../../controllers/welcome/welcomeController');

// Public routes
router.get('/blogs', asyncHandler(welcomeController.wAllBlogPosts));
router.get('/programs', asyncHandler(welcomeController.wAllPrograms));

module.exports = router;
