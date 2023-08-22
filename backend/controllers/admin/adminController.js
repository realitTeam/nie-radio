// adminController.js
require("dotenv").config();

const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const Moderator = require("../../models/users/ModeratorModel");
const Student = require("../../models/users/StudentModel");
const Login = require("../../models/login/LoginModel");

//-------------------------------------------------------------------------------------------------------
// @route post: /admin/moderators
// @access private
const viewModerators = asyncHandler(async (req, res) => {
  const moderators = await Moderator.find().select('-password').lean();
  if (!moderators?.length) {
    return res.status(400).json({ message: 'No moderator is found.' });
  }
  res.json(moderators);
});
//-------------------------------------------------------------------------------------------------------
// @route post: /admin/moderators/status
// @access private
const changeModeratorStatus = asyncHandler(async (req, res) => {
  const moderatorId = req.params.id; // Assuming the moderator ID is passed in the URL parameters

  // Find the moderator by ID
  const moderator = await Moderator.findOne({ _id: moderatorId });
  if (!moderator) {
    return res.status(404).json({ message: "Moderator not found" });
  }
  const login = await Login.findOne({ _id: moderatorId });
  // Toggle the moderator status
  moderator.moderator_status = moderator.moderator_status === "active" ? "inactive" : "active";
  // Save the updated moderator status
  await moderator.save();
  login.status = login.status === "active" ? "inactive" : "active";
  await login.save();

  res.status(200).json({ message: "Moderator status updated successfully" });
});
//-------------------------------------------------------------------------------------------------------
// @route post: /admin/Students
// @access private
const viewStudents = asyncHandler(async (req, res) => {
  const students = await Student.find().select('-password').lean();
  if (!students?.length) {
    return res.status(400).json({ message: 'No student is found.' });
  }
  res.json(students);
});
//-------------------------------------------------------------------------------------------------------
// @route post: /admin/students/status
// @access private
const changeStudentStatus = asyncHandler(async (req, res) => {
  const student_id = req.params.id;

  // Find the student by ID
  const student = await Student.findOne({ _id: student_id });
  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }
  const login = await Login.findOne({ _id: student_id });
  // Toggle the student status
  student.student_status = student.student_status === "active" ? "inactive" : "active";
  // Save the updated student status
  await student.save();
  login.status = login.status === "active" ? "inactive" : "active";
  await login.save();

  res.status(200).json({ message: "Student status updated successfully" });
});
//-------------------------------------------------------------------------------------------------------
// @route post: /admin/moderator/store
// @access private
const storeRegister = asyncHandler(async (req, res) => {
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
  // validating inputs
  if (!organization_name || !organization_address || !province || !district || !organization_email || !organization_phone || !principal_name || !principal_email || !principal_phone) {
    return res.json({ message: "All fields are required." });
  }
  // checking existing users
  const duplicate_moderator = await Moderator.findOne({ organization_email })
    .lean()
    .exec();
  if (duplicate_moderator) {
    return res.status(409).json({
      message: "Moderator already exist, Please use different email.",
    });
  }
  // checking existing referal code
  const duplicate_refCode = await Moderator.findOne({ refferal_code })
    .lean()
    .exec();
  if (duplicate_refCode) {
    return res.status(409).json({ message: "Refresh & try again." });
  }
  // hashing pw
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

  // login object
  const role = "moderator";
  const moderatorLoginObject = {
    username: organization_email,
    password: hashedPW,
    role: role,
    status: moderator_status,
  };

  // creating and storing moderator
  const moderator = await Moderator.create(moderatorObject);
  // craeting and storing into login
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
module.exports = {
  viewModerators,
  viewStudents,
  changeModeratorStatus,
  changeStudentStatus,
  storeRegister
};
