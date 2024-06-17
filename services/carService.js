const prisma = require("../model/prisma");

const carService = {};

carService.getCarImage = () =>
  prisma.carImage.findMany({
    where: {
      mainImage: true,
    },
    include: {
      carModel: true,
    },
  });

carService.getCarImageById = (id) =>
  prisma.carImage.findFirst({
    where: {
      mainImage: true,
      modelId: id,
    },
    include: {
      carModel: true,
    },
  });

carService.getAllCar = () =>
  prisma.carsModel.findMany({
    include: {
      carImage: {
        where: {
          mainImage: true,
        },
      },
    },
  });

carService.filterCarModelByTime = (time, pickUpMinus) =>
  prisma.reservation.groupBy({
    by: ["modelId"],
    where: {
      pickUpTime: {
        lte: pickUpMinus,
      },
      estimatedFinishTime: {
        gte: time,
      },
    },
    _count: {
      modelId: true,
    },
  });

carService.countCarIdGroupByModelId = (model) =>
  prisma.cars.groupBy({
    by: ["modelId"],
    where: {
      modelId: {
        notIn: model,
      },
    },
    _count: {
      id: true,
    },
  });

carService.filteredModelIdByPassenger = (passenger) =>
  prisma.carsModel.findMany({
    where: {
      maxPassengerNum: {
        lte: passenger,
      },
    },
    select: {
      id: true,
    },
  });

carService.getCarImageByFilteringId = (modelId) =>
  prisma.carImage.findMany({
    where: {
      mainImage: true,
      modelId: {
        in: modelId,
      },
    },
    include: {
      carModel: true,
    },
  });

carService.findCarMatchTime = (
  pickUpTime,
  pickUpMinus,
  finishTime,
  finishPlus,
  modelId
) =>
  prisma.reservation.findMany({
    where: {
      modelId,
      pickUpTime: {
        gte: pickUpTime,
        lte: finishPlus,
      },
      estimatedFinishTime: {
        gte: pickUpMinus,
        lte: finishTime,
      },
      orderStatus: "RESERVED",
    },
    select: {
      carId: true,
    },
  });

carService.getAllCarImage = () => prisma.carImage.findMany();

carService.getAllCarDetails = () => prisma.carsModel.findMany();

carService.getCarDetailsById = (modelId) =>
  prisma.carImage.findMany({
    where: {
      modelId,
    },
  });

carService.getCarInfoById = (id) =>
  prisma.carsModel.findUnique({
    where: {
      id,
    },
  });

carService.getFilteredCarDetails = (modelId) =>
  prisma.carsModel.findMany({
    where: {
      id: {
        in: modelId,
      },
    },
  });

carService.GetCarAndDriverByfilteredCarId = (carId, modelId) =>
  prisma.cars.findMany({
    where: {
      id: {
        notIn: carId,
      },
      modelId,
    },
    include: {
      driver: true,
    },
  });

module.exports = carService;
