const express = require("express");
const carController = require("../controller/carController");
const router = express.Router();

router.get("/image", carController.getAllCarImage);

router.get("/details", carController.getAllCarDetails);

router.post("/image", carController.getCarImage);

router.post("/main-image", carController.getMainImageByCarId);
module.exports = router;
