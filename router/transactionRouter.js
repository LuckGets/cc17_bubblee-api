const express = require("express");
const transactionController = require("../controller/transactionController");
const reserveController = require("../controller/reserveController");
const router = express.Router();

router.post(
  "/create",
  reserveController.findReserverOrderId,
  transactionController.createTransactionOrder
);

module.exports = router;
