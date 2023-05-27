const router = require('express').Router();

const signRouter = require('./sign');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const { NotFoundErr } = require('../errors');

const auth = require('../middlewares/auth');

router.use(signRouter);
router.use('/users', auth, usersRouter);
router.use('/movies', auth, moviesRouter);
router.use(auth, (req, res, next) => {
  next(new NotFoundErr('Не корректный путь'));
});

module.exports = router;
