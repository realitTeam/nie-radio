// adminRoutes.js
const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const adminController = require('../../controllers/admin/adminController');
const recordingController = require('../../controllers/recordings/recordingController');

router.get('/moderators', asyncHandler(adminController.aViewModerators))
router.get('/students', asyncHandler(adminController.aViewStudents))
router.put('/moderators/status/:_email', asyncHandler(adminController.aChangeModeratorStatus));
router.put('/students/status/:_email', asyncHandler(adminController.aChangeStudentStatus))
router.post('/moderators/store', asyncHandler(adminController.aStoreModerator))
router.post('/students/store', asyncHandler(adminController.aStoreStudent))
router.get('/recordings', asyncHandler(recordingController.rAllRecordings))
router.post('/recordings/store', asyncHandler(adminController.aStoreRecording))
router.get('/tickets', asyncHandler(adminController.aListTickets))
router.post('/tickets/reply', asyncHandler(adminController.aTicketReply))
router.post('/blogs/store', asyncHandler(adminController.aStoreBlogPost))
router.post('/playlist/store', asyncHandler(adminController.aStorePlaylistAudio))

module.exports = router;