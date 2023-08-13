const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const listenController = require('../../controllers/listen/listenController');

router.get('/listen/live', asyncHandler(listenController.Listen))

module.exports = router;
