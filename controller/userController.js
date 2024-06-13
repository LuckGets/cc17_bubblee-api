const userService = require("../services/userService");
const asyncWrapper = require("../utils/asyncWrapper");
const throwError = require("../utils/throwError");
const bcryptService = require("../validation/bcryptService/bcrypt");

const userController = {};

userController.getUser = (req, res, next) => {
  res.status(200).json(req.user);
};

userController.findUser = asyncWrapper(async (req, res, next) => {
  const user = await userService.findUserByEmailOrPhone(
    req.body.phone,
    req.body.email
  );
  if (user) {
    delete user.password;
    res.status(200).json({ user: user });
  }

  if (!user) {
    res.status(200).json("hello");
  }
});

userController.comparePassword = asyncWrapper(async (req, res, next) => {
  if (!req.body) {
    throwError({
      messsage: "Please provide required information",
      statusCode: 400,
    });
  }

  const user = await userService.findUserById(req.user.id);
  if (!user) {
    throwError({
      messsage: "Could not find this user on the database",
      statusCode: 400,
    });
  }
  const isPasswordCorr = await bcryptService.compare(
    req.body.password,
    user.password
  );
  console.log(isPasswordCorr);
  res.status(200).json(isPasswordCorr);
});

module.exports = userController;
