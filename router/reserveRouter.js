const express = require("express");
const reserveController = require("../controller/reserveController");
const router = express.Router();

router.post("/create", reserveController.createReserve);

router.post("/find-id", reserveController.findReserverOrderId);

router.post("/details", reserveController.findReserveDetailByOrderId);

module.exports = router;
