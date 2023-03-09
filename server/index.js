const express=require("express");
const cors=require("cors");
const { videoUpload } = require("./utils");
const { UploadVideo } = require("./routes/videoRoute");

const app=express();
app.use(cors());
app.use(express.json());
app.use(express.static("videos"));

app.use("/uploadVideo", videoUpload.single('video'), UploadVideo);

app.listen(5000, (req, res) => {
    console.log("Listenin to port 5000");
})
