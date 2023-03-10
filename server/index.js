require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { videoUpload } = require("./utils");
const { UploadVideo, UpdateVideo } = require("./routes/videoRoute");
const {
  UserLogin,
  UserSignup,
  UserDashboard,
  AllUsers,
} = require("./routes/userRoute");
const { isLoggedIn } = require("./middleware/isLoggedIn");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("videos"));

app.use("/uploadVideo", isLoggedIn, videoUpload.single("video"), UploadVideo);
app.use("/updateVideo", isLoggedIn, UpdateVideo);
app.use("/dashboard", isLoggedIn, UserDashboard);
app.use("/allusers", isLoggedIn, AllUsers);
app.use("/login", UserLogin);
app.use("/signup", UserSignup);

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database Connected!!");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(5000, (req, res) => {
  console.log("Listenin to port 5000");
});
