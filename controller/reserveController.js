const carService = require("../services/carService");
const reserveService = require("../services/reserveService");
const userService = require("../services/userService");
const asyncWrapper = require("../utils/asyncWrapper");
const throwError = require("../utils/throwError");

const reserveController = {};

reserveController.createReserve = asyncWrapper(async (req, res, next) => {
  if (!req.body) {
    throwError({
      message: "Request body is empty",
      statusCode: 400,
    });
  }

  const order = await reserveService.createReserveOrder(req.body);
  res.status(201).json({
    message: "Order created. Please proceed to transaction",
    id: order.id,
  });
});

reserveController.findReserverOrderId = asyncWrapper(async (req, res, next) => {
  if (!req.body) {
    throwError({
      message: "Request body is empty",
      statusCode: 400,
    });
  }

  if (!req.body.guestInfo && !req.body.userId) {
    throwError({
      message: "Invalid Credentials",
      statusCode: 401,
    });
  }

  const data = {};

  const guest = await reserveService.findGuestDetail(req.body.guestInfo);
  if (!guest && !req.body.userId) {
    throwError({
      message: "Unauthorized",
      statusCode: 401,
    });
  }
  if (guest) {
    const guestInfo = { ...req.body.guestInfo };
    delete req.body.guestInfo;
    Object.assign(data, guestInfo);
  }

  Object.assign(data, req.body);
  const order = await reserveService.findOrderIdByData(data);
  if (!order) {
    res.status(400).json({
      message: "Order could not be found on the database.",
    });
  }
  req.order = order;
  next();
});

reserveController.findReserveDetailByOrderId = asyncWrapper(
  async (req, res, next) => {
    if (!req.body.id) {
      throwError({
        message: "Please provide order ID before initiaite searching",
      });
    }

    const orderDetails = await reserveService.findReserveDetailByOrderId(
      req.body.id
    );
    if (!orderDetails) {
      res
        .status(400)
        .json({ message: "Cound not find this order on the database" });
    }

    res.status(200).json(orderDetails);
  }
);

reserveController.findReserveDetailByOrderIdEmailAndPhone = asyncWrapper(
  async (req, res, next) => {
    if (!req.body.orderId || !req.body.email || !req.body.phone) {
      res.status(400).json("asdsad");
    }

    const order = await reserveService.findReserveDetailByOrderId(
      +req.body.orderId
    );
    if (!order) {
      res.status(400).json({ message: "Order can't be find on the database." });
    }
    if (order.userId) {
      const user = await userService.findUserById(order.userId);
      if (user.email !== req.body.email || user.phone !== req.body.phone) {
        throwError({
          message: "Invalid credentials",
          statusCode: 401,
        });
      }
    } else if (
      req.body.email !== order.guestMail ||
      req.body.phone !== order.guestPhone
    ) {
      throwError({
        message: "Invalid credentials",
        statusCode: 401,
      });
    }

    const carInfo = await carService.getCarInfoById(order.modelId);

    const detail = {
      id: order.id,
      pickupPlace: order.pickupPlace,
      dropOffPlace: order.dropOffPlace,
      reservedAt: order.reservedAt,
      pickUpTime: order.pickUpTime,
      totalCost: order.totalCost,
      passengerNum: order.passengerNum,
      bagNumber: order.bagNumber,
      isRoundTrip: order.isRoundTrip,
      model: carInfo.carModel,
      transactionId: order.transactionId,
    };
    res.status(200).json(detail);
  }
);

reserveController.findAllReserveHistoryByUserId = asyncWrapper(
  async (req, res, next) => {
    if (!req.user.id) {
      throwError({
        message: "Unauthentiated",
        statusCode: 401,
      });
    }

    const reserveArr = await reserveService.findReserveHistoryByUserId(
      req.user.id
    );

    const reserveHistory = reserveArr.reduce((acc, curr) => {
      if (curr.orderStatus === "CANCEL") {
        return acc;
      }
      const objToPush = {};
      objToPush.id = curr.id;
      objToPush.pickupPlace = curr.pickupPlace;
      objToPush.pickUpTime = curr.pickUpTime;
      objToPush.dropOffPlace = curr.dropOffPlace;
      objToPush.reservedAt = curr.reservedAt;
      objToPush.passengerNum = curr.passengerNum;
      objToPush.bagNumber = curr.bagNumber;
      objToPush.totalCost = curr.totalCost;
      objToPush.isRoundTrip = curr.isRoundTrip;
      objToPush.model = curr.carModel.carModel;
      objToPush.transactionId = curr.transactionId;
      acc.push(objToPush);
      return acc;
    }, []);

    res.status(200).json(reserveHistory);
  }
);

reserveController.findUserIdByOrderId = asyncWrapper(async (req, res, next) => {
  const userId = await reserveService.findUserIdByOrderId(+req.params.orderId);
  if (!userId) {
    throwError({
      message: "Could not find this order id on the database",
      statusCode: 400,
    });
  }

  if (userId.userId !== req.user.id) {
    throwError({
      message: "Unauthorized",
      statusCode: 401,
    });
  }

  res.status(200).json(userId);
});

reserveController.cancelOrder = asyncWrapper(async (req, res, next) => {});

module.exports = reserveController;
