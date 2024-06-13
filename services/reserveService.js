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
    select: {
      id: true,
      pickupPlace: true,
      dropOffPlace: true,
      passengerNum: true,
      bagNumber: true,
      totalCost: true,
      reservedAt: true,
    },
  });

module.exports = reserveService;
