// studentController.js
require("dotenv").config();

const bcrypt = require("bcrypt");

const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const Student = require("../../models/users/StudentModel");
const Moderator = require("../../models/users/ModeratorModel");
const Chat = require("../../models/chat/ChatModel");

//-------------------------------------------------------------------------------------------------------
const sStoreChatContent = asyncHandler(async (req, res) => {
  const {
    user_email,
    ticket_content
  } = req.body;

  const u_email = req.body.user_email; 
  const student_ = await Student.findOne({ student_email : u_email });
  const user_name = student_.student_name;
  const user_refcode = student_.refferal_code;
  const school_ = await Moderator.findOne({ refferal_code : user_refcode });
  const school_name_address = school_.organization_name + ' | ' + school_.district + ',' + school_.province;

  if (!user_name) {
    return res.json({ message: "All fields are required." });
  }

  const ticket_status = "in-progress";

  const chatObject = {
    user_name:user_name,
    user_email:user_email,
    user_school:school_name_address,
    ticket_content,
    ticket_status:ticket_status,
  };
  console.log(chatObject)
  const ticket = await Chat.create(chatObject);
  if (ticket) {
    res.status(201).json({ message: `Message Sent` });
  } else {
    res.status(400).json({ message: `Error occurred` });
  }
});

//-------------------------------------------------------------------------------------------------------
const sListTickets = asyncHandler(async (req, res) => {
  const student_email = req.params._email;

  const tickets = await Chat.find().lean();
  const filtered_tickets = tickets.filter(ticket => ticket.user_email === student_email);
  if (!filtered_tickets?.length) {
    return res.status(400).json({ message: 'Empty Chat History.' });
  }
  res.json(filtered_tickets);
});
//-------------------------------------------------------------------------------------------------------
module.exports = {
  sStoreChatContent,
  sListTickets
};
