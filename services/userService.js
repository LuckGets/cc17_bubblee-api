const prisma = require("../model/prisma");

const userService = {};

userService.findUserById = (id) =>
  prisma.users.findUnique({
    where: {
      id,
    },
  });

userService.findUserByPhone = (phone) =>
  prisma.users.findFirst({
    where: {
      phone,
    },
  });

module.exports = userService;
