const userService = require("../services/userService");
const throwError = require("../utils/throwError");

const authenticate = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization || !req.headers.authorization.startsWith("Bearer")) {
      throwError({
        message: "Unauthenticated",
        statusCode: 401,
      });
    }

    const payload = jwtService.verify(authorization.split(" ")[1]);
    const user = await userService.findUserById(payload.id);

    if (!user) {
      return res.status(400).json({message : "User can not be found on database"})
    }

    delete user.password
    req.user = user
    next()
  } catch (err) {
    next(err);
  }
};

module.exports = authenticate;
