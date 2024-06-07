const authService = require("../services/authService");
const asyncWrapper = require("../utils/asyncWrapper");
const bcryptService = require("../validation/bcryptService/bcrypt");
const jwtService = require("../validation/jsonwebtoken/jwt");
const authController = {};

authController.createUser = asyncWrapper(async (req, res, next) => {
  const data = req.input;
  if (!req.input.role) {
    data.role = "USER";
  }

  const hashedPassword = await bcryptService.hash(data.password);
  data.password = hashedPassword;
  await authService.createUser(data);
  res.status(201).json({ message: "User created!" });
});

authController.login = asyncWrapper(async (req, res, next) => {
  const data = req.input;
  const user = await authService.findUserByEmailOrPhone(
    data.phone || data.email
  );
  if (!user) {
    return res.status(400).json({ message: "User did not exist" });
  }

  const isPasswordCorrect = await bcryptService.compare(
    data.password,
    user.password
  );
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  const accessToken = jwtService.sign({id : user.id});

  res.status(200).json({ accessToken });
});

module.exports = authController;
