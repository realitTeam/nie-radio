const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema(
    {
        post_title: {
            type: String,
            required: true
        },
        post_description: {
            type: String,
            required: true
        },
        post_img: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Blog', BlogSchema);
