const User = require("../models/user");

const getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch profile",
      error: err.message
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name, careerGoal } = req.body;

    const updated = await User.update(
      { name, careerGoal },
      { where: { id: req.user.id } }
    );

    if (updated[0] === 0) {
      return res.status(400).json({ message: "No changes made" });
    }
    const user = await User.findByPk(req.user.id);
    res.status(200).json({ message: "Profile updated successfully",data:user });
  } catch (err) {
    res.status(500).json({
      message: "Failed to update profile",
      error: err.message
    });
  }
};

module.exports = { getProfile, updateProfile };
