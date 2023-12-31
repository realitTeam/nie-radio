// adminController.js
require("dotenv").config();
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const Moderator = require("../../models/users/ModeratorModel");
const Student = require("../../models/users/StudentModel");
const Login = require("../../models/login/LoginModel");
const Recording = require("../../models/recording/RecordingModel");
const Chat = require("../../models/chat/ChatModel");
const Playlist = require("../../models/playlist/PlaylistModel");

//-------------------------------------------------------------------------------------------------------
const aViewModerators = asyncHandler(async (req, res) => {
  const moderators = await Moderator.find().select('-password').lean();
  if (!moderators?.length) {
    return res.status(400).json({ message: 'No moderator is found.' });
  }
  res.json(moderators);
});

//-------------------------------------------------------------------------------------------------------
const aChangeModeratorStatus = asyncHandler(async (req, res) => {
  const moderator_email = req.params._email;
  const moderator = await Moderator.findOne({ organization_email: moderator_email });
  if (!moderator) {
    return res.status(404).json({ message: "Moderator not found" });
  }
  const login = await Login.findOne({ username: moderator_email });
  moderator.moderator_status = moderator.moderator_status === "active" ? "inactive" : "active";
  await moderator.save();
  login.status = login.status === "active" ? "inactive" : "active";
  await login.save();
  res.status(200).json({ message: "Moderator status updated successfully" });
});

//-------------------------------------------------------------------------------------------------------
const aViewStudents = asyncHandler(async (req, res) => {
  const students = await Student.find().select('-password').lean();
  if (!students?.length) {
    return res.status(400).json({ message: 'No student is found.' });
  }
  res.json(students);
});

//-------------------------------------------------------------------------------------------------------
const aChangeStudentStatus = asyncHandler(async (req, res) => {
  const student_email = req.params._email;
  const student = await Student.findOne({ student_email: student_email });
  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }
  const login = await Login.findOne({ username: student_email });
  student.student_status = student.student_status === "active" ? "inactive" : "active";
  await student.save();
  login.status = login.status === "active" ? "inactive" : "active";
  await login.save();
  res.status(200).json({ message: "Student status updated successfully" });
});

//-------------------------------------------------------------------------------------------------------
const aStoreModerator = asyncHandler(async (req, res) => {
  const {
    organization_name,
    organization_address,
    province,
    district,
    organization_email,
    organization_phone,
    principal_name,
    principal_email,
    principal_phone,
    refferal_code
  } = req.body;
  var password = '12345678'
  if (!organization_name || !organization_address || !province || !district || !organization_email || !organization_phone || !principal_name || !principal_email || !principal_phone) {
    return res.status(400).json({ message: "All fields are required." });
  }
  const duplicate_moderator = await Moderator.findOne({ organization_email })
    .lean()
    .exec();
  if (duplicate_moderator) {
    return res.status(409).json({
      message: "Moderator already exist, Please use different email.",
    });
  }
  const duplicate_refCode = await Moderator.findOne({ refferal_code })
    .lean()
    .exec();
  if (duplicate_refCode) {
    return res.status(409).json({ message: "Refresh & try again." });
  }
  const hashedPW = await bcrypt.hash(password, 10);
  const moderator_status = "active";
  const moderatorObject = {
    organization_name,
    organization_address,
    province,
    district,
    organization_email,
    organization_phone,
    principal_name,
    principal_email,
    principal_phone,
    refferal_code,
    password: hashedPW,
    moderator_status: moderator_status,
  };
  const role = "moderator";
  const moderatorLoginObject = {
    username: organization_email,
    password: hashedPW,
    role: role,
    status: moderator_status,
  };
  const moderator = await Moderator.create(moderatorObject);
  const modLogin = await Login.create(moderatorLoginObject);
  if (moderator) {
    res.status(201).json({
      message: `Moderator successfully registered!`,
    });
  } else {
    res.status(400).json({ message: `Error occurred` });
  }
});

