const reserveService = require("../services/reserveService");
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
  res
    .status(201)
    .json({ message: "Order created. Please proceed to transaction", order });
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

module.exports = reserveController;
