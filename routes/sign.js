const signRouter = require('express').Router();
const { createUser, login } = require('../controllers/users');

signRouter.post('/signup', createUser);
signRouter.post('/signin', login);

module.exports = signRouter;