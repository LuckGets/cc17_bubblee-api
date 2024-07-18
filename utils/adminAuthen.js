const adminAuthen = (req, res, next) => {
  if (req.user.role !== "ADMIN") {
    throwError({
      message: "Unauthorized",
      statusCode: 401,
    });
  }
  next();
};

module.exports = adminAuthen;
