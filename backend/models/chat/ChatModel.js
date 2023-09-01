const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema(
    {
        user_name: {
            type: String,
            required: true
        },
        user_email: {
            type: String,
            required: false
        },
        user_school: {
            type: String,
            required: false
        },
        ticket_content: {
            type: String,
            required: true
        },
        ticket_reply: {
            type: String,
            required: false
        },
        ticket_status: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Chat', ChatSchema);
