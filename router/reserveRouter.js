const express = require("express");
const reserveController = require("../controller/reserveController");
const authenticate = require("../middlewares/authenticate");
const adminAuthen = require("../utils/adminAuthen");
const router = express.Router();

router.post("/create", reserveController.createReserve);

router.patch("/edit", reserveController.userEditReserve);

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
  adminAuthen,
  reserveController.assignDriverToOrder
);

router.get(
  "/history/all",
  authenticate,
  adminAuthen,
  reserveController.getAllOrder
);

router.get(
  "/history/today",
  authenticate,
  adminAuthen,
  reserveController.findTodayOrders
);

router.get(
  "/history/expired",
  authenticate,
  adminAuthen,
  reserveController.findExpiredOrder
);

router.patch(
  "/order/finish/:orderId",
  authenticate,
  adminAuthen,
  reserveController.finishingJob
);

router.patch(
  "/order/cancel/:orderId",
  authenticate,
  adminAuthen,
  reserveController.cancelJob
);

module.exports = router;
