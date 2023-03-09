const express=require("express");
const cors=require("cors");
const multer=require("multer")
const path=require("path")

const app=express();
app.use(cors());
app.use(express.json());
app.use(express.static("videos"));

const videoStorage = multer.diskStorage({
    // Destination to store image     
    destination: 'videos', 
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
    }
});

const videoUpload = multer({
    storage: videoStorage,
    limits: {
      fileSize: 100000000
    },
    fileFilter(req, file, cb) {
    cb(undefined, true)
  }
}) 

app.use("/uploadVideo", videoUpload.single('video'), (req, res) => {
    res.json({ "msg": "File Uploaded", "URL": __dirname+"\\"+req.file.path })
})

app.listen(5000, (req, res) => {
    console.log("Listenin to port 5000");
})
