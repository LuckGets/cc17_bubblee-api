const throwError = require("../utils/throwError");

const notFoundMiddleware = (req, res, next) => {
  res
    .status(404)
    .json({
      message: `Sorry your ${req.method} can not be found on this ${req.url} `,
    });
};

module.exports = notFoundMiddleware;
