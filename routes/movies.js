const moviesRouter = require('express').Router();

const { celebrate } = require('celebrate');
const { getSavedMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { createMovieValidation, movieIdValidation } = require('../validation/movie');

moviesRouter.get('/', getSavedMovies);
moviesRouter.post('/', celebrate(createMovieValidation), createMovie);
moviesRouter.delete('/:id', celebrate(movieIdValidation), deleteMovie);

module.exports = moviesRouter;



