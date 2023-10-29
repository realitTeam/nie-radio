// PlaylistModel.js
const mongoose = require('mongoose');

const PlaylistSchema = new mongoose.Schema(
    {
        audio_file: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Playlist', PlaylistSchema);