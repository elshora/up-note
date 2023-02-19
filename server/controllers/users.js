const User = require("../models/User");
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
};
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateUser = async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.denSalt(10);
      req.body.password = await bcrypt.hash(req.body.password);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: "username or email already used" });
    }
  } else {
    res.status(401).json("not authorized to this action");
  }
};

const removeUser = async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      await Post.deleteMany({ username: user.username });
      const user = await User.findById(req.params.id);
      try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("user successfully deleted");
      } catch (error) {
        res.status(500).json({ message: "username or email already used" });
      }
    } catch (error) {
      res.status(404).json("User not found");
    }
  } else {
    res.status(401).json("not authorized to this action");
  }
};
module.exports = {
  getUser,
  getUsers,
  updateUser,
  removeUser,
};
