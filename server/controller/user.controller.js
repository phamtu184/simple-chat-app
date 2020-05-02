const User = require("../models/user.model");

module.exports.searchUsers = async function (req, res) {
  const { text } = req.body;
  if (text === undefined) s = "";
  const result = await User.find({ username: new RegExp(text, "i") })
    .select("-password")
    .lean()
    .catch((err) =>
      res.status(500).json({ message: "Server error when searching user" })
    );
  return res.status(200).json(result);
};

module.exports.findUser = function (req, res) {
  const { id } = req.body;
  User.findById(id)
    .select("-password")
    .lean()
    .then((user) => {
      if (!user) return res.status(400).json({ message: "Find user error" });
      return res.status(200).json(user);
    })
    .catch(() => res.status(400).json({ message: "Find user error" }));
};
