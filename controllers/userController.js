const User = require("../models/User");
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ["password"] }
    });

    if (!user)
      return res.status(404).json({ message: "User not found" });

    res.json(user);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.uploadProfileImage = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);

    if (!user)
      return res.status(404).json({ message: "User not found" });

    user.profileImage = `http://localhost:5000/uploads/${req.file.filename}`;

    await user.save(); 

    res.json({ profileImage: user.profileImage });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.removeProfileImage = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);

    if (!user)
      return res.status(404).json({ message: "User not found" });

    user.profileImage = null;

    await user.save();

    res.json({ message: "Profile image removed" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] }
    });

    res.json(users);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
