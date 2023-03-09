const User = require("../models/User");
const jwtkey="this_is_my_secret_key"
const Jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");

module.exports.UserLogin = async (req, res) => {
  const { email, password } = req.body;
  let userData = await User.findOne({ email });
  if(!userData) return res.json({ msg: "User not found" });
  else
  {
    let passwordCheck = await bcrypt.compare(password, userData.password);
    if(!passwordCheck) return res.json({ msg: "Incorrect Password" });
    else 
    {
        Jwt.sign({ userData }, jwtkey, { expiresIn: "2h" }, (err, token) => {
            res.send({ user: userData, auth: token, status: true });
          });   
    }
  }
};

module.exports.UserSignup = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (user)
      res.status(200).send({ msg: "User Already Exists", status: false });
    else {
      const hashedPassword=await bcrypt.hash(password, 10);
      let userData = await User.create({
        email: email,
        password: hashedPassword
      })
      Jwt.sign({ userData }, jwtkey, { expiresIn: "2h" }, (err, token) => {
        res.send({ user: userData, auth: token, status: true });
      });
    }
  } catch (error) {
    res.status(500).send({ msg: error });
    console.log(error);
  }
};

module.exports.UserDashboard = (req, res) => {
    res.json({ msg: "User Dashboard" })
}