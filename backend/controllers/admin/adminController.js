require("dotenv").config();

const asyncHandler = require("express-async-handler");
const Moderator = require("../../models/users/ModeratorModel");

//-------------------------------------------------------------------------------------------------------
// @desc authenticate the user and the token
// @route post: /admin/moderators
// @access public
const viewModerators = asyncHandler(async (req, res) => {
    const moderators = await Moderator.find().select('-password').lean();
    if (!moderators?.length) {
        return res.status(400).json({ message: 'No moderator is found.' });
    }
    res.json(moderators);
});
//-------------------------------------------------------------------------------------------------------
module.exports = {
  viewModerators,
};
