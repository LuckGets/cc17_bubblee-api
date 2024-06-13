const express = require("express");
const reserveController = require("../controller/reserveController");
const authenticate = require("../middlewares/authenticate");
const router = express.Router();

router.post("/create", reserveController.createReserve);

router.post("/find-id", reserveController.findReserverOrderId);

router.post("/details", reserveController.findReserveDetailByOrderId);

router.post(
  "/finddetail",
  reserveController.findReserveDetailByOrderIdEmailAndPhone
);

router.get(
  "/history",
  authenticate,
  reserveController.findAllReserveHistoryByUserId
);

router.get(
  "/user/:orderId",
  authenticate,
  reserveController.findUserIdByOrderId
);

router.get(
  "/history/all",
  authenticate,
  reserveController.findAllUnReservedOrder
);

router.delete("/history/:orderId", authenticate, reserveController.cancelOrder);

module.exports = router;
