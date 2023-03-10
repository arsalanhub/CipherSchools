const mongoose=require("mongoose");

const CommentsSchema = new mongoose.Schema({
    userId: {
        type: String
    },
    text: {
        type: String
    }
});

const LikesSchema = new mongoose.Schema({
    userId: {
        type: String
    },
    likes: {
        type: Boolean
    }
});

const VideoSchema = new mongoose.Schema({
    userId: {
        type: String
    },
    Url: {
        type: String
    },
    likes: {
        type: [LikesSchema]
    },
    comments: {
        type: [CommentsSchema]
    }
})

module.exports = mongoose.model("Video", VideoSchema);