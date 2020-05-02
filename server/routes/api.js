const express = require("express");
const router = express.Router();
const authController = require("../controller/auth.controller");
const userController = require("../controller/user.controller");
const chatController = require("../controller/chat.controller");

router.post("/login", authController.postLogin);
router.post("/register", authController.postRegister);
router.post("/islogin", authController.postIsLogin);

router.post("/users", userController.searchUsers);
router.post("/user", userController.findUser);

router.post("/getchat", chatController.getChat);
router.post("/chatlist", chatController.getChatList);
router.post("/sendchat", chatController.postSendChat);

module.exports = router;
