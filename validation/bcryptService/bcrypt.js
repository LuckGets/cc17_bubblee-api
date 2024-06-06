const bcrypt = require("bcryptjs");
const bcryptService = {};

const salt = bcrypt.genSaltSync(12);

bcryptService.hash = (plainText) => bcrypt.hash(plainText, salt);
bcryptService.compare = (plainText, hashedPassword) =>
  bcrypt.compare(plainText, hashedPassword);

module.exports = bcryptService;
