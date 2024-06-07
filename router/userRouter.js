const express = require("express");
const authenticate = require("../middlewares/authenticate");
const userController = require("../controller/userController");
const router = express.Router();

router.get("/", authenticate, userController.getUser);

module.exports = router;