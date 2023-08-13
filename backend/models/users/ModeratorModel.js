const mongoose = require('mongoose');

const moderatorSchema = new mongoose.Schema(
    {
        organization_name: {
            type: String,
            required: true
        },
        organization_address: {
            type: String,
            required: true
        },
        province: {
            type: String,
            required: true
        },
        district: {
            type: String,
            required: true
        },
        organization_email: {
            type: String,
            unique: true,
            required: true
        },
        organization_phone: {
            type: String,
            unique: true,
            required: true
        },
        principal_name: {
            type: String,
            required: true
        },
        principal_email: {
            type: String,
            unique: true,
            required: true
        },
        principal_phone: {
            type: String,
            unique: true,
            required: true
        },
        refferal_code: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        moderator_status: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Moderator', moderatorSchema);