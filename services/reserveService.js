const prisma = require("../model/prisma");
const reserveService = {};

reserveService.createReserveOrder = (data) =>
  prisma.reservation.create({ data });

reserveService.findOrderIdByData = (data) =>
  prisma.reservation.findFirst({
    where: {
      ...data,
    },
    select: {
      id: true,
    },
  });

reserveService.findGuestDetail = (data) =>
  prisma.reservation.findFirst({
    where: {
      ...data,
    },
    select: {
      guestName: true,
    },
  });

reserveService.findTransactionId = (id) =>
  prisma.reservation.findUnique({
    where: { id },
    select: {
      transactionId: true,
    },
  });

reserveService.updateTransactionId = (id, orderId) =>
  prisma.reservation.update({
    data: { transactionId: id },
    where: {
      id: orderId,
    },
    select: {
      id: true,
    },
  });

reserveService.findReserveDetailByOrderId = (id) =>
  prisma.reservation.findUnique({
    where: { id },
  });

reserveService.findReserveHistoryByUserId = (userId) =>
  prisma.reservation.findMany({
    where: {
      userId: userId,
    },
    include: {
      carModel: true,
    },
  });

reserveService.findUserIdByOrderId = (orderId) =>
  prisma.reservation.findUnique({
    where: {
      id: orderId,
    },
    select: {
      userId: true,
    },
  });

reserveService.cancelOrder = (orderId) =>
  prisma.reservation.update({
    where: {
      id: orderId,
    },
    data: {
      orderStatus: "CANCEL",
    },
  });

reserveService.findAllUnReservedOrder = () =>
  prisma.reservation.findMany({
    where: {
      orderStatus: "FINDING",
    },
  });

module.exports = reserveService;
