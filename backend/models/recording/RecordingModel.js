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
        session_subject: {
            type: String,
            required: false
        },
        session_grade: {
            type: String,
            required: false
        },
        session_language: {
            type: String,
            required: false
        },
        recording_file: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Recording', RecordingSchema);