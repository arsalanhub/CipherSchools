require("dotenv").config();
const express=require("express");
const cors=require("cors");
const mongoose=require("mongoose");
const { videoUpload } = require("./utils");
const { UploadVideo } = require("./routes/videoRoute");
const { UserLogin, UserSignup } = require("./routes/userRoute");

const app=express();
app.use(cors());
app.use(express.json());
app.use(express.static("videos"));

app.use("/uploadVideo", videoUpload.single('video'), UploadVideo);
app.use("/login", UserLogin);
app.use("/signup", UserSignup);

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Database Connected!!")
}).catch((err) => {
  console.log(err)
})

app.listen(5000, (req, res) => {
    console.log("Listenin to port 5000");
})
