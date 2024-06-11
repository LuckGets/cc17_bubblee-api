const express = require("express");
const carController = require("../controller/carController");
const router = express.Router();

router.get("/image", carController.getAllCarImage);

router.get("/details", carController.getAllCarDetails);

router.post("/image", carController.getCarDetailsById)

router.post("/image", carController.getCarImage);

module.exports = router;
