const carService = require("../services/carService");
const asyncWrapper = require("../utils/asyncWrapper");
const setHoursService = require("../utils/setHoursService");

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
  const minusPickUp = setHoursService(req.body.pickUpTime, -4);
  const plusPickUp = setHoursService(req.body.pickUpTime, 3);
  const carArr = await carService.filterCarModelByTime(minusPickUp, plusPickUp);
  const reduceCarArr = carArr.reduce((acc, curr) => {
    acc[curr.modelId] = curr._count.modelId;
    return acc;
  }, {});
  const carIdArr = await carService.countCarIdGroupByModelId();
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

carController.findUnReservedCarAndDriver = asyncWrapper(
  async (req, res, next) => {
    const pickUpMinusFour = setHoursService(req.body.pickUpTime, -4);
    const estimatedTimePlusThree = setHoursService(
      req.body.estimatedTimeToFinish,
      3
    );
    const reservedCarArr = await carService.findCarMatchTime(
      req.body.pickUpTime,
      pickUpMinusFour,
      req.body.estimatedTimeToFinish,
      estimatedTimePlusThree,
      req.body.modelId
    );
    const reservedCar = reservedCarArr.map((item) => item.carId);

    const carAndDriverArr = await carService.GetCarAndDriverByfilteredCarId(
      reservedCar,
      req.body.modelId
    );
    res.status(200).json(carAndDriverArr);
  }
);

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
