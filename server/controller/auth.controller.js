const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports.postLogin = async function (req, res) {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).json({ message: "Tài khoản không tồn tại!" });
  }
  const passwordMatch = bcrypt.compareSync(password, user.password);
  if (!passwordMatch) {
    return res.status(400).json({ message: "Sai mật khẩu!" });
  }
  jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWTSECRET,
    { expiresIn: 1000 * 60 * 60 * 24 },
    (err, token) => {
      if (err) return res.status(400).json({ message: "Lỗi server" });
      res.status(200).json({ token });
    }
  );
};
module.exports.postRegister = async function (req, res) {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user)
    return res.status(400).json({ message: "Tên đăng nhập đã tồn tại!" });
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(password, salt, function (err, hash) {
      if (err) return res.status(500).json({ message: "Lỗi server" });
      const newUser = new User({ username, password: hash });
      newUser
        .save()
        .then(res.status(200).json("REGISTER_SUCCESS"))
        .catch((e) => res.status(500).json({ message: "Lỗi server" }));
    });
  });
};
module.exports.postIsLogin = function (req, res) {
  const { tokenAuth } = req.body;
  jwt.verify(tokenAuth, process.env.JWTSECRET, (err, decoded) => {
    if (err) return res.status(400).json({ message: "Token expired" });
    return res.status(200).json(decoded);
  });
};
