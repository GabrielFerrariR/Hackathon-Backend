const Joi = require("joi");

const idSchema = Joi.number().integer().min(1).required();

const userRegistrationSchema = Joi.object({
  username: Joi.string().min(3).required(),
  password: Joi.string().min(8).required(),
  name: Joi.string().required(),
  email: Joi.string().email().required(),
});

const contentSchema = Joi.object({
  name: Joi.string().min(3).required(),
  type: Joi.string().required(),
  duration: Joi.string().required(),
  creator: Joi.string().required(),
  link: Joi.string().uri().required(),
  track: Joi.string().required(),
  subTrack: Joi.string().required(),
});

module.exports = {
  idSchema,
  userRegistrationSchema,
  contentSchema,
};
