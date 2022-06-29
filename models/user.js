const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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
