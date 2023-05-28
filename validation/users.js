const { Joi } = require('celebrate');

const createUserValidation = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30).required(),
  }),
};

const loginValidation = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
};

const editProfileValidation = {
  body: Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string().min(2).max(30).required(),
  }),
};

module.exports = {
  createUserValidation,
  loginValidation,
  editProfileValidation,
};
