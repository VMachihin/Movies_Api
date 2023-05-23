const mongoose = require("mongoose");
const isEmail = require("validator/lib/isemail");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(value) { return isEmail(value); },
      message: 'Введена не корректная почта!',
    },
    minlength: 2,
    maxlength: 30
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

module.exports = mongoose.model('user', userSchema);