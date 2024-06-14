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

carService.filterCarModelByTime = (time) =>
  prisma.reservation.groupBy({
    by: ["modelId"],
    where: {
      pickUpTime: {
        lte: time,
      },
      estimatedFinishTime: {
        gte: time,
      },
    },
    _count: {
      modelId: true,
    },
  });

carService.countCarIdGroupByModelId = () =>
  prisma.cars.groupBy({
    by: ["modelId"],
    _count: {
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

module.exports = carService;
