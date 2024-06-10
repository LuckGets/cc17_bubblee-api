const express = require("express");
const carController = require("../controller/carController");
const router = express.Router();

router.get("/image", carController.getAllCarImage)

router.post("/image", carController.getCarImage);

module.exports = router;
