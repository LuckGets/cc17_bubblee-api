const validator = require("./validator");
const { registerSchema, loginSchema } = require("./joi-schema/schema");

const authValidator = {};

authValidator.register = (req, res, next) => {
  if (!req.body.password || !req.body.phone || !req.body.name) {
    return res.status(400).json({
      message: "Invalid input. Please try again.",
    });
  }
  validator(registerSchema, req, res, next);
};

authValidator.login = (req, res, next) => {
  if (!req.body.password || !req.body.emailOrPhone) {
    return res.status(400).json({
      message : "Invalid input. Please try again."
    })
  }
  validator(loginSchema, req, res, next);
};

module.exports = authValidator;
