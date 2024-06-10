const prisma = require("../model/prisma");

const carService = {};

carService.getCarImage = (modelId) =>
  prisma.carImage.findMany({
    where: {
      modelId
    },
  });

carService.getCarImageByFilteringId = modelId => prisma.carImage.findMany({
  where : {
    modelId : {
      notIn : modelId
    }
  }
})

carService.getAllCarImage = () => prisma.carImage.findMany()

  module.exports = carService