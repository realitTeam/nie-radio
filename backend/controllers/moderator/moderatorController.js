require("dotenv").config();

const asyncHandler = require("express-async-handler");
const Student = require("../../models/users/StudentModel");

//-------------------------------------------------------------------------------------------------------
// @desc authenticate the user and the token
// @route post: /moderator/students
// @access public
const viewStudents = asyncHandler(async (req, res) => {
    const students = await Student.find().select('-password').lean();
    if (!students?.length) {
        return res.status(400).json({ message: 'No student is found.' });
    }
    res.json(students);
});
//-------------------------------------------------------------------------------------------------------
module.exports = {
  viewStudents,
};
