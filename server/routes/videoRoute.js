module.exports.UploadVideo = (req, res) => {
    res.json({ "msg": "File Uploaded", "URL": __dirname+"\\"+req.file.path })
}