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

userService.findUserByEmailOrPhone = (phone,email) =>
  prisma.users.findFirst({
    where: {
      OR: [{ phone: phone }, { email: email }],
    },
  });

module.exports = userService;
