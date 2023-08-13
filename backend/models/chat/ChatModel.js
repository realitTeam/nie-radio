const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema(
    {
        student_id: {
            type: String,
            required: true
        },
        student_name: {
            type: String,
            required: true
        },
        student_msg: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Chat', ChatSchema);