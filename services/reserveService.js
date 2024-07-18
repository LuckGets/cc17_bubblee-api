const prisma = require("../model/prisma");
const reserveService = {};

reserveService.createReserveOrder = (data) =>
  prisma.reservation.create({ data });

reserveService.editReservation = (data, id) =>
  prisma.reservation.update({
    where: {
      id,
    },
    data,
  });

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

reserveService.findReserveHistoryByUserId = (userId, time) =>
  prisma.reservation.findMany({
    where: {
      userId: userId,
      pickUpTime: {
        gte: time,
      },
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

reserveService.assignCarIdToOrder = (id, carId, driverId) =>
  prisma.reservation.update({
    data: {
      carId: carId,
      driverId: driverId,
      orderStatus: "RESERVED",
    },
    where: {
      id,
    },
  });

reserveService.findEveryOrder = () => prisma.reservation.findMany();

reserveService.findTodayOrders = (today, tomorrow) =>
  prisma.reservation.findMany({
    where: {
      pickUpTime: {
        gte: today,
        lte: tomorrow,
      },
    },
  });

reserveService.findExpiredOrder = (today) =>
  prisma.reservation.findMany({
    where: {
      pickUpTime: {
        lte: today,
      },
    },
  });

reserveService.finishingOrder = (id) =>
  prisma.reservation.update({
    where: {
      id,
    },
    data: {
      orderStatus: "FINISHED",
    },
  });

reserveService.cancelOrder = (id) =>
  prisma.reservation.update({
    where: {
      id,
    },
    data: {
      orderStatus: "CANCEL",
    },
  });
module.exports = reserveService;
