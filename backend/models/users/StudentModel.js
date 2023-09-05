// StudentModel.js
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
    {
        moderator: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Moderator',
            required: true
        },
        refferal_code: {
            type: String,
            required: true
        },
        student_name: {
            type: String,
            required: true
        },
        student_id: {
            type: String,
            required: true
        },
        student_grade: {
            type: String,
            required: true
        },
        student_email: {
            type: String,
            unique: true,
            required: true
        },
        student_phone: {
            type: String,
            unique: false,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        student_status: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Student', studentSchema);
