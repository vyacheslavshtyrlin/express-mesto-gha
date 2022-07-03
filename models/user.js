const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const Unauthorized = require('../errors/unauthorizedError');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: 'Введен некоректный Email',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    minlength: [2, 'Введите корректное имя'],
    maxlength: [30, 'Введите корректное имя'],
    required: true,
  },
  about: {
    type: String,
    minlength: [2, 'Должно быть минимум 2 символа'],
    axlength: [30, 'Максимум 30 символов'],
    required: true,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
      message: 'Введен корректную ссылку',
    },
  },
});
userSchema.statics.findUserByCredentials = function (password, email) {
  return this.findOne({ email }).select('+password')
    .orFail(() => {
      throw new Unauthorized('Неправильные почта или пароль');
    })
    .then((user) => bcrypt.compare(password, user.password)
      .then((matched) => {
        if (!matched) {
          throw new Unauthorized('Неправильные почта или пароль');
        }
        return user;
      }));
};

module.exports = mongoose.model('user', userSchema);
