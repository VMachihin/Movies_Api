const mongoose = require("mongoose");
const urlValidate = /^(http|https):\/\/[^ "]+$/;

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true
  },
  director: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  year: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    validate: {
      validator(value) { return urlValidate.test(value); },
      message: 'Не верный формат ссылки!',
    },
    required: true,
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator(value) { return urlValidate.test(value); },
      message: 'Не верный формат ссылки!',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(value) { return urlValidate.test(value); },
      message: 'Не верный формат ссылки!',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user', // чтобы получить доступ к данным пользователей, связанных с этими идентификаторами, необходимо добавить параметр ref: 'user' в поле схемы
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true
  },
  nameEN: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('movie', movieSchema)