const reserveService = require("../services/reserveService");
const transactionService = require("../services/transactionService");
const asyncWrapper = require("../utils/asyncWrapper");
const throwError = require("../utils/throwError");

const transactionController = {};

transactionController.createTransactionOrder = asyncWrapper(
  async (req, res, next) => {
    const order = req.order;
    console.log(order);
    const { transactionId } = await reserveService.findTransactionId(order.id);
    console.log(transactionId);
    if (transactionId) {
      throwError({
        message: "Transaction already exists.",
      });
    }

    const transId = await transactionService.createOrder({ orderId: order.id });
    const response = await reserveService.updateTransactionId(
      transId.id,
      transId.orderId
    );
    res.status(200).json(response.transactionId);
  }
);

module.exports = transactionController;
