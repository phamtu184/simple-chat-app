const User = require("../models/user.model");

module.exports.getUsers = async function (req, res) {
  const users = await User.find().lean();
  if (!users) return res.status(400).json({ message: "Find users error" });
  return res.status(200).json(users);
};

module.exports.findUser = function (req, res) {
  const { id } = req.body;
  User.findById(id)
    .lean()
    .then((user) => {
      if (!user) return res.status(400).json({ message: "Find user error" });
      return res.status(200).json(user);
    })
    .catch(() => res.status(400).json({ message: "Find user error" }));
};
