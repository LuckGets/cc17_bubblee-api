const authController = {};

authController.createUser = (req, res, next) => {
  res.status(200).json({ message: "This is create user" });
};

authController.login = (req, res, next) => {
  res.status(200).json({ message: "login successfully" });
};

module.exports = authController;
