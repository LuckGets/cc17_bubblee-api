const carService = require("../services/carService")
const asyncWrapper = require("../utils/asyncWrapper")

const carController = {}

carController.getCarImage = asyncWrapper( async (req,res,next) => {
  const carImageArr = await carService.getCarImage(+req.body.modelId)
  console.log(carImageArr)
  res.status(200).json(carImageArr)
})


module.exports = carController