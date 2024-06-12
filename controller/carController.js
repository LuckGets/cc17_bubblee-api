const carService = require("../services/carService");
const asyncWrapper = require("../utils/asyncWrapper");

const carController = {};

carController.getAllCarDetails = asyncWrapper(async (req, res, next) => {
  const carDetailsArr = await carService.getAllCar();
  console.log(carDetailsArr);
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
  console.log(req.body);
  const carImageArr = await carService.getCarImage();
  console.log(carImageArr);
  res.status(200).json(carImageArr);
});

carController.getMainImageByCarId = asyncWrapper(async (req, res, next) => {
  const carImageArr = await carService.getCarImageById(req.body.id);
  res.status(200).json(carImageArr);
});

module.exports = carController;
