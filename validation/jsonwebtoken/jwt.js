const jwt = require("jsonwebtoken");

jwtService = {};

jwtService.sign = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn : "3d" });

jwtService.verify = (accessToken) =>
  jwt.verify(accessToken, process.env.JWT_SECRET);

module.exports = jwtService;
