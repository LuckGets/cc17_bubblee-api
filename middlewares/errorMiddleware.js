const throwError = require("../utils/throwError");

const errorMiddleware = (err, req, res, next) => {
  console.log(err);
  res
    .status(err.statusCode || 500)
    .json({ message: err.message, fields: err.fields });
};

module.exports = errorMiddleware;
