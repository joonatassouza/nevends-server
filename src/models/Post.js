const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    author: String,
    place: String,
    description: String,
    hashtags: String,
    imageUrl: String,
    likes: {
        type: Number,
        default: 0
    },
    dislikes: {
        type: Number,
        default: 0
    },
    comments: [
        {
            when : {
                type: Date,
                default: Date.now
            },
            text : String
        }
    ]
}, {
    timestamps: true,
});

module.exports = mongoose.model('Post', PostSchema);