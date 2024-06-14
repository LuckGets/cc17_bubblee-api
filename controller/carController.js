const carService = require("../services/carService");
const asyncWrapper = require("../utils/asyncWrapper");

const carController = {};

carController.getAllCarDetails = asyncWrapper(async (req, res, next) => {
  const carDetailsArr = await carService.getAllCar();
  res.status(200).json(carDetailsArr);
});

carController.getAllCarImage = asyncWrapper(async (req, res, next) => {
  const carImageArr = await carService.getAllCarImage();
  res.status(200).json(carImageArr);
});

carController.getCarImage = asyncWrapper(async (req, res, next) => {
  const carImageArr = await carService.getCarImage();
  res.status(200).json(carImageArr);
});

carController.getCarDetailsById = asyncWrapper(async (req, res, next) => {
  const carImageArr = await carService.getCarImage();
  res.status(200).json(carImageArr);
});

carController.getMainImageByCarId = asyncWrapper(async (req, res, next) => {
  const carImageArr = await carService.getCarImageById(req.body.id);
  res.status(200).json(carImageArr);
});

carController.filteredCarByTime = asyncWrapper(async (req, res, next) => {
  const carArr = await carService.filterCarModelByTime(req.body.pickUpTime);
  const reduceCarArr = carArr.reduce((acc, curr) => {
    acc[curr.modelId] = curr._count.modelId;
    return acc;
  }, {});
  console.log(reduceCarArr);
  const carIdArr = await carService.countCarIdGroupByModelId();
  console.log(carIdArr);
  const availCarArr = carIdArr.reduce((acc, curr) => {
    console.log(curr._count.id, reduceCarArr[curr.modelId]);
    if (
      reduceCarArr[curr.modelId] &&
      curr._count.id < reduceCarArr[curr.modelId]
    ) {
      return acc;
    }
    acc.push(curr.modelId);
    return acc;
  }, []);

  res.status(200).json(availCarArr);
});

carController.getFilteredCarMainImage = asyncWrapper(async (req, res, next) => {
  const modelIdArr = req.body.modelId;
  const mainImageArr = await carService.getCarImageByFilteringId(modelIdArr);
  res.status(200).json(mainImageArr);
});

carController.getFilteredCarDetails = asyncWrapper(async (req, res, next) => {
  const carDetail = await carService.getFilteredCarDetails(req.body.modelId);
  console.log(carDetail);
  res.status(200).json(carDetail);
});
module.exports = carController;
