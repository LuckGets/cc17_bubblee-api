const userService = require("../services/userService");
const asyncWrapper = require("../utils/asyncWrapper");

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
    res.status(200).json({user : user});
  }

  if (!user) {
    res.status(200).json("hello")
  }
});

module.exports = userController;
