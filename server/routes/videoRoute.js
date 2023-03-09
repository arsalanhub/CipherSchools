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