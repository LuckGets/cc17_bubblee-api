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
  "/history/allunreserved",
  authenticate,
  reserveController.findAllUnReservedOrder
);

router.delete("/history/:orderId", authenticate, reserveController.cancelOrder);

router.patch(
  "/assign/:orderId",
  authenticate,
  reserveController.assignDriverToOrder
);

router.get("/history/all", authenticate, reserveController.getAllOrder);

module.exports = router;
