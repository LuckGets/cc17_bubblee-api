const prisma = require("../model/prisma");
const transactionService = {};

transactionService.createOrder = (data) => prisma.transaction.create({ data });

module.exports = transactionService;
