const { Joi } = require('celebrate');

const createUserValidation = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(5),
    name: Joi.string().min(2).max(30),
  }),
};

const loginValidation = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(5),
  }),
};


const editProfileValidation = {
  body: Joi.object({
    email: Joi.string().min(2).max(30).required(),
    name: Joi.string().min(2).max(30).required(),
  }),
};

module.exports = {
  createUserValidation,
  loginValidation,
  editProfileValidation,
}