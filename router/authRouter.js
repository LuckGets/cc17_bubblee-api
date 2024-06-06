const express = require("express");
const authController = require("../controller/authController");
const authValidator = require("../validation/authValidation");
const router = express.Router();

router.post("/register", authValidator.register, authController.createUser);
router.post("/login", authValidator.login, authController.login);

module.exports = router;
