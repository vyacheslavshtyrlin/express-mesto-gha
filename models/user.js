const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
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
  },
});

module.exports = mongoose.model('user', userSchema);