//-------------------------------------------------------------------------------------------------------
const aStoreStudent = asyncHandler(async (req, res) => {
  const {
    refferal_code,
    student_name,
    student_id,
    student_grade,
    student_email,
    student_phone
  } = req.body;
  const password = '76543210'
  // validating inputs
  if (!student_email) {
    return res.status(400).json({ message: "All fields are required." });
  }
  // validating refferal code
  const ref_code = await Moderator.findOne({ refferal_code }).lean().exec();
  if (!ref_code) {
    return res.status(401).json({ message: "Invalid Reference ID." });
  }
  // checking existing users
  const duplicate_email = await Student.findOne({ student_email }).lean().exec();
  if (duplicate_email) {
    return res.status(409).json({ message: "Student already exist." });
  }
  const moderator_id = ref_code._id;
  const hashedPW = await bcrypt.hash(password, 10);
  const student_status = "active";
  const studentObject = {
    moderator: moderator_id,
    refferal_code,
    student_name,
    student_id,
    student_grade,
    student_email,
    student_phone,
    password: hashedPW,
    student_status: student_status,
  };
  const role = "student";
  const studentLoginObject = {
    username: student_email,
    password: hashedPW,
    role: role,
    status: student_status,
  };
  const student = await Student.create(studentObject);
  const stuLogin = await Login.create(studentLoginObject);
  if (student) {
    res.status(201).json({ message: `Student successfully registered` });
  } else {
    res.status(400).json({ message: `Error occurred` });
  }
});

//-------------------------------------------------------------------------------------------------------
const aStoreRecording = asyncHandler(async (req, res) => {
  const {
    session_name,
    session_description,
    session_link,
    session_grade,
    session_subject
  } = req.body;

  if (!session_name) {
    return res.json({ message: "Fill all required fields." });
  }
  const duplicate_recording = await Recording.findOne({ session_link }).lean().exec();
  console.log(duplicate_recording);
  if (duplicate_recording) {
    return res
      .status(409)
      .json({ message: "Session already exist." });
  }
  const recordingObject = {
    session_name,
    session_description,
    session_link,
    session_grade,
    session_subject
  };
  const session_recording = await Recording.create(recordingObject);
  if (session_recording) {
    res.status(201).json({ message: `Session successfully stored` });
  } else {
    res.status(400).json({ message: `Error occurred` });
  }
});

//-------------------------------------------------------------------------------------------------------
const aListTickets = asyncHandler(async (req, res) => {
  const tickets = await Chat.find().lean();
  const filtered_tickets = tickets.filter(ticket => ticket.ticket_status === "in-progress");
  if (!filtered_tickets?.length) {
    return res.status(400).json({ message: 'Empty Chat History.' });
  }
  res.json(filtered_tickets);
});

//-------------------------------------------------------------------------------------------------------
const aTicketReply = asyncHandler(async (req, res) => {
  const { ticket_id, ticket_reply } = req.body;

  try {
    const ticket = await Chat.findOneAndUpdate(
      { _id: ticket_id }, // Find the ticket by its ID
      {
        $set: {
          ticket_reply: ticket_reply,
          ticket_status: 'replied'
        }
      },
      { new: true } // Return the updated ticket
    );

    if (ticket) {
      res.status(201).json({ message: 'Message Sent' });
    } else {
      res.status(404).json({ message: 'Ticket not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error occurred' });
  }
});

//-------------------------------------------------------------------------------------------------------
const uploadFolder = './playlist';
// Check if the 'playlist' folder exists, and create it if not
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder);
}

// Define the storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'playlist/'); // Specify the directory where files will be stored
  },
  filename: function (req, file, cb) {
    const timestamp = Date.now(); // Get the current timestamp
    const extension = path.extname(file.originalname); // Get the file extension
    const newFilename = `${timestamp}${extension}`;
    cb(null, newFilename); // Set the new filename
  }
});

// Create an instance of multer with the storage options
const upload = multer({ storage: storage });

// Update your controller to use the 'upload' middleware
const aStorePlayListAudio = asyncHandler(upload.single('playlist_audio'), async (req, res) => {
  const { audio_name } = req.body;
  console.log(req.body)
  const audioObject = {
    audio_name,
    playlist_audio: req.file.filename
  };
  console.log(audioObject)
  try {
    const new_file = await Playlist.create(audioObject);
    console.log(new_file)
    if (new_file) {
      return res.status(201).json({ message: `Audio successfully stored` });
    } else {
      return res.status(400).json({ message: `Error occurred while saving to the database` });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: `Internal server error` });
  }
});

//-------------------------------------------------------------------------------------------------------
module.exports = {
  aViewModerators,
  aViewStudents,
  aChangeModeratorStatus,
  aChangeStudentStatus,
  aStoreModerator,
  aStoreStudent,
  aStoreRecording,
  aListTickets,
  aTicketReply,
  aStorePlayListAudio
};
