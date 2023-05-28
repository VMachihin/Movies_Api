const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const {
  BadRequestErr, NotFoundErr, UnauthorizedErr, ConflictErr,
} = require('../errors');
const {
  unauthorizedMessage,
  badRequestMessage,
  notFoundMessage,
  conflictMessage,
} = require('../utils/messages');

require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;

const createUser = (req, res, next) => {
  const {
    email, password, name,
  } = req.body;

  bcrypt.hash(password, 12)
    .then((hash) => {
      User.create({
        email, password: hash, name,
      })
        .then((newUser) => {
          const newUserNoPassword = newUser.toObject();
          delete newUserNoPassword.password;

          res.status(201).send(newUserNoPassword);
        })
        .catch((err) => {
          if (err.code === 11000) {
            next(new ConflictErr(conflictMessage));
          } else if (err.name === 'ValidationError') {
            next(new BadRequestErr(badRequestMessage));
          } else {
            next(err);
          }
        });
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select('+password') // команда добавляет в объект user хэш пароля
    .then((user) => {
      if (!user) {
        throw new UnauthorizedErr(unauthorizedMessage);
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new UnauthorizedErr(unauthorizedMessage);
        }

        const token = jwt.sign(
          { _id: user._id },
          NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
          {
            expiresIn: '10d',
          },
        );
        res
          .send({ token, message: 'Вход выполнен!' });
      });
    })

    .catch(next);
};

const getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      const { email, name } = user;
      res.send({ email, name });
    })

    .catch(next);
};

const editProfile = (req, res, next) => {
  const { email, name } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { email, name },
    { new: true, runValidators: true },
  )
    .then((newData) => {
      if (!newData) {
        throw new NotFoundErr(notFoundMessage);
      }

      res.send(newData);
    })
    .catch((error) => {
      if (error.code === 11000) {
        next(new ConflictErr(conflictMessage));
      } else if (error.name === 'ValidationError') {
        next(new BadRequestErr(badRequestMessage));
      } else {
        next(error);
      }
    });
};

module.exports = {
  createUser,
  login,
  getUserInfo,
  editProfile,
};
