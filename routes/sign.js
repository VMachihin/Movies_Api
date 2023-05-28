const signRouter = require('express').Router();
const { celebrate } = require('celebrate');

const { createUser, login } = require('../controllers/users');
const { createUserValidation, loginValidation } = require('../validation/users');

signRouter.post('/signup', celebrate(createUserValidation), createUser);
signRouter.post('/signin', celebrate(loginValidation), login);

module.exports = signRouter;
