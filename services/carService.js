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

carService.getCarImageByFilteringId = (modelId) =>
  prisma.carImage.findMany({
    where: {
      modelId: {
        notIn: modelId,
      },
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

module.exports = carService;
