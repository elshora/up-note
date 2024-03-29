const User = require("../models/User");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (error) {
    if (User.findOne({ username: req.body.username })) {
      res.status(409).json(error);
    } else if (error) {
      res.status(408).json({ message: "email used" });
    } else {
      res.status(500).json(error);
    }
  }
};
const login = async (req, res) => {
  try {
    if (req.body.password == null || req.body.username == null) {
      res.status(400).json("Wrong Info");
    }
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(401).json("Wrong Info");
    const validated = await bcrypt.compare(req.body.password, user.password);
    if (!validated) res.status(400).json("Wrong Info");
    const { password, ...other } = user._doc;
    res.status(200).json(other);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = {
  register,
  login,
};
