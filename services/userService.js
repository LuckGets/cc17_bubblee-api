const prisma = require("../model/prisma");

const userService = {};

userService.findUserById = (id) =>
  prisma.users.findUnique({
    where: {
      id,
    },
  });

module.exports = userService;
