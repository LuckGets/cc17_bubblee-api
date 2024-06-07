const prisma = require("../model/prisma");

const authService = {};

authService.createUser = (data) =>
  prisma.users.create({
    data
  });

authService.findUserByEmailOrPhone = (emailOrPhone) =>
  prisma.users.findFirst({
    where: {
      OR: [{ email: emailOrPhone }, { phone: emailOrPhone }],
    },
  });

module.exports = authService;
