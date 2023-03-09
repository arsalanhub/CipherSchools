const mongoose=require("mongoose");

const CommentsSchema = new mongoose.Schema({
    commentedUserId: {
        type: String
    },
    commentText: {
        type: String
    }
})

const VideoSchema = new mongoose.Schema({
    userId: {
        type: String
    },
    Url: {
        type: String
    },
    likes: {
        type: Number
    },
    comments: {
        type: [CommentsSchema]
    }
})

module.exports = mongoose.model("Video", VideoSchema);