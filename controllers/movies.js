const Movie = require('../models/movie');

const { BadRequestErr, NotFoundErr, ForbiddenErr } = require('../errors');
const {
  badRequestMessage,
  notFoundMessage,
  forbiddenMessage,
  delMovie,
} = require('../utils/messages');

const createMovie = (req, res, next) => {
  const { _id } = req.user;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner: _id,
    movieId,
    nameRU,
    nameEN,
  })
    .then((newMovie) => {
      res.status(201).send(newMovie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(
          new BadRequestErr(
            badRequestMessage,
          ),
        );
      } else {
        next(err);
      }
    });
};

const deleteMovie = (req, res, next) => {
  const { id } = req.params;

  Movie.findById(id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundErr(notFoundMessage);
      } else if (movie.owner._id.toHexString() === req.user._id) {
        movie.deleteOne()
          .then((deletedMovie) => res.send({
            deletedMovie,
            message: delMovie,
          }))
          .catch(next);
      } else {
        throw new ForbiddenErr(forbiddenMessage);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestErr(badRequestMessage));
      } else {
        next(err);
      }
    });
};

const getSavedMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .populate(['owner'])
    .then((movies) => {
      res.send(movies);
    })
    .catch(next);
};

module.exports = {
  createMovie,
  deleteMovie,
  getSavedMovies,
};
