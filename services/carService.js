const prisma = require("../model/prisma");

const carService = {};

carService.getCarImage = (modelId) =>
  prisma.carImage.findMany({
    where: {
      modelId
    },
  });


  module.exports = carService