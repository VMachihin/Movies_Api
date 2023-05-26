const { Joi } = require('celebrate');
const urlValidate = /^(http|https):\/\/[^ "]+$/;

const createMovieValidation = {
  body: Joi.object({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().regex(urlValidate).required(),
    trailerLink: Joi.string().regex(urlValidate).required(),
    thumbnail: Joi.string().regex(urlValidate).required(),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
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
