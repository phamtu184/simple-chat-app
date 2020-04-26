const express = require("express");
const router = express.Router();
const controllerAuth = require("../controller/auth.controller");
const controllerUser = require("../controller/user.controller");

router.post("/login", controllerAuth.postLogin);
router.post("/register", controllerAuth.postRegister);
router.post("/islogin", controllerAuth.postIsLogin);

router.get("/users", controllerUser.getUsers);

module.exports = router;
