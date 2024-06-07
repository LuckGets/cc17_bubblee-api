const Joi = require("joi");

const registerSchema = Joi.object({
  name: Joi.string().min(2).trim().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{8,24}$")).required(),
  email: Joi.string().email({ tlds: { allow: ["com", "net"] } }),
  phone: Joi.string().pattern(new RegExp("[0-9]{10}$")).required(),
  confirmPassword : Joi.alternatives()
  .conditional(Joi.string(), {
    then: Joi.string().required().valid(Joi.ref("password")),
  }).strip()
});

const loginSchema = Joi.object({
  emailOrPhone: Joi.alternatives([
    Joi.string().email({ tlds: { allow: ["com", "net"] } }),
    Joi.string().pattern(new RegExp("[0-9]{10}$")).required(),
  ])
    .strip()
    .required(),
  email: Joi.forbidden().when("emailOrPhone", {
    is: Joi.string().email({ tlds: { allow: ["com", "net"] } }),
    then: Joi.string().default(Joi.ref("emailOrPhone")),
  }),
  phone: Joi.forbidden().when("emailOrPhone", {
    is: Joi.string().pattern(new RegExp("[0-9]{10}$")),
    then: Joi.string().default(Joi.ref("emailOrPhone")),
  }),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{8,24}$")).required(),
});

module.exports = { registerSchema, loginSchema };
