const mongoose = require('mongoose');

const RecordingSchema = new mongoose.Schema(
    {
        session_name: {
            type: String,
            required: true
        },
        streaming_date: {
            type: Date,
            required: true
        },
        streaming_time: {
            type: String,
            required: true
        },
        session_description: {
            type: String,
            required: false
        },
        session_link: {
            type: String,
            required: true
        },
        session_grade: {
            type: String,
            required: false
        },
        session_subject: {
            type: String,
            required: false
        },
        session_language: {
            type: String,
            required: false
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Recording', RecordingSchema);