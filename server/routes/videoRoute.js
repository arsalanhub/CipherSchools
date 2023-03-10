const User=require("../models/User");
const Video=require("../models/Video")

module.exports.UploadVideo = async (req, res) => {
    const userId = req.body.userId;
    const Url = __dirname+"\\"+req.file.path;

    await Video.create({
        userId: userId,
        Url: Url
    })
    let userData = await Video.find({ userId });
    res.json({ "msg": "File Uploaded", user: userData })
}

module.exports.UpdateVideo = async (req, res) => {
    const { userId, videoId, likes, comments } = req.body;
    let videoData = await Video.findById(videoId);
    let tmpLikes=videoData.likes, tmpComments=videoData.comments;
    if(likes)
    {
        let flag=0;
        for(let i=0; i<tmpLikes.length; i++)
        {
            if(tmpLikes[i].userId===userId) {
                if(tmpLikes[i].likes) tmpLikes[i].likes=false;
                else tmpLikes[i].likes=true;
                flag=1;
                break;
            }
        }
        if(!flag) tmpLikes.push({ userId: userId, likes: true });
    }
    if(comments) tmpComments.push({ userId: userId, comments: comments });
    let updatedData = await Video.findByIdAndUpdate(videoId, {
        likes: tmpLikes,
        comments: tmpComments
    }, { new: true })
    return res.send({ msg: "Video Updated", updatedData })
}