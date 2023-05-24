const { Joi } = require('celebrate');
const urlValidate = /^(http|https):\/\/[^ "]+$/;

const createMovieValidation = {
  body: Joi.object({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string()
      .regex(urlValidate)
      .required(),
    country: Joi.string().min(2).max(30).required(),
    director: Joi.string().min(2).max(30).required(),
    duration: Joi.number().min(2).max(30).required(),
    year: Joi.string().min(2).max(30).required(),
    description: Joi.string().min(2).max(30).required(),
    image: Joi.string().regex(urlValidate),
    trailerLink: Joi.string().regex(urlValidate),
    movieId: Joi.string().hex().length(24).required(),
    thumbnail: Joi.string().regex(urlValidate),
    owner: Joi.string().hex().length(24).required(),
    nameRU: Joi.string().min(2).max(30).required(),
    nameEN: Joi.string().min(2).max(30).required(),
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
