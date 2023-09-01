// adminController.js
require("dotenv").config();

const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const Recording = require("../../models/recording/RecordingModel");

//-------------------------------------------------------------------------------------------------------
const rAllRecordings = asyncHandler(async (req, res) => {
  const recordings = await Recording.find().lean();
  if (!recordings?.length) {
    return res.status(400).json({ message: 'No Recording is found.' });
  }
  res.json(recordings);
});

//-------------------------------------------------------------------------------------------------------
module.exports = {
  rAllRecordings
};