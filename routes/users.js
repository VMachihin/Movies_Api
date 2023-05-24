const usersRouter = require('express').Router();
const { celebrate } = require('celebrate');

const { getUserInfo, editProfile } = require('../controllers/users');
const { editProfileValidation } = require('../validation/users');

usersRouter.get('/me', getUserInfo);
usersRouter.patch('/me', celebrate(editProfileValidation), editProfile);

module.exports = usersRouter;