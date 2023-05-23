const router = require('express').Router();

const signRouter = require('./sign');
const usersRouter = require('./users');
const moviesRouter = require('./movies');

const auth = require('../middlewares/auth');

router.use(signRouter);
router.use('/users', auth, usersRouter);
router.use('/movies', auth, moviesRouter);

module.exports = router;