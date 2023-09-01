require("dotenv").config();

const bcrypt = require("bcrypt");

const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const Login = require("../../models/login/LoginModel");
const Student = require("../../models/users/StudentModel");
const Moderator = require("../../models/users/ModeratorModel");

//-------------------------------------------------------------------------------------------------------
// @desc authenticate the user and the token
// @route post: /moderator/students
// @access public
const mViewStudents = asyncHandler(async (req, res) => {
  const moderator_email = req.params._email;
  const moderator = await Moderator.findOne({ organization_email: moderator_email });
  const refferal_code = moderator.refferal_code;

  const students = await Student.find().select('-password').lean();
  const filteredStudents = students.filter(student => student.refferal_code === refferal_code);
  if (!students?.length) {
    return res.status(400).json({ message: 'No student is found.' });
  }
  res.json(filteredStudents);
});

//-------------------------------------------------------------------------------------------------------
const mChangeStudentStatus = asyncHandler(async (req, res) => {
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
const mStoreStudent = asyncHandler(async (req, res) => {
  const {
    refferal_code,
    student_name,
    student_id,
    student_grade,
    student_email,
    student_phone
  } = req.body;
  const password = '76543210';

  if (!student_email) {
    return res.json({ message: "All fields are required." });
  }
  const ref_code = await Moderator.findOne({ refferal_code }).lean().exec();
  if (!ref_code) {
    return res
      .status(409)
      .json({ message: "Please provide valid refferal code." });
  }
  const duplicate_email = await Student.findOne({ student_email })
    .lean()
    .exec();
  const duplicate_id = await Student.findOne({ student_id }).lean().exec();
  if (duplicate_email || duplicate_id) {
    return res.status(409).json({
      message: "Student already exist, Check your Student ID or Email.",
    });
  }

  const hashedPW = await bcrypt.hash(password, 10);
  const student_status = "active";
  const studentObject = {
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
const mRefCode = asyncHandler(async (req, res) => {
  const moderator_email = req.params._email;
  const moderator = await Moderator.findOne({ organization_email: moderator_email });
  const refferal_code = moderator.refferal_code;
  res.json({refferal_code:refferal_code});
});
//-------------------------------------------------------------------------------------------------------
module.exports = {
  mViewStudents,
  mChangeStudentStatus,
  mRefCode,
  mStoreStudent
};
