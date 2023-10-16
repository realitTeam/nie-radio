// authController.js
require("dotenv").config();

const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Moderator = require("../../models/users/ModeratorModel");
const Student = require("../../models/users/StudentModel");
const Login = require("../../models/login/LoginModel");

// #####################################################################################################
const moderatorRegister = asyncHandler(async (req, res) => {
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
    refferal_code,
    password,
  } = req.body;

  // validating inputs
  if (!organization_name || !password) {
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
  const moderator_status = "inactive";

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
      message: `You are successfully registered & waiting for Admin approval.\nUse ${organization_email} as your username.`,
    });
  } else {
    res.status(400).json({ message: `Error occurred` });
  }
});

//-------------------------------------------------------------------------------------------------------
const studentRegister = asyncHandler(async (req, res) => {
  const {
    refferal_code,
    student_name,
    student_id,
    student_grade,
    student_email,
    student_phone,
    password,
  } = req.body;
  // validating inputs
  if (!student_email || !password) {
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
    return res.status(409).json({message: "Student already exist."});
  }
  const moderator_id = ref_code._id;
  const hashedPW = await bcrypt.hash(password, 10);
  const student_status = "active";
  const studentObject = {
    moderator:moderator_id,
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

  // creating and storing student
  const student = await Student.create(studentObject);
  // craeting and storing into login
  const stuLogin = await Login.create(studentLoginObject);

  // generate token
  const accessToken = jwt.sign(
    { username: student.username },
    process.env.SECRET_KEY,
    { expiresIn: "24h" }
  );

  // Store JWT in local storage
  // localStorage.setItem("token", accessToken);
  if (student) {
    res.status(201).json({ accessToken, role: role, message: `You are successfully registered` });
  } else {
    res.status(400).json({ message: `Error occurred` });
  }
});

//-------------------------------------------------------------------------------------------------------
const userLogin = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  // validating inputs
  if (!username || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }
  // checking existing user
  const user = await Login.findOne({ username });

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  // If user found, check the user status whether active or inactive
  if (user.status === "active") {
    // if user found comparing the pws
    var pwIsValid = await bcrypt.compareSync(password, user.password);

    // if pws are not matched
    if (!pwIsValid) {
      return res.status(400).send({
        message: "Invalid Password!",
      });
    }

    // generate token
    const token = jwt.sign({ username: user.username, role: user.role }, process.env.SECRET_KEY);
    res.status(200).json({ token: token, role: user.role });

  } else if (user.status === "inactive") {
    // User is inactive, handle the inactive user scenario
    return res.status(403).json({ message: "User is not authorized." });
  }

});

// #####################################################################################################
// logged user details   ############################################################################################
// #####################################################################################################
//-------------------------------------------------------------------------------------------------------
// @desc get logged user details
// @route get: /user/username
// @access private
const loggedUserDetails = asyncHandler(async (req, res) => {
  const user_email = req.params.username;

  const moderator = await Moderator.findOne({ organization_email: user_email });
  const student = await Student.findOne({ student_email: user_email });

  if (moderator) {
    const moderatorDetails = {
      name: moderator.organization_name
    };
    res.status(200).json(moderatorDetails);
  } else if (student) {
    const studentDetails = {
      name: student.student_name
    };
    res.status(200).json(studentDetails);
  };
});
// #####################################################################################################
// logout   ############################################################################################
// #####################################################################################################
//-------------------------------------------------------------------------------------------------------
// @desc authenticate the user and the token
// @route post: /logout
// @access public
const userLogout = asyncHandler(async (req, res) => {
  // Remove JWT from local storage
  localStorage.removeItem('token');
  res.status(200).json({ message: `Logged out successfully.` });
});


//-------------------------------------------------------------------------------------------------------
module.exports = {
  moderatorRegister,
  studentRegister,
  userLogin,
  userLogout,
  loggedUserDetails
};
