const User = require("../models/user.model");

module.exports.getUsers = async function (req, res) {
  const users = await User.find();
  if (!users) return res.status(400).json({ message: "Find users error" });
  return res.status(200).json(users);
};
