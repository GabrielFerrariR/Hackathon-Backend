const Joi = require("joi");

const idSchema = Joi.number().integer().min(1).required();

const userRegistrationSchema = Joi.object({
  password: Joi.string().min(8).required(),
  name: Joi.string().required(),
  email: Joi.string().email().required(),
});

module.exports = {
  idSchema,
  userRegistrationSchema,
};
