const usersRouter = require('express').Router();
const { getUserInfo, editProfile } = require('../controllers/users');

usersRouter.get('/me', getUserInfo);
usersRouter.patch('/me', editProfile);

module.exports = usersRouter;