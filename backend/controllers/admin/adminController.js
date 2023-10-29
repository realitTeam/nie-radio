// adminController.js
require("dotenv").config();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const AWS = require('aws-sdk');

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
const Blog = require("../../models/blog/BlogModel");

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
const recordingUploadFolder = './recordings';
if (!fs.existsSync(recordingUploadFolder)) {
  fs.mkdirSync(recordingUploadFolder);
}
const recording_storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'recordings');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  }
});
const recordings_upload = multer({ storage: recording_storage });
const aStoreRecording = asyncHandler(async (req, res) => {
  recordings_upload.single('file')(req, res, async function (err) {
    const {
      session_name,
      streaming_date,
      streaming_time,
      session_subject,
      session_grade,
      session_language
    } = req.body;

    if (err) {
      return res.status(400).json({ message: 'File upload failed.' });
    }
    if (!req.file) {
      res.status(400).json({ message: 'No audio file uploaded.' });
      return;
    }
    if (!['.mp3'].includes(path.extname(req.file.originalname))) {
      res.status(400).json({ message: 'Invalid audio file format.' });
      return;
    }
    // const recording_newFilename = req.file.filename;
    const recordingObject = {
      session_name,
      streaming_date,
      streaming_time,
      session_subject,
      session_grade,
      session_language,
      recording_file: req.file.filename,
    };
    const session_recording = await Recording.create(recordingObject);
    if (session_recording) {
      res.status(201).json({ message: `Recording successfully stored` });
    } else {
      res.status(400).json({ message: `Error occurred` });
    }
  });
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
const blogUploadFolder = './blog_images';
if (!fs.existsSync(blogUploadFolder)) {
  fs.mkdirSync(blogUploadFolder);
}
const blog_storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'blog_images/');
  },
  filename: (req, file, cb) => {
    cb(null, "img" + "_" + Date.now() + path.extname(file.originalname));
  }
});
const blog_upload = multer({ storage: blog_storage });
const aStoreBlogPost = asyncHandler(async (req, res) => {
  blog_upload.single('file')(req, res, async function (err) {
    const { post_title, post_description } = req.body;
    if (err) {
      return res.status(400).json({ message: 'File upload failed.' });
    }
    if (!req.file) {
      res.status(400).json({ message: 'No blog image file uploaded.' });
      return;
    }
    if (!['.jpeg', '.jpg', '.png'].includes(path.extname(req.file.originalname))) {
      res.status(400).json({ message: 'Invalid image format.' });
      return;
    }
    const image_newFilename = req.file.filename;
    const blogObject = {
      post_title,
      post_description,
      post_img: req.file.filename,
    };
    const blog_post = await Blog.create(blogObject);
    if (blog_post) {
      res.status(201).json({ message: 'Blog post successfully stored' });
    } else {
      res.status(400).json({ message: 'Error occurred' });
    }
  });
});

//-------------------------------------------------------------------------------------------------------
const playlistUploadFolder = './playlist';

if (!fs.existsSync(playlistUploadFolder)) {
  fs.mkdirSync(playlistUploadFolder);
}

const audio_storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'playlist/');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  },
});

const audio_upload = multer({ storage: audio_storage });

const aStorePlaylistAudio = asyncHandler(async (req, res) => {
  audio_upload.array('files', 10)(req, res, async function (err) { // Set a limit on the number of files if needed
    if (err) {
      return res.status(400).json({ message: 'File upload failed.' });
    }

    const audioFiles = req.files;

    if (!audioFiles || audioFiles.length === 0) {
      res.status(400).json({ message: 'No audio files uploaded.' });
      return;
    }

    for (const audioFile of audioFiles) {
      if (!['.mp3'].includes(path.extname(audioFile.originalname))) {
        res.status(400).json({ message: 'Invalid audio file format.' });
        return;
      }
    }

    const playlistPromises = audioFiles.map(async (audioFile) => {
      const audioObject = {
        audio_file: audioFile.filename,
      };

      const playlist = await Playlist.create(audioObject);

      if (playlist) {
        return { success: true, message: 'Audio file stored successfully' };
      } else {
        return { success: false, message: 'Error occurred while storing audio file' };
      }
    });

    const results = await Promise.all(playlistPromises);

    const successCount = results.filter((result) => result.success).length;
    const errorCount = results.length - successCount;

    if (errorCount === 0) {
      res.status(201).json({ message: `${successCount} audio files successfully stored` });
    } else {
      res.status(400).json({ message: `${successCount} audio files stored, ${errorCount} errors occurred` });
    }
  });
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
  aStoreBlogPost,
  aStorePlaylistAudio,
};
