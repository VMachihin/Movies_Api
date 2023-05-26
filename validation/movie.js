const { Joi } = require('celebrate');
const urlValidate = /^(http|https):\/\/[^ "]+$/;

const createMovieValidation = {
  body: Joi.object({
    country: Joi.string().min(2).max(30).required(),
    director: Joi.string().min(2).max(30).required(),
    duration: Joi.number().min(2).max(30).required(),
    year: Joi.string().min(2).max(30).required(),
    description: Joi.string().min(2).max(30).required(),
    image: Joi.string().regex(urlValidate),
    trailerLink: Joi.string().regex(urlValidate),
    thumbnail: Joi.string().regex(urlValidate),
    movieId: Joi.number().required(),
    nameRU: Joi.string().min(2).max(30).required(),
    nameEN: Joi.string().min(2).max(50).required(),
  }),
};

const movieIdValidation = {
  params: Joi.object({
    id: Joi.string().hex().length(24).required(),
  }),
};

module.exports = {
  createMovieValidation,
  movieIdValidation
};
